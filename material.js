/*global console, Spectrum, Geometry, Jpt*/

/*-----------------------------------------------------------------------------
 *
 * Definition of the materials
 *
 *---------------------------------------------------------------------------*/

var BSDF = (function () {
    "use strict";
    
    // private variables
    var my = {},
        INV_PI = 1.0 / Math.PI,
        INV_TWOPI = 0.5 * INV_PI;
    
    // create a diffuse class
    my.Diffuse = function Diffuse(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    };
    
    my.Diffuse.prototype.f = function (vIn, vOut, isect) {
        return new Spectrum.RGB(this.red * INV_TWOPI,
                                this.green * INV_TWOPI,
                                this.blue * INV_TWOPI);
    };
    
    my.Diffuse.prototype.toString = function () {
        return "diffuse (" + this.red + ", " + this.green + ", " + this.blue + ")";
    };
    
    return my;
}());