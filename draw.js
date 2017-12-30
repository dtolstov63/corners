
var count = 0;
var imgData;
var gRect;
var cellImage = 
{
  width :  0,
  height : 0,
	pix: null,
  /*
  initImage : function(ctx) 
  { 
    this.pix = ctx.createImageData(40,40);
    for (var i=0;i<this.pix.data.length;i+=4)
    {
        this.pix.data[i+0]=25;
        this.pix.data[i+1]=200;
        this.pix.data[i+2]=0;
        this.pix.data[i+3]=255;
    }
    //return something; 
  }
  */
  
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
    ctx.clearRect(0, 0, 300, 300);
	ctx.font = '20px serif';
		//ctx.putImageData(cellImage.pix,0,0);
		
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
    //cellImage.initImage(ctx);
  //  cellImage.pix = CellUtils.initImage(ctx);
    
  }
  gRect = canvas.getBoundingClientRect();
  Board.init(ctx);
  //alert(gRect.left);
  //var el = document.getElementById('element');
	canvas.onmousemove = function(event) 
  {
    var xp =   event.clientX-gRect.left;
    element.textContent = 'screen: (' + xp + ', ' + event.clientY + ')\n' +
                          'alt: ' + event.altKey;
                        
  };
       
	console.log( time.getSeconds());
       // window.setTimeout(OnTick, 1000);
        //if( count==0){
		window.requestAnimationFrame(OnTick);
	//}
       
}
