/*global console*/

var Geometry = (function () {
    "use strict";
    
    var my = {};
    
    /*-----------------------------------------------------------------------------
     *
     * Definition of a three dimensional point
     *
     *---------------------------------------------------------------------------*/
    
    my.Point = function (x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    };
    
    my.Point.prototype.get = function (index) {
        switch (index) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        case 2:
            return this.z;
        default:
            throw "the index " + index + " is out of range!";
        }
    };
    
    my.Point.prototype.subtract = function (point) {
        return new my.Vector(this.x - point.x, this.y - point.y, this.z - point.z);
    };
    
    my.Point.prototype.scale = function (value) {
        return new my.Point(this.x * value, this.y * value, this.z * value);
    };
    
    my.Point.prototype.divide = function (divisor) {
        return this.scale(1.0 / divisor);
    };
    
    my.Interpolate = function (p1, p2, t) {
        var x, y, z;
        x = p1.x * (1.0 - t) + t * p2.x;
        y = p1.y * (1.0 - t) + t * p2.y;
        z = p1.z * (1.0 - t) + t * p2.z;
        return new my.Point(x, y, z);
    };
    
    my.Point.prototype.toString = function () {
        return this.x + " " + this.y + " " + this.z;
    };
    
    /*-----------------------------------------------------------------------------
     *
     * Definition of a three dimensional vector
     *
     *---------------------------------------------------------------------------*/

    my.Vector = function (x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    };
    
    my.Vector.prototype.get = function (index) {
        switch (index) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        case 2:
            return this.z;
        default:
            throw "the index " + index + " is out of range!";
        }
    };

    my.Vector.prototype.add = function (vector) {
        return new my.Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    };

    my.Vector.prototype.subtract = function (vector) {
        return new my.Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    };

    my.Vector.prototype.multiply = function (vector) {
        return new my.Vector(this.x * vector.x, this.y * vector.y, this.z * vector.z);
    };

    my.Vector.prototype.scale = function (value) {
        return new my.Vector(this.x * value, this.y * value, this.z * value);
    };

    my.Vector.prototype.divide = function (value) {
        return this.scale(1.0 / value);
    };

    my.Vector.prototype.lengh = function (value) {
        return Math.sqrt(this.dot(this));
    };

    my.Vector.prototype.dot = function (vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    };

    my.Vector.prototype.cross = function (vector) {
        return new my.Vector(this.y * vector.z - this.z * vector.y,
                             -vector.x * this.z + vector.z * this.z,
                             this.x * vector.y - this.y * vector.x);
    };

    my.Vector.prototype.norm = function () {
        return this.divide(this.lengh());
    };

    my.Vector.prototype.toString = function () {
        return this.x + " " + this.y + " " + this.z;
    };
    
    return my;
}());

console.log(Geometry);


var p1 = new Geometry.Point(1, 2, 3);
var p2 = new Geometry.Point(2, 3, 4);
console.log(Geometry.Interpolate(p1, p2, 0.5));
