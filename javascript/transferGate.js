var TransferGate = (function (_super) {
	__extends(TransferGate, _super);
    function TransferGate() {
		_super.call(this);		
		this.myWidth= 100;
		this.myHeight = 100;
    }	
	// Returns the width of a Basic Event
	TransferGate.prototype.getWidth = function(pWidth){		
		pWidth.push("tg " + this.myWidth);
		return this.myWidth;
	};
	// Returns a string with a description of the type of gate
	TransferGate.prototype.getType = function(){
		return "Transfer Gate";
	}
	// Draws the BasicEvent to the screen
    TransferGate.prototype.draw = function (context) {
		context.save();
				
		// Rotation needed to get the object into the correct orientation
		context.rotate(-Math.PI/2);
		// Begins the path and sets the line width
		context.beginPath();
		context.lineWidth = lineWidth;
		context.strokeStyle = nodeLineColour;
		// Draw the triangle
		this.drawLineSegment(context, 3, 55, -21 ,0); //(pContext, pSegments, pRadius, pCentreX, pCentreY)
		// Draws the connector line at the top
		context.moveTo(30, 0);
		context.lineTo(50, 0);		
		context.stroke();
		context.restore();
    };	
		
    return TransferGate;
})(FaultTreeNode);
