var Jpt = Jpt || {};

/*global console*/

/*-----------------------------------------------------------------------------
 *
 * Definition of a three dimensional ray
 *
 *---------------------------------------------------------------------------*/

Jpt.Ray = function (origin, direction) {
    "use strict";
    this.origin = origin;
    this.direction = direction;
    this.mint = 0;
    this.maxt = Number.POSITIVE_INFINITY;
};

Jpt.Ray.prototype.toString = function () {
    "use strict";
    return "ray from " + this.origin.toString() + " to " + this.direction.toString();
};