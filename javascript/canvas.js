// check to see if the browser supports
// the addEventListener function
if(window.addEventListener)
{
	window.addEventListener(
		'load', // this is the load event
		onLoad, // this is the event handler we are going to write
		false
	);
	window.addEventListener(
		'mousewheel', // when the user moves the mouse wheel
         onMouseWheel, // this method is called
         false
	);
	window.addEventListener(
		'resize', // when the user resizes the window
		onResizeHandler, // this is the name of the method called
		false
	);
	window.addEventListener(
		'keydown',
		onKeyDownHandler,
		false
	);
	window.addEventListener(
		'mousedown',
		onMouseDownHandler,
		false
	);
	window.addEventListener(
		'mouseup',
		onMouseUpHandler,
		false	
	);
	window.addEventListener(
		'mousemove',
		onMouseMoveHandler,
		false
	);
}

// ********************************** Event Handlers ************************************

// Handles the mouseDown event
function onMouseDownHandler(event){	
	mouseIsDown = true;	
	previousCanvasMousePos = currentCanvasMousePos.copy();	
};
// Handles the mouseUpEvent
function onMouseUpHandler(event){
	mouseIsDown = false;	
};
// Handles the moue move event
function onMouseMoveHandler(event){
	// Update the mouse position over the canvas - always do this as the mouse moves
	updateWorldMousePosition(event);
	// Handle the case where the mouse button is down.	
	if(mouseIsDown == true){
		// Calculate the offset i.e. the difference between the positions
		// TODO *** The bit in the add brackets could be replaced by the result of a .subtract ******
		offset.add(new Vector(currentCanvasMousePos.getX() - previousCanvasMousePos.getX(),
							  currentCanvasMousePos.getY() - previousCanvasMousePos.getY())
					);		
	}	
	previousCanvasMousePos = currentCanvasMousePos.copy();
};
// Does the alterations to the offset to make the zoom go to the mouse pointer
function alterOffsetToMousePointer(pZoomChange){
	var extraOffset = new Vector(0,0);	
	extraOffset.setX(-worldMousePosition.getX() * pZoomChange);
	extraOffset.setY(-worldMousePosition.getY() * pZoomChange);
	offset.add(extraOffset);
}
// Handles the zooming of the fault tree when the mouse wheel is moved
function onMouseWheel(event) {	
	// Update the mouse position over the canvas
	updateWorldMousePosition(event);	
	
	if(event.wheelDelta == -120){		
		zoomScale = zoomScale + zoomIncrement; // zooming in	
		alterOffsetToMousePointer(zoomIncrement);		
	}
	else if (event.wheelDelta == +120){		
		zoomScale = zoomScale - zoomIncrement; // zoooming out		
		// Prevent -ive scaling
		if(zoomScale <= 0.1){
			zoomScale = 0.1;
		}
		else {
			alterOffsetToMousePointer(-zoomIncrement);
		}
	}	
	//console.log(zoomScale);		
}
// Handles the resize of the window by the user
function onResizeHandler(){
	//console.log("resize");
	if(windowResize == true){			
		canvas.width = window.innerWidth - canvas.offsetLeft * 4;
		canvas.height = window.innerHeight - canvas.offsetTop * 2 - bottomOffset;// to allow for testing area	
		miniMapCanvasPosition.setX(0);
		miniMapCanvasPosition.setY(0);
		//document.body.style.width = canvas.width + "px";
		// TODO *********** add an option for fitting while resizing
		//HandleScaleToCanvas();
	}
};
// Handles the keydown event
function onKeyDownHandler(event){
	handleKeyDown(event); // this is contained in a separate file keyDownHandlers.js
};

