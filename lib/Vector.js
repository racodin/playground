'use strict';
/**
 * @module Vector
 */

let angleMode = "radians";
export default class Vector {
    /**
     * @class Vector
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     */
    constructor( x = 0, y = 0, z = 0 ){
        if( typeof x !== "number" ){
            throw Error("There is problem by the param");
        }
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static get angleMode(){
      return angleMode;
    }

    static set angleMode( value ){
      if (value === 'radians' || value === 'degrees') {
        angleMode = value;
      } else {
        console.warn('You can only string by "radians" or "degrees"')
      }
    }

    static create( x = 0, y = 0, z = 0 ){
        return new Vector( x, y, z );
    }

    /**
     * @method set
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @chainable
     */
    set( x = 0, y = 0, z = 0 ){
        if( x instanceof Vector ){
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        } else if(x instanceof Array){
            this.x = x[0];
            this.y = x[1];
            this.z = x[2];
        } else {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        return this;
    }

    /**
     * @method clone
     * @return {Vector}
     */
    clone(){
        return new Vector(this.x, this.y, this.z);
    }

    /**
     * @method sq
     * @return {Number}
     */
    sq(){
        let x = this.x;
        let y = this.y;
        let z = this.z;
        return x * x + y * y + z * z;
    }


    /**
     * @method add
     * @param {Vector|Number} x
     * @param {Number} y
     * @param {Number} z
     * @chainable
     */
    add( x = 0, y = 0, z = 0 ){
        if( x instanceof Vector ){
            this.x += x.x;
            this.y += x.y;
            this.z += x.z;
        } else if(x instanceof Array){
            this.x += x[0];
            this.y += x[1];
            this.z += x[2];
        } else {
            this.x += x;
            this.y += y;
            this.z += z;
        }

        return this;
    }

    /**
     * @static
     * @method add
     * @param  {Vector} v1 
     * @param  {Vector} v2 
     * @param  {Vector} target
     */
    static add( v1 = undefined, v2 = undefined, target = undefined ) {
        if( !target ){
            target = v1.clone();
        } else {
            target.set( v1 );
        }
        target.add( v2 );

        return target;
    }

    /**
     * @method sub
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @chainable
     */
    sub( x = 0, y = 0, z = 0 ){
        if( x instanceof Vector ){
            this.x -= x.x;
            this.y -= x.y;
            this.z -= x.z;
        } else if(x instanceof Array){
            this.x -= x[0];
            this.y -= x[1];
            this.z -= x[2];
        } else {
            this.x -= x;
            this.y -= y;
            this.z -= z;
        }

        return this;
    }

    /**
     * @static
     * @method sub
     * @param  {Vector} v1 
     * @param  {Vector} v2 
     * @param  {Vector} target
     */
    static sub( v1 = undefined, v2 = undefined, target = undefined ) {
        if( !target ){
            target = v1.clone();
        } else {
            target.set( v1 );
        }
        target.sub( v2 );

        return target;
    }

    /**
     * @method mult
     * @param {Vector|Number[]} v
     * @chainable
     */
    mult( v ){
        if( v instanceof Vector ){
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
        } else if(v instanceof Array){
            this.x *= v[0];
            this.y *= v[1];
            this.z *= v[2];
        } else {
            this.x *= v;
            this.y *= v;
            this.z *= v;
        }

        return this;
    }

    /**
     * @static
     * @method mult
     * @param  {Vector} v 
     * @param  {Vector|Number[]} n 
     * @param  {Vector} target
     */
    static mult( v = undefined, n = undefined, target = undefined ) {
        if( !target ){
            target = v.clone();
        } else {
            target.set( v );
        }
        target.mult( n );

        return target;
    }

    /**
     * @method div
     * @param {Vector|Number[]} v
     * @chainable
     */
    div( v ){
        if( v instanceof Vector ){
            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;
        } else if(v instanceof Array){
            this.x /= v[0];
            this.y /= v[1];
            this.z /= v[2];
        } else {
            this.x /= v;
            this.y /= v;
            this.z /= v;
        }

        return this;
    }

    /**
     * @static
     * @method div
     * @param  {Vector} v 
     * @param  {Vector|Number[]} n 
     * @param  {Vector} target
     */
    static div( v = undefined, n = undefined, target = undefined ) {
        if( !target ){
            target = v.clone();
        } else {
            target.set( v );
        }
        target.div( n );

        return target;
    }

    /**
     * @method mag
     * @return {Number}
     */
    mag(){
        return Math.sqrt( this.sq() );
    }
    
    /**
     * @static
     * @method mag
     * @param {Vector} v
     * @return {Number}
     */
    static mag( v = undefined ) {
        return v.mag();
    }

    /**
     * @method normalize
     * @return {Vector}
     * @chainable
     */
    normalize(){
        let len = this.mag();
        if( len !== 0 ) this.mult( 1 / len );
        return this;
    }

    /**
     * @static
     * @method normalize
     * @param {Vector} v
     * @return {Vector}
     */
    static normalize( v = undefined ) {
        return v.normalize();
    }

    /**
     * @method limit
     * @return {Number} max
     * @chainable
     */
    limit( max ){
        let sq = this.sq();
        if( sq > max * max ) this.div( Math.sqrt( sq ) ).mult( max );
        return this;
    }

    /**
     * @static
     * @method limit
     * @param {Vector} v
     * @return {Vector}
     */
    static limit( v = undefined ) {
        return v.limit();
    }
        
    /**
     * @method dist
     * @param {Vector} v
     * @return {Number}
     */
    dist( v ){
        return v.clone().sub( this ).mag();
    }
    
    /**
     * @static
     * @method dist
     * @param {Vector} v1
     * @param {Vector} v2
     * @return {Number} 
     */
    static dist( v1 = undefined, v2 = undefined ) {
        return v1.dist( v2 );
    }

    /**
     * @method heading
     * @return {Number}
     */
    heading(){
        let h = Math.atan2(this.y, this.x);
        if( Vector.angleMode.toLocaleUpperCase() === "DEGREES" ) h = h * 180.0 / Math.PI;
        return h;
    }

    /**
     * @method dot
     * @param {Vector}
     * @return {Number}
     */
    dot( v ){
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    /**
     * @static
     * @method dot
     * @param {Vector} v1
     * @param {Vector} v2
     * @return {Number} 
     */
    static dot( v1 = undefined, v2 = undefined ) {
        return v1.dot( v2 );
    }

    /**
     * @method cross
     * @param {Vector}
     * @return {Number}
     */
    cross( v ){
        let x = this.y * v.z - this.z * v.y;
        let y = this.z * v.x - this.x * v.z;
        let z = this.x * v.y - this.y * v.x;
        return new Vector(x, y, z);
    }

    /**
     * @static
     * @method dot
     * @param {Vector} v1
     * @param {Vector} v2
     * @return {Number} 
     */
    static cross( v1 = undefined, v2 = undefined ) {
        return v1.cross( v2 );
    }

    /**
     * @method angleBetween
     * @param {Vector}
     * @return {Number} 
     */
    angleBetween( v ){
        let dotmagmag = this.dot( v ) / ( this.mag() * v.mag() );
        let angle = Math.acos( Math.min( 1, Math.max( -1, dotmagmag ) ) );
        if( Vector.angleMode.toLocaleUpperCase() === "DEGREES" ) angle = angle * 180.0 / Math.PI;
        return angle;
    }

    /**
     * @static
     * @method angleBetween
     * @param {Vector} v1
     * @param {Vector} v2
     * @return {Number} 
     */
    static angleBetween( v1 = undefined, v2 = undefined ) {
        return v1.angleBetween( v2 );
    }
}