//===================================================================
'use strict';
//===================================================================
var husl  = require( 'husl' );
var debug = require( 'debug' )( 'husl' );

//===================================================================
//
//===================================================================
module.exports = 
{
    install: function(less /*, pluginManager*/) 
    {
        debug( 'Installing...' );

        var rgb = less.functions.functionRegistry.get( "rgb" ).bind( less );
        //
        less.functions.functionRegistry.addMultiple( 
        {
            'husl': function(h, s, l)
            {
                h = _normalizeAngle( h         );
                s = _sanitize      ( s, 0, 100 );
                l = _sanitize      ( l, 0, 100 );

                var val = husl.toRGB( h, s, l ).map( _byte );
                var res = rgb.apply( null, val );
                //
                debug( 'husl', h, s, l, ' -> rgb ', val );
                //
                return res;
            }
        });
        //
        debug( 'Installed.' );
    }
};

//===================================================================
function _byte(v)
{
    return Math.floor( v * 255 + 0.5 );
}

//===================================================================
function _normalizeAngle(v)
{
    return ((v.value - 360) % 360) + 360;
}

//===================================================================
function _sanitize(v, min, max)
{
    return Math.max( min, Math.min( v.value, max ) );
}
