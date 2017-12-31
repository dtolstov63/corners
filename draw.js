
var count = 0;
var imgData;
var gRect;
var cellImage = 
{
  width :  0,
  height : 0,
	pix: null,
 
};

var isTruthy = function(value) {  
  return !!value;
};


function getMousePos(canvas, evt) 
{
  var rect = canvas.getBoundingClientRect();
  return 
  {
    x: evt.clientX - rect.left
   // y: evt.clientY - rect.top
  };
}


function OnTick()
{
	var time = new Date();
	var canvas = document.getElementById('tutorial');
	if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
 	ctx.font = '20px serif';
    Board.draw(ctx); 
    ctx.fillText(count , 10, 50);  
  }
 	window.setTimeout(OnTick, 100);
 	count++;
}

function draw() {
 // Cell.js1();
  var time = new Date();
  var canvas = document.getElementById('tutorial');
  if (canvas.getContext) 
  {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 300, 300);
	ctx.font = '20px serif';
    ctx.fillText(count, 10, 50);
     
  }
  gRect = canvas.getBoundingClientRect();
  Board.init(ctx);
  //alert(gRect.left);
  
  canvas.onmousemove = function(event) 
  {
    var xp =   event.clientX-gRect.left;
    var yp =   event.clientY-gRect.top;
    element.textContent = 'screen: (' + xp + ', ' + yp + ')\n' +'alt: ' + event.altKey;
    Board.onMouseMove(xp,yp);                      
  };

  canvas.onmousedown = function(event) 
  {
    var xp =   event.clientX-gRect.left;
    var yp =   event.clientY-gRect.top;
    element.textContent = 'screendown: (' + xp + ', ' + yp + ')\n' +'alt: ' + event.altKey;
    Board.onMouseDown(xp,yp);                      
  };
       
	console.log( time.getSeconds());
       // window.setTimeout(OnTick, 1000);
        //if( count==0){
		window.requestAnimationFrame(OnTick);
	//}
       
}
