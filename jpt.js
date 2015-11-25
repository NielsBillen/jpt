var Jpt = Jpt || {};

/*global console*/

/*-----------------------------------------------------------------------------
 *
 * Definition of a three dimensional intersection object
 *
 *---------------------------------------------------------------------------*/

Jpt.Intersection = function () {
    "use strict";
    this.p = null;
    this.n = null;
    this.shape = null;
    this.t = null;
};

/*-----------------------------------------------------------------------------
 *
 * Definition of a camera
 *
 *---------------------------------------------------------------------------*/

Jpt.Camera = function (origin, lookAt, up, xResolution, yResolution, fov) {
    "use strict";
    this.origin = origin;
    this.w = lookAt.norm();
    this.u = up.cross(this.w).norm();
    this.v = this.w.cross(this.u);
    this.xResolution = xResolution;
    this.yResolution = yResolution;
    this.width = 2.0 * Math.tan(0.5 * fov);
    this.height = this.width * this.yResolution / this.xResolution;
    this.rendered = false;
};

Jpt.Camera.prototype.generateRay = function (x, y) {
    "use strict";
    
    var uu, vv, d;
    uu = this.width * (x / this.xResolution - 0.5);
    vv = this.height * (y / this.yResolution - 0.5);
    d = this.w.add(this.u.scale(uu)).add(this.v.scale(vv));
    return new Jpt.Ray(this.origin, d);
};

Jpt.Camera.prototype.toString = function () {
    "use strict";
    
    return this.u.toString() + " " + this.v.toString() + " " + this.w.toString();
};

/*-----------------------------------------------------------------------------
 *
 * Definition of a scene
 *
 *---------------------------------------------------------------------------*/

Jpt.Scene = function () {
    "use strict";
    
    this.primitives = [];
};

Jpt.Scene.prototype.add = function (primitive) {
    "use strict";
    
    if (primitive) {
        this.primitives.push(primitive);
    }
};

Jpt.Scene.prototype.intersect = function (ray, isect, print) {
    "use strict";
    
    var result = false;
    this.primitives.forEach(function (element) {
        if (element.intersect(ray, isect, print)) {
            result = true;
        }
    });
    
    return result;
};

/*-----------------------------------------------------------------------------
 *
 * Definition of a renderer
 *
 *---------------------------------------------------------------------------*/

Jpt.Renderer = function () {
    "use strict";
    
    this.canvas = document.getElementById("jpt-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.camera = new Jpt.Camera(new Jpt.Vec(0, 0, 0), new Jpt.Vec(0, 0, 1).norm(), new Jpt.Vec(0, 1, 0), this.width, this.height, 0.5 * Math.PI);
    
    this.scene = new Jpt.Scene();
    
    this.scene.add(new Jpt.Sphere(new Jpt.Vec(0, 0, 10), 5));
    this.scene.add(new Jpt.Sphere(new Jpt.Vec(4, -4, 12), 4));
    this.scene.add(new Jpt.Sphere(new Jpt.Vec(-4, -4, 12), 4));
    this.scene.add(new Jpt.Sphere(new Jpt.Vec(4, 4, 12), 4));
    this.scene.add(new Jpt.Sphere(new Jpt.Vec(-4, 4, 12), 4));
};

Jpt.Renderer.prototype.start = function () {
    "use strict";
    
    var x, y, s, spp, ray, color, c, isect, hit;
    
    spp = 1;
    
    if (!this.rendered) {
        this.rendered = true;
        isect = new Jpt.Intersection();

        for (y = 0; y < this.height; y += 1) {
            for (x = 0; x < this.width; x += 1) {
                color = 0;
                hit = false;
                for (s = 0; s < spp; s += 1) {
                    ray = this.camera.generateRay(x + Math.random(), y + Math.random());
                    
                    if (this.scene.intersect(ray, isect)) {
                        c = -ray.direction.norm().dot(isect.n);
                        hit = true;
                        if (c > 0) {
                            color += c;
                        }
                    }
                }
                
                color = Math.floor(255.0 * color / spp);
                this.ctx.fillStyle = "rgba(" + color + ", " + color + ", " + (hit ? 255 : 0) + ", 1.0)";
                this.ctx.fillRect(x, y, 1, 1);
            }
        }
    }
};

var renderer = new Jpt.Renderer();
