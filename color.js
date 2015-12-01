var Jpt = Jpt || {};

/*global console*/

/*-----------------------------------------------------------------------------
 *
 * Definition of a three stimulus color
 *
 *---------------------------------------------------------------------------*/

Jpt.RGB = function (red, green, blue) {
    "use strict";
    this.red   = red;
    this.green = green;
    this.blue  = blue;
};

Jpt.RGB.prototype.add = function (color) {
    "use strict";
    return new Jpt.RGB(this.red   + color.red,
                       this.green + color.green,
                       this.blue  + color.blue);
};

Jpt.RGB.prototype.subtract = function (color) {
    "use strict";
    return new Jpt.RGB(this.red   - color.red,
                       this.green - color.green,
                       this.blue  - color.blue);
};

Jpt.RGB.prototype.multiply = function (color) {
    "use strict";
    return new Jpt.RGB(this.red   * color.red,
                       this.green * color.green,
                       this.blue  * color.blue);
};

Jpt.RGB.prototype.scale = function (value) {
    "use strict";
    return new Jpt.RGB(this.red * value,
                       this.green * value,
                       this.blue * value);
};

Jpt.RGB.prototype.divide = function (value) {
    "use strict";
    return this.scale(1.0 / value);
};

Jpt.RGB.prototype.isBlack = function () {
    "use strict";
    
    return this.red > 0 && this.green > 0 && this.blue > 0;
};

Jpt.RGB.prototype.toString = function () {
    "use strict";
    return this.red + " " + this.green + " " + this.blue;
};