var Jpt = Jpt || {};

/*global console*/

/*-----------------------------------------------------------------------------
 *
 * Definition of the materials
 *
 *---------------------------------------------------------------------------*/

Jpt.BRDF = Jpt.BRDF || {};
Jpt.BRDF.INV_PI = 1.0 / Math.PI;
Jpt.BRDF.INV_TWO_PI = 0.5 * Jpt.BRDF.INV_PI;

/*
 * Creates a new diffuse bidirectional reflection distribution function
 *
 * @param red   the red color component (between 0 and 1)
 * @param green the red color component (between 0 and 1)
 * @param blue  the red color component (between 0 and 1)
 */
Jpt.BRDF.Diffuse = function (red, green, blue) {
    "use strict";
    
    this.red = red;
    this.green = green;
    this.blue = blue;
};

Jpt.BRDF.Diffuse.prototype.f = function () {
    "use strict";
    
    return new Jpt.RGB(this.red * Jpt.BRDF.INV_TWO_PI,
                       this.green * Jpt.BRDF.INV_TWO_PI,
                       this.blue * Jpt.BRDF.INV_TWO_PI);
};

Jpt.BRDF.Diffuse.prototype.toString = function () {
    "use strict";
    
    return "diffuse (" + this.red + ", " + this.green + ", " + this.blue + ")";
};