// Handles the scaling of the tree to the canvas when s is pressed or a new fault tree is selected. This scale is not stored in the faulttree objects
function HandleScaleToCanvas(){
	var widthOfCurrentFaultTree = faultTree.getTotalWidth();
	var heightofCurrentFaultTree = faultTree.getTotalHeight();
	var treeDimensions = new Vector(faultTree.getTotalWidth(), faultTree.getTotalHeight());
	console.log(faultTree);
	// Determine the two possible scaling factors	
	var scalingFactors  = new Vector(canvas.width / treeDimensions.getX(), canvas.height / treeDimensions.getY());
	// Get the appropriate of the two values so the entire tree is shown and not distorted
	var scalingFactor = selectScaleFactor(scalingFactors.getX(), scalingFactors.getY());
	
	//Store the target scale factors
	targetzoomScale = scalingFactor;	
	
	//Store the target offset values
	targetOffset.setX(0);
	targetOffset.setY(scalingFactor * (-0.5 * heightofCurrentFaultTree + 50));
	
	// Set the animation bool to true so that it animates to the new scale
	animatingScale = true;
	animatingOffset = true;
};
// Returns  the smaller of the two scaling factors
function selectScaleFactor(pX, pY){
	if(pX > pY){	
		return pY;
	}
	else return pX;
}
// Updates the position the mouse pointer occupies in world space
function updateWorldMousePosition(pEvent){
	// Update the mouse position over the canvas
	currentCanvasMousePos.setX(pEvent.clientX - canvas.offsetLeft);
	currentCanvasMousePos.setY(pEvent.clientY - canvas.offsetTop);
	// Calculate the mouse position in world space - allow for origin translate and offset translate
	worldMousePosition.setX(currentCanvasMousePos.getX() - canvas.width / 2 - offset.getX());
	worldMousePosition.setY(currentCanvasMousePos.getY() - canvas.height / 2 - offset.getY());
	// Now allow for the current zoom value by dividing the world position by the zoomScale
	worldMousePosition.divide(zoomScale);
};
	
// ************************** Global Variables *******************************

var exampleFaultTrees; // stores the example fault tree object containing a list of all the fault trees
var faultTreeToDraw; // Sets the initial fault tree to be drawn
var windowResize; // Boolean value dictating whether or not the canvas can be resized by resizing the window
var bottomOffset; // The number of pixels that the canvas doesn't take up at the bottom of the screen
var zoomIncrement; // The amount by which the zoom changes for each mouse wheel move
var zoomScale; // Sets the scale value for the main window
var targetzoomScale; // Sets the target scale. Used for automatic fit to canvas
var targetOffset;	// Sets the target offset. Used for automatic offsetting to centre the tree
var animatingScale; // Boolean controlling the automatic scaling
var animatingOffset; // Boolean controlling the automatic offsetting

var currentCanvasMousePos; // A vector to hold the current position of the mouse relative to the canvas
var previousCanvasMousePos; // A vector which holds the previous mouse position
var worldMousePosition; //A vector to hold the current position of the mouse relative to the tree being drawn
var offset; // A vector which holds the offset at which the faultree is drawn. Used by the pan function and the scale faunction

var mouseIsDown;
var showBottomDisplayArea;

// Test variables to access test HTML Area
var xCoordinateTd;
var yCoordinateTd;
var prevXTd;
var prevYTd;
var offsetXTd;
var offsetYTd;
var worldXTd;
var worldYTd;
var zoomScaleTd;
var resizeWindowTd;

 // Varaibles to hold values for the minimap canvas
var miniMapCanvas;
var miniMapContext;
var miniMapCanvasPosition; // A vector to hold where the minimap is drawn on the main canvas.
var miniMapCanvasScale; // The size of the minimap relative to the main canvas default values

