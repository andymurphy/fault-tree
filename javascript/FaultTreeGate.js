var FaultTreeGate = (function (_super) {
	__extends(FaultTreeGate, _super);
    function FaultTreeGate() {
		_super.call(this);
        this.mChildren = new Array();
		this.myWidth = 0;
		this.myHeight = 0;
		this.myScaleToFitCanvas = 0;
    }
    FaultTreeGate.prototype.getChild = function (pIndex){
        return this.mChildren[pIndex];
    };
	FaultTreeGate.prototype.numChildren = function () {
        return this.mChildren.length;
    };
    FaultTreeGate.prototype.addChild = function (pChild) {
        this.mChildren.push(pChild);
    };
	FaultTreeGate.prototype.getTotalWidth = function(){
		return this.myWidth;
	};
	FaultTreeGate.prototype.getTotalHeight = function(){
		return this.myHeight;
	};
	FaultTreeGate.prototype.getMyScaleToFitCanvas = function(){
		return this.myScaleToFitCanvas;
	};
	// Calculates the depth to which this node extends
	FaultTreeGate.prototype.getDepth = function(pDepth, pMaxDepth){		
		pDepth = pDepth + 100;
		if (pDepth > pMaxDepth){
			pMaxDepth = pDepth;
		}
		for (var i = 0; i < this.mChildren.length; i = i + 1){
			pMaxDepth = this.mChildren[i].getDepth(pDepth, pMaxDepth);
		}			 
		this.myHeight = pMaxDepth;	
		return pMaxDepth;
	};	
	
	// Draws the children of this node
	FaultTreeGate.prototype.drawChildren = function(context){
		context.save();		
		
		//translate 1/2 of the total width to the left
		context.translate(-this.myWidth /2 ,0);

		// Loop through this node's children getting their widths and calculate the second translate
		var numberOfChildren = this.mChildren.length;		
		for (var i = 0; i < numberOfChildren; i = i + 1){ // first time loop thru topnode's children
			context.save();			
			context.translate(0, 100);			
			var previousSiblingWidth = 0;
			// loop through the previous siblings ( if i == 0 we don't have any and so don't enter the loop)
			for(j = 0; j < i; j = j + 1){ // loop through these siblings
				previousSiblingWidth = previousSiblingWidth + this.mChildren[j].myWidth;
			}			
			context.translate(previousSiblingWidth, 0);			
			context.translate(this.mChildren[i].myWidth /2 ,0);				
				
			this.mChildren[i].draw(context);
			
			// Draw the connecting lines for the left and right end nodes
			if(i == 0 || i == numberOfChildren - 1){
			context.beginPath()
			context.lineWidth = lineWidth;
			context.moveTo(0, -50);
			context.lineTo(this.myWidth /2 - previousSiblingWidth - this.mChildren[i].myWidth /2 ,-50);
			context.stroke();
			}
			context.restore();			
		}		
		context.restore();
	};
		
    // Returns the width of this node, including its children and their chidren etc
	FaultTreeGate.prototype.getWidth = function(pWidth){
		// This type of node has children so it needs to recursively go through these to get the final width needed
		
		// Get the number of children
		var numOfChildren = this.mChildren.length;
		//console.log(numOfChildren);
		// Loop through these children 
		for(var i = 0; i < numOfChildren; i = i + 1){
			var child = this.getChild(i);
			//console.log(child);
			this.myWidth = this.myWidth + child.getWidth(pWidth); // Add the width of the children to get the width needed for this node.
		}
		pWidth.push(this.getType() + " and I'm " + this.myWidth);		
		return this.myWidth;
	};	
	
    return FaultTreeGate;
})(FaultTreeNode);
