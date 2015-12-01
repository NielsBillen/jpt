var Jpt = Jpt || {};

/*global console, Geometry, BSDF, Spectrum*/

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
    return new Geometry.Ray(this.origin, d);
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
    this.camera = new Jpt.Camera(new Geometry.Vector(0, 0, 0), new Geometry.Vector(0, 0, 1).norm(), new Geometry.Vector(0, 1, 0), this.width, this.height, 0.5 * Math.PI);
    this.scene = new Jpt.Scene();
    
    var red, blue;
    red = new BSDF.Diffuse(1, 0, 0);
    blue = new BSDF.Diffuse(0, 0, 1);
    
    this.scene.add(new Jpt.Sphere(new Geometry.Vector(0, 0, 10), 5, red));
    this.scene.add(new Jpt.Sphere(new Geometry.Vector(4, -4, 12), 4, blue));
    this.scene.add(new Jpt.Sphere(new Geometry.Vector(-4, -4, 12), 4, blue));
    this.scene.add(new Jpt.Sphere(new Geometry.Vector(4, 4, 12), 4, blue));
    this.scene.add(new Jpt.Sphere(new Geometry.Vector(-4, 4, 12), 4, blue));
};

Jpt.Renderer.prototype.gammaCorrect = function (value) {
    "use strict";
    return Math.max(0, Math.min(255, Math.round(255.0 * Math.pow(value, 1.0 / 2.2))));
};

Jpt.Renderer.prototype.start = function () {
    "use strict";
    
    var x, y, s, spp, ray, color, c, isect, hit;
    
    spp = 1;
    
    if (!this.rendered) {
        this.rendered = true;
        isect = new Geometry.Intersection();

        for (y = 0; y < this.height; y += 1) {
            for (x = 0; x < this.width; x += 1) {
                color = new Spectrum.RGB(0, 0, 0);
                hit = false;
                for (s = 0; s < spp; s += 1) {
                    ray = this.camera.generateRay(x + Math.random(), y + Math.random());
                    
                    if (this.scene.intersect(ray, isect)) {
                        c = isect.bsdf.f(-ray.direction.norm(), -ray.direction.norm()).scale(-ray.direction.dot(isect.n));
                        hit = true;
                        color = color.add(c);
                    }
                }
                
                color = color.divide(spp);
                color = color.scale(2);
                
                this.ctx.fillStyle = "rgba(" + this.gammaCorrect(color.red) + ", " + this.gammaCorrect(color.green) + ", " + this.gammaCorrect(color.blue) + ", 1.0)";
                this.ctx.fillRect(x, y, 1, 1);
            }
        }
    }
};

var renderer = new Jpt.Renderer();
