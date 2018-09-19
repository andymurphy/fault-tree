var AndGate = (function (_super) {
	__extends(AndGate, _super);
    function AndGate() {
		_super.call(this);		
    }
	
	// Returns the name of this gate. Used in testing in the early stages
	AndGate.prototype.getType = function(){
		return "AND";
	}
	
	// The main draw method for the And Gate
	AndGate.prototype.draw = function (context) {
		context.save();
				
		// Begins the path, sets the line width and colour
		context.beginPath();
		context.lineWidth = lineWidth;
		context.strokeStyle = nodeLineColour;
		// Draws the bottom left
		context.moveTo(0,50);
		context.lineTo(0,40);
		context.lineTo(-50, 40);
		context.lineTo(-50, 10);
		// Draws the semi circle at the top
		context.arc(0, // centre x
					10,	// centre y
					50, // radius
					Math.PI, // start angle
					0,	// end angle
					false); // counter-clockwise?
		// Draws the bottom right
		context.lineTo(50,40);
		context.lineTo(0, 40);
		// Draws the connector line at the top
		context.moveTo(0, -40);
		context.lineTo(0, -50);
		
		context.stroke();
		context.restore();
				
		this.drawChildren(context);	
    };
	
    return AndGate;
})(FaultTreeGate);
