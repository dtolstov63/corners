
var count = 0;
var imgData;
var gRect;
var cellImage = 
{
  width :  0,
  height : 0,
	pix: null,
 
};

var gAnimCount  = 0;
var gAnimReqId  = undefined;




function OnTick()
{
	var canvas = document.getElementById('tutorial');
	if (canvas.getContext) {
    	var ctx = canvas.getContext('2d');
 		ctx.font = '20px serif';
   	 	Board.draw(ctx); 
    	ctx.fillText(count , 10, 50);  
  	}
 	window.setTimeout(OnTick, 1000);
 	//requestAnimationFram(onTick);
 	count++;
}

function OnAnim()
{
	if( gAnimCount < 0)
	{
		if( gAnimReqId ){
			window.cancelAnimationFrame(gAnimReqId);
			gAnimReqId = undefined;

		}
		return;
	}
	var canvas = document.getElementById('tutorial');
	if (canvas.getContext) 
	{
		var ctx = canvas.getContext('2d');
		Board.draw(ctx);
		ctx.font = '20px serif';
		//ctx.fillText("ANIMATING" , 10, 50);  
	}
	window.setTimeout(OnAnim, 16);
	gAnimCount--;
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
   // requestAnimationFrame(OnTick);                    
  };

  canvas.onmousedown = function(event) 
  {
  	var cv = document.getElementById('tutorial');
  	var ctx = canvas.getContext('2d');
    var xp =   event.clientX-gRect.left;
    var yp =   event.clientY-gRect.top;
    element.textContent = 'screendown: (' + xp + ', ' + yp + ')\n' +'alt: ' + event.altKey;
    gAnimCount = Board.onMouseDown(xp,yp,ctx);  
    if( gAnimCount >0){
    	gAnimCount++;
    	gAnimReqId = requestAnimationFrame(OnAnim);
	}
  };
     
     //requestAnimationFrame(OnAnim); 
	console.log( time.getSeconds());
       // window.setTimeout(OnTick, 1000);
        //if( count==0){
	requestAnimationFrame(OnTick);
	//}
       
}
