var QuadraticBezierCurve = (function () {
    function QuadraticBezierCurve(pInPoints, pInterpolation) {
        this.mInPoints = pInPoints;        
        this.mPoints = new Array();
        this.quadraticPoints(pInterpolation);
    };
        
	// Calculates the points to draw the quadratic curve for the points passed in
    QuadraticBezierCurve.prototype.quadraticPoints = function (pInterpolation) {
        // Set the interpolation value (number of points generated)
        var interpolation = pInterpolation;
        // Add the first point to the points array
        this.mPoints.push(this.mInPoints[0]);
        // Loop through the points to calculate the interpolation points
        for (var i = 0; i < interpolation; i++) {
            // Subtract the first point from the second
            var p1 = this.mInPoints[1].copy();
            p1.subtract(this.mInPoints[0]);
            
            // find the interpolation point along this vector
            p1.multiply(i + 1);
            p1.divide(interpolation + 1);
            // Add this to the first point
            p1.add(this.mInPoints[0]);
            //console.log("p1");
            //console.log(p1);

            // Subtract the second point from the third
            var p2 = this.mInPoints[2].copy();
            p2.subtract(this.mInPoints[1]);
            
            // Find the interpolation point along this vector
            p2.multiply(i + 1);
            p2.divide(interpolation + 1);
            p2.add(this.mInPoints[1]);
            //console.log("p2");
            //console.log(p2)

            p2.subtract(p1);
            p2.multiply(i + 1);
            p2.divide(interpolation + 1)
            p2.add(p1);
            this.mPoints.push(p2);
            //console.log(this.mPoints);            
        }

        this.mPoints.push(this.mInPoints[2]);  
		//console.log(this.mPoints);
    }
	// Iterates through the points to draw the curve
    QuadraticBezierCurve.prototype.draw = function (pContext) {
        pContext.save();
        pContext.beginPath();
        
		pContext.lineWidth = lineWidth;
		pContext.strokeStyle = nodeLineColour;		
						
        pContext.moveTo(this.mPoints[0].getX(), this.mPoints[0].getY());
		
        for (var i = 1; i < this.mPoints.length; i++) {
            pContext.lineTo(this.mPoints[i].getX(), this.mPoints[i].getY());
        }
        pContext.stroke();
        pContext.restore();
    };
	// Draws little circles where the anchor and control points are
	QuadraticBezierCurve.prototype.drawPoints = function(pContext){
		pContext.save();
        pContext.beginPath();        
		pContext.strokeStyle = "#555555";
		
		pContext.arc(	this.mInPoints[0].getX(),
						this.mInPoints[0].getY(),
						3,
						0,
						2 *Math.PI,
						false);
		pContext.arc(	this.mInPoints[1].getX(),
						this.mInPoints[1].getY(),
						3,
						0,
						2 *Math.PI,
						false);				
		pContext.arc(	this.mInPoints[2].getX(),
						this.mInPoints[2].getY(),
						3,
						0,
						2 *Math.PI,
						false);	
						
		pContext.stroke();
		pContext.restore();
	};
    return QuadraticBezierCurve;
})();