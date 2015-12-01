var Jpt = Jpt || {};

/*global console*/

/*-----------------------------------------------------------------------------
 *
 * Definition of a three dimensional sphere
 *
 *---------------------------------------------------------------------------*/

Jpt.Sphere = function (origin, radius, bsdf, emission) {
    "use strict";
    this.origin = origin;
    this.radius = radius;
    this.emission = emission;
    this.bsdf = bsdf;
};

Jpt.Sphere.prototype.intersect = function (ray, intersection) {
    "use strict";
    
    var a, b, c, d, dn, oc, q, t0, t1, t, temp;
    oc = ray.origin.subtract(this.origin);         // vector between ray and sphere origin
    a = ray.direction.dot(ray.direction);
    b = 2.0 * oc.dot(ray.direction);
    c = oc.dot(oc) - this.radius * this.radius;
    d = b * b - 4.0 * a * c;
    
    
    if (d >= 0) {
        d = Math.sqrt(d);
        q = b < 0 ? (-0.5 * (b - d)) : (-0.5 * (b + d));
        t0 = q / a;
        t1 = c / q;
        
        // swap
        if (t0 > t1) {
            temp = t0;
            t0 = t1;
            t1 = temp;
        }
        
        if (t0 > ray.maxt || t1 < ray.mint) {
            return false;
        } else {
            if (t0 >= ray.mint) {
                t = t0;
            } else {
                t = t1;
            }
            
            ray.maxt = t;

            if (intersection) {
                intersection.p = ray.origin.add(ray.direction.scale(t));
                intersection.n = intersection.p.subtract(this.origin).norm();
                intersection.shape = this;
                intersection.t = t;
                intersection.bsdf = this.bsdf;
            }
            return true;
        }
    }
    return false;
};