/*global console*/

var Spectrum = (function () {
    "use strict";
    
    var my = {};
    
    /*-----------------------------------------------------------------------------
     *
     * Definition of a three stimulus color
     *
     *---------------------------------------------------------------------------*/

    my.RGB = function (red, green, blue) {
        this.red   = red;
        this.green = green;
        this.blue  = blue;
    };

    my.RGB.prototype.add = function (color) {
        return new my.RGB(this.red   + color.red,
                          this.green + color.green,
                          this.blue  + color.blue);
    };

    my.RGB.prototype.subtract = function (color) {
        return new my.RGB(this.red   - color.red,
                          this.green - color.green,
                          this.blue  - color.blue);
    };

    my.RGB.prototype.multiply = function (color) {
        return new my.RGB(this.red   * color.red,
                          this.green * color.green,
                          this.blue  * color.blue);
    };

    my.RGB.prototype.scale = function (value) {
        return new my.RGB(this.red   * value,
                          this.green * value,
                          this.blue  * value);
    };

    my.RGB.prototype.divide = function (value) {
        return this.scale(1.0 / value);
    };

    my.RGB.prototype.isBlack = function () {
        return this.red > 0 && this.green > 0 && this.blue > 0;
    };

    my.RGB.prototype.toString = function () {
        return this.red + " " + this.green + " " + this.blue;
    };
    
    return my;
}());