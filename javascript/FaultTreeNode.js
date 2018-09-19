var FaultTreeNode = (function () {
    function FaultTreeNode() {
        this.setId(FaultTreeNode.sTotalNodes++);
    }
	FaultTreeNode.sTotalNodes = 0;
    FaultTreeNode.prototype.getId = function () {
        return this.mId;
    };
    FaultTreeNode.prototype.setId = function (pId) {
        this.mId = pId;
    };
	FaultTreeNode.prototype.getWidth = function(pWidth){		
		return 100;
	};
	FaultTreeNode.prototype.getHeight = function(pHeight, pMaxHeight){
		return 100;
	};
	FaultTreeNode.prototype.draw = function (context) {
		// overidden in the classes that inherit
    };	
	// Draws a line segment shape. pSegment is the number of sides. Starts to look like a circle as this gets higher and pRadius gets smaller
	FaultTreeNode.prototype.drawLineSegment = function(pContext, pSegments, pRadius, pCentreX, pCentreY){			
		var anglePerSegment = Math.PI * 2 / pSegments;
		var radius = pRadius;
		
		for (var i = 0; i <= pSegments; i = i + 1) {
			var angle = anglePerSegment * i;
			var x = pCentreX + pRadius * Math.cos(angle);
			var y = pCentreY + pRadius * Math.sin(angle);
			if (i == 0) {
				pContext.moveTo(x,y);
			}
			else {
				pContext.lineTo(x,y);
			}
		}		
	};
	
	FaultTreeNode.prototype.getDepth = function(pDepth, pMaxDepth){
		pDepth = pDepth + this.getHeight();
		if (pDepth > pMaxDepth){
			pMaxDepth = pDepth;
		}		
		return pMaxDepth;
	}
    return FaultTreeNode;
})();
