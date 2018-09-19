// Handles the different key down code events
function handleKeyDown(pEvent){	
	let keyCode = pEvent.keyCode;
	//console.log(keyCode);
	
	// b key used to display html data at the bottom of the screen.
	// In final version it could be used to display the name of the fault tree
	if (keyCode == '66'){
		if(windowResize){
			if(showBottomDisplayArea){
				showBottomDisplayArea = false;
				bottomOffset = 0;
				}
			else{
				showBottomDisplayArea = true;
				bottomOffset = 100;
			}
			canvas.height = window.innerHeight - canvas.offsetTop * 2 - bottomOffset;
		}
	}
	
	// f to select fixed canvas size(800x600)
	if (keyCode == '70' && windowResize == true){ 		
		windowResize = false;
		canvas.width = 800;
		canvas.height = 600;	
		miniMapCanvasPosition.setX(0);
		miniMapCanvasPosition.setY(0);
		//document.body.style.width = canvas.width + "px";
	}
	// i to show or hide instructions
	if(keyCode == '73'){
		var instructions = document.getElementById('instructionsDiv');		
		if(instructions.style.display == "block"){			
			instructions.style.display = "none";
		}
		else{
			instructions.style.display = "block";
		}
	}
	
	// r to select resize cnavas by changing the window size
	if (keyCode == '82' && windowResize == false){
		windowResize = true;		
		canvas.width = window.innerWidth - canvas.offsetLeft * 4;
		canvas.height = window.innerHeight - canvas.offsetTop * 2 - bottomOffset;
		miniMapCanvasPosition.setX(0);
		miniMapCanvasPosition.setY(0);
		//document.body.style.width = canvas.width + "px";
	}
	// S to scale the tree to fit the canvas
	if(keyCode == '83'){ 
		HandleScaleToCanvas();
	}
	// t to show or hide the testDataDiv
	if(keyCode == '84'){
		var testDataDiv = document.getElementById('testDiv');		
		if(testDataDiv.style.display == "block"){			
			testDataDiv.style.display = "none";
		}
		else{
			testDataDiv.style.display = "block";
		}
	}
	//Left arrow pressed so get the previous fault tree
	if (keyCode == '37'){ 
		faultTree = exampleFaultTrees.getPreviousFaultTree();
		HandleScaleToCanvas();		
	}
	//Right arrow pressed so get the previous fault tree
	if (keyCode == '39'){ 
		faultTree = exampleFaultTrees.getNextFaultTree();
		HandleScaleToCanvas();		
	}
	
	// 1 to select scale value of 1 - canvas space = world space
	if(keyCode == '49'){
		//offset = new Vector(0,0);
		targetzoomScale = 1;
		//Store the target offset values
		targetOffset.setX(0);
		targetOffset.setY(1 * (-0.5 * faultTree.getTotalHeight() + 50));
	
		// Set the animation bool to true so that it animates to the new scale
		animatingScale = true;
		animatingOffset = true;	
	}	
	
	//Number Pad keys to control the position of the minimap
	if(keyCode == '97'){
		miniMapCanvasPosition.setX(0);
		miniMapCanvasPosition.setY(canvas.height - miniMapCanvasScale * miniMapCanvas.height);
	}
	if(keyCode == '99'){
		miniMapCanvasPosition.setX(canvas.width - miniMapCanvasScale * miniMapCanvas.width);
		miniMapCanvasPosition.setY(canvas.height - miniMapCanvasScale * miniMapCanvas.height);
	}
	if(keyCode == '103'){
		miniMapCanvasPosition.setX(0);
		miniMapCanvasPosition.setY(0);
	}
	if(keyCode == '105'){
		miniMapCanvasPosition.setX(canvas.width - miniMapCanvasScale * miniMapCanvas.width);
		miniMapCanvasPosition.setY(0);
	}
	// Some keys for testing the panning
	if(keyCode =='68'){
		offset.setX(offset.getX() + 5);		
	}
	if(keyCode == '65'){
		offset.setX(offset.getX() - 5);
	}
	if(keyCode =='87'){
		offset.setY(offset.getY() - 5);
	}
	if(keyCode == '88'){
		offset.setY(offset.getY() + 5);
	}
};