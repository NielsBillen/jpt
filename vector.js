var Jpt = Jpt || {};

/*global console*/

/*-----------------------------------------------------------------------------
 *
 * Definition of a three dimensional vector
 *
 *---------------------------------------------------------------------------*/

Jpt.Vec = function (x, y, z) {
    "use strict";
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

Jpt.Vec.prototype.add = function (vector) {
    "use strict";
    return new Jpt.Vec(this.x + vector.x, this.y + vector.y, this.z + vector.z);
};

Jpt.Vec.prototype.subtract = function (vector) {
    "use strict";
    return new Jpt.Vec(this.x - vector.x, this.y - vector.y, this.z - vector.z);
};

Jpt.Vec.prototype.multiply = function (vector) {
    "use strict";
    return new Jpt.Vec(this.x * vector.x, this.y * vector.y, this.z * vector.z);
};

Jpt.Vec.prototype.scale = function (value) {
    "use strict";
    return new Jpt.Vec(this.x * value, this.y * value, this.z * value);
};

Jpt.Vec.prototype.divide = function (value) {
    "use strict";
    return this.scale(1.0 / value);
};

Jpt.Vec.prototype.lengh = function (value) {
    "use strict";
    return Math.sqrt(this.dot(this));
};

Jpt.Vec.prototype.dot = function (vector) {
    "use strict";
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
};

Jpt.Vec.prototype.cross = function (vector) {
    "use strict";
    return new Jpt.Vec(this.y * vector.z - this.z * vector.y,
                       -vector.x * this.z + vector.z * this.z,
                       this.x * vector.y - this.y * vector.x);
};

Jpt.Vec.prototype.norm = function () {
    "use strict";
    return this.divide(this.lengh());
};

Jpt.Vec.prototype.toString = function () {
    "use strict";
    return this.x + " " + this.y + " " + this.z;
};