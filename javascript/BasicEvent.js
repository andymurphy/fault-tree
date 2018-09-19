var BasicEvent = (function (_super) {
	__extends(BasicEvent, _super);
    function BasicEvent() {
		_super.call(this);		
		this.myWidth= 100;
		this.myHeight = 100;
    }	
	// Returns the width of a Basic Event
	BasicEvent.prototype.getWidth = function(pWidth){		
		pWidth.push("be " + this.myWidth);
		return this.myWidth;
	};
	BasicEvent.prototype.getType = function(){
		return "Basic Event";
	}
	// Draws the BasicEvent to the screen
    BasicEvent.prototype.draw = function (context) {
		context.save();
				
		// Begins the path and sets the line width
		context.beginPath();
		context.lineWidth = lineWidth;
		context.strokeStyle = nodeLineColour;
		// Moves to the start point of the drawing
		context.moveTo(0,-50);
		context.lineTo(0, -40);
		// Draw the circle using my segment algorithm
		this.drawLineSegment(context, 36, 45, 0 ,4);//(pContext, pSegments, pRadius, pCentreX, pCentreY)
		
		context.stroke();		
		context.restore();
    };	

    return BasicEvent;
})(FaultTreeNode);
