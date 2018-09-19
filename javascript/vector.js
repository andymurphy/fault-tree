// The definition of the vector object.
// Takes two parameters: the x and y coordinates
var Vector = (function() {
	// Constructor
	function Vector(pX, pY){
		this.setX(pX);
		this.setY(pY);
	};
	// returns the x component of the vector
	Vector.prototype.getX = function(){
		return this.mX;
	};
	// sets the x component of the vector
	Vector.prototype.setX = function(pX){		
		this.mX = pX;		
	};
	// returns the y component of the vector
	Vector.prototype.getY = function(){
		return this.mY;
	};
	// sets the y component of the vector
	Vector.prototype.setY = function(pY){		
		this.mY = pY;		
	};
	
	// New functions for the Vector object to give it more functionality
	
	// Adds a this vector to one passed in as a parameter
	Vector.prototype.add = function(pVectorToAdd){
		this.setX(this.getX() + pVectorToAdd.getX());
		this.setY(this.getY() + pVectorToAdd.getY());
	};
	// Subtracts a vector passed in as a parameter from this one
	Vector.prototype.subtract = function(pVectorToSubtract){
		this.setX(this.getX() - pVectorToSubtract.getX());
		this.setY(this.getY() - pVectorToSubtract.getY());
	};
	// Multiplies this Vector by a scalar value
	Vector.prototype.multiply = function (pScalar){
		this.setX(this.getX() * pScalar);
		this.setY(this.getY() * pScalar);
	};
	// Divides this Vector by a scalar value
	Vector.prototype.divide = function (pScalar){
		this.setX(this.getX() / pScalar);
		this.setY(this.getY() / pScalar);
	};
	// Rotates this Vector through the angle passed in as a parameter in radians
	Vector.prototype.rotate = function(pAngleInRadians){
		
		var newX = (-Math.sin(pAngleInRadians) * this.getY() + Math.cos(pAngleInRadians) * this.getX()); 
		var newY = (Math.sin(pAngleInRadians) * this.getX() + Math.cos(pAngleInRadians) * this.getY());
		return new Vector(newX, newY);
	};
	// Returns a copy of the Vector
	Vector.prototype.copy = function(){
		return new Vector(this.getX(), this.getY());
	};	
	
	// returns the magnitude of the vector.
	Vector.prototype.magnitude = function(){
		return Math.sqrt(this.getX() * this.getX() + this.getY() * this.getY());
	}	
	// Normalises the vector. 
	Vector.prototype.normalise = function(){
		this.setX(this.getX() / this.magnitude());
		this.setY(this.getY() / this.magnitude());
	};
	// limits the vector to the passed in value
	Vector.prototype.limitTo = function(pScalar){
		if(this.magnitude() > pScalar){
			this.normalise();
			this.multiply(pScalar);
		}
	};
    // Prints the vector to the console
	Vector.prototype.print = function () {
	    console.log("(" + this.getX() + ", " + this.getY() + ")");
	};

	return Vector;
})();