// Drawing variables
var nodeLineColour; // Holds the line colour
var lineWidth;
// The window load event handler ******************
function onLoad()
{
	var canvas;
	var context;
	
	function initialise()
	{
		document.body.onwheel = function(){ return false; } // Prevents the mouse wheel scrolling the scroll bar
		document.getElementById('testDiv').style.display = "none";
		document.getElementById('instructionsDiv').style.display = "block";
		canvas  = document.getElementById('canvas');
		// if it couldn't be found
		if (!canvas)
		{
			// display a pop up error message
			alert('Error: I cannot find the canvas element!');
			return;
		}
		// check that there is a getContext function
		if (!canvas.getContext)
		{
			// display a message box with the error
			alert('Error: no canvas.getContext!');
			return;
		}
		// Get the 2D canvas context.
		context = canvas.getContext('2d');
		if (!context)
		{
			alert('Error: failed to getContext!');
			return; 
		}
		// Make a second canvas, give it a context and set its values
		miniMapCanvas = document.createElement('canvas');
		miniMapContext = miniMapCanvas.getContext("2d");
		miniMapCanvas.width = 800;
		miniMapCanvas.height = 600;
		miniMapCanvasPosition = new Vector(0,0);
		miniMapCanvasScale = 0.3;
		
		// Set the initial values for the global variables;
		zoomIncrement = 0.1;
		zoomScale = 1;
		targetzoomScale = 1;		
		targetOffset = new Vector(0,0);
		animatingScale = false;
		animatingOffset = false;
		windowResize = false;
		bottomOffset = 0;
		
		mouseIsDown = false;	
		showBottomDisplayArea = false;

		currentCanvasMousePos = new Vector(0, 0);
		previousCanvasMousePos = new Vector(0, 0);
		worldMousePosition = new Vector(0,0);
		offset  = new Vector(0,0);	
		nodeLineColour = "#000000";
		lineWidth = 3;
		setHtmlTestDataArea();
		
		exampleFaultTrees = new ExampleFaultTrees();		
		faultTree = exampleFaultTrees.mFaultTrees[0]; // Set the initial fault tree
						
		setFaultTreeDimensions();
		HandleScaleToCanvas();			
		console.log("Initialise done.");				
	}	
	
	function setHtmlTestDataArea(){
		// Top row
		xCoordinateTd = document.getElementById("mouseX");
		yCoordinateTd = document.getElementById("mouseY");
		prevXTd = document.getElementById("previousMouseX");
		prevYTd = document.getElementById("previousMouseY");
		offsetXTd = document.getElementById("offsetX");
		offsetYTd = document.getElementById("offsetY");		
		// Bottom row
		worldXTd = document.getElementById("worldX");
		worldYTd = document.getElementById("worldY");
		zoomScaleTd = document.getElementById("scale");
		resizeWindowTd = document.getElementById("resize");
	};
	// Sets the widths of the example fault trees
	function setFaultTreeDimensions()
	{
		for (var i = 0; i < exampleFaultTrees.mFaultTrees.length; i = i + 1){
			exampleFaultTrees.mFaultTrees[i].getWidth(new Array());
			exampleFaultTrees.mFaultTrees[i].myScaleToFitCanvas = setScaleToCanvas(exampleFaultTrees.mFaultTrees[i]);			
		}		 
	}
	function setScaleToCanvas(pFaultTree){		
		// We also need the height to be able to choose the correct scale
		var depth = 0;
		var maxDepth = 0;		
		// Determine the two possible scaling factors by comparing the tree dimensions to the canvas width and height
		var treeDimensions = new Vector(pFaultTree.getTotalWidth(), pFaultTree.getDepth(depth, maxDepth));
		var scalingFactorX = miniMapCanvas.width / treeDimensions.getX();
		var scalingFactorY = miniMapCanvas.height / treeDimensions.getY();
	
		// Get the smaller of the two values so the entire tree is shown
		var scalingFactor = selectScaleFactor(scalingFactorX, scalingFactorY)
		
		return scalingFactor;		
	};
	// ********************************** Draw methods **************************************************
	
	// The main draw method which draws to the canvas
	function draw(){
		// Save the canvas
		context.save();
		context.fillStyle = "#bbbbbb";
		// Fill the canvas with a white rectangle to clear the previous draw
		context.fillRect(0,0,canvas.width, canvas.height);
		// Translate the canvas 
		context.translate(canvas.width * 0.5, canvas.height * 0.5);	
		// Draw a cross at the centre
		//drawCentreCross();		
		// Translate the canvas to allow for panning
		context.translate(offset.getX(), offset.getY());
		
		// scale the canvas using the zoomScale variable
		context.scale(zoomScale, zoomScale);			
		// draw the selected fault tree
		faultTree.draw(context);		
		
		//drawGrid();
		// Restore the canvas		
		context.restore();
		// Draw the minimap
		drawMiniMap();
	}	
	function drawMiniMap(){
		// Draw the components of the minimap to the minimap canvas
		drawMiniMapFaultTree();
		drawMiniMapViewPort();
		drawMiniMapBorder();
		// Draw the completed minimap to the main canvas
		context.save();	
		context.translate(miniMapCanvasPosition.getX(), miniMapCanvasPosition.getY());		
		context.scale(miniMapCanvasScale, miniMapCanvasScale);		
		
		context.drawImage(miniMapCanvas, 0 ,0);		
		context.restore();
	}
	// Draws the full fault tree on the minimap canvas
	function drawMiniMapFaultTree(){
		// Draw the whole tree on the minimap context
		miniMapContext.save();
			miniMapContext.fillStyle = "#eeeeee";
			miniMapContext.fillRect(0,0,miniMapCanvas.width, miniMapCanvas.height);
			miniMapContext.translate(miniMapCanvas.width / 2, miniMapCanvas.height / 2);		
			miniMapContext.translate(0, faultTree.getMyScaleToFitCanvas()  * (-0.5 * faultTree.myHeight + 50));
			miniMapContext.scale(faultTree.getMyScaleToFitCanvas(), faultTree.getMyScaleToFitCanvas());
			faultTree.draw(miniMapContext);	
		miniMapContext.restore();
	}
	// Draws a recangle to show the area you are viewing on the main canvas related to the whole tree
	function drawMiniMapViewPort(){
		// Draw the box which shows the large screen view
		miniMapContext.save();
		// 	Translate the origin so that the viewport is alligned with the tree
		miniMapContext.translate(miniMapCanvas.width / 2, miniMapCanvas.height / 2);
		miniMapContext.translate(0, faultTree.getMyScaleToFitCanvas() * (-0.5 * faultTree.myHeight/*miniMapCanvas.height / 2*/ + 50));
		// Draw the rectangle for the viewport	
		miniMapContext.beginPath();
		miniMapContext.lineWidth = 3 * zoomScale / faultTree.getMyScaleToFitCanvas();
		miniMapContext.scale(faultTree.getMyScaleToFitCanvas() / zoomScale, faultTree.getMyScaleToFitCanvas() / zoomScale); // myscale / zoomscale			
		miniMapContext.rect(
							-offset.getX() - canvas.width /2, 
							-offset.getY() - canvas.height / 2,
							canvas.width,
							canvas.height
							)		
		miniMapContext.stroke();
		
		miniMapContext.restore();
	};
	// Draws a simple border around the minimap to demarcate it from the main canvas.
	function drawMiniMapBorder(){
		miniMapContext.beginPath();
		miniMapContext.lineWidth = 4;		
		miniMapContext.rect(0, 0, miniMapCanvas.width, miniMapCanvas.height);
		miniMapContext.stroke();
	}
	// Draws a cross at the centre of the canvas to help with testing
	function drawCentreCross(){		
		context.save();
		context.beginPath();
		context.lineWidth = 1;
		context.strokeStyle = "#ff2222";
		context.moveTo(0,0);
		context.lineTo(50,0);
		context.moveTo(0,0);
		context.lineTo(-50,0);
		context.moveTo(0,0);
		context.lineTo(0,50);
		context.moveTo(0,0);
		context.lineTo(0,-50);
		context.stroke();
		context.restore();
	}	
	// Draws a grid of hundred squares
	function drawGrid(){
		context.save();
		context.beginPath();
		context.lineWidth = 1;
		context.strokeStyle = "#00ff00";
		for  (var i = 0; i < 9; i = i + 1){
			context.moveTo(-400 + i * 100, -300);
			context.lineTo(-400 + i * 100, 300);			
		}
		for (var i = 0; i < 7; i = i + 1){
			context.moveTo(-400, -300 + i * 100);
			context.lineTo(400, -300 + i * 100);
		}		
		context.stroke();
		context.restore();
	}
	
	// **************************** Update methods ***********************************************
	
	// Updates the window scale factor if animation is in progress
	function updatezoomScale(){
		if(animatingScale == true){
			if(zoomScale > targetzoomScale){
				zoomScale  = zoomScale - 0.02;				
				if( zoomScale - targetzoomScale < 0.03){
					animatingScale = false;
					zoomScale = targetzoomScale;					
				}
			}
			else if ( zoomScale < targetzoomScale)
			{
				zoomScale = zoomScale + 0.02;				
				if(targetzoomScale- zoomScale  < 0.03){
					animatingScale = false;
					zoomScale = targetzoomScale;					
				}
			}
		}
	};
	// Updates the offset vector if animating is in progress.
	function updateOffset(){
		if(animatingOffset == true){
			var xDif = offset.getX() - targetOffset.getX();
			var yDif = offset.getY() - targetOffset.getY();
			// This makes the difference relative to the amount still to go
			var xChange = Math.abs(xDif) / 12;
			var yChange = Math.abs(yDif) / 12;
			// Deal with the x offset
			if(xDif > 0){
				offset.setX(offset.getX() - xChange);
			}
			else if (xDif < 0){
				offset.setX(offset.getX() + xChange);
			}
			if (Math.abs(xDif) < 3){
					offset.setX(0);					
			}
			// deal with the y offset
			if(yDif > 0){
				offset.setY(offset.getY() - yChange);
			}
			else if (yDif < 0){
				offset.setY(offset.getY() + yChange);
			}
			if (Math.abs(yDif) < 3){
				offset.setY(targetOffset.getY());
			}
			// If the differences are both small then put it in place and stop the animation
			if(Math.abs(yDif) < 3 && Math.abs(xDif) < 3){
				animatingOffset = false;
			}			
		}
	};
	// Updates test info displayed in the html page
	function upDateHtmlTestInfo(){
		// Top row
		xCoordinateTd.innerText = "Canvas X: " + (currentCanvasMousePos.getX());
		yCoordinateTd.innerText  = "Canvas Y: " + (currentCanvasMousePos.getY()); 
		prevXTd.innerText = "Prev X:" + previousCanvasMousePos.getX();
		prevYTd.innerText = "Prev Y:" + previousCanvasMousePos.getY();		
		offsetXTd.innerText = "Offset X: " + offset.getX().toFixed(0);
		offsetYTd.innerText = "Offset Y: " + offset.getY().toFixed(0);	
		// Second row
		worldX.innerText = "World X: " + worldMousePosition.getX().toFixed(0);
		worldY.innerText = "World Y: " + worldMousePosition.getY().toFixed(0);
		zoomScaleTd.innerText = "Zoom Scale: " + zoomScale.toFixed(2);
		resizeWindowTd.innerText = "Window resize: " + windowResize;
	};
	// The update method which calls the update methods on the components
	function update(){
		updatezoomScale();
		updateOffset();
		upDateHtmlTestInfo();
	}
	
	// The animation loop which uses requestAnimationFrame to repeatedly call update and draw
	function animationLoop() {        
        update();
        draw();
		requestAnimationFrame(animationLoop);		
    }
	
	// Call the initialise function
	initialise();
	
	// Call the main animation loop here
	animationLoop();
}

		