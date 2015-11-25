var Jpt = Jpt || {};

/*global console*/

/*-----------------------------------------------------------------------------
 *
 * Definition of the materials
 *
 *---------------------------------------------------------------------------*/

Jpt.BRDF.INV_PI = 1.0 / Math.PI;
Jpt.BRDF.INV_TWOPI = 0.5 * Jpt.BRDF.INV_PI;

Jpt.BRDF.Diffuse = function (red, green, blue) {
    "use strict";
    
    this.red = red;
    this.green = green;
    this.blue = blue;
};

Jpt.BRDF.Diffuse.prototype.f = function (vIn, vOut, isect) {
    "use strict";

    
    return new Jpt.Vec(this.red * Jpt.BRDF.INV_TWO_PI,
                       this.green * Jpt.BRDF.INV_TWO_PI,
                       this.blue * Jpt.BRDF.INV_TWO_PI);
};