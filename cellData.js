

function Cell( left, top)
{
  this.left = left;
  this.top  = top;
}




var CellUtils = 
{
 	js1 : function () {
    	alert("Hello from js1");
 	},

 	initImage: function( ctx )
 	{
		var pixData = ctx.createImageData(40,40);
    	for (var i=0;i<pixData.data.length;i+=4)
    	{
        	pixData.data[i+0]=128;
        	pixData.data[i+1]=128;
        	pixData.data[i+2]=128;
        	pixData.data[i+3]=255;
    	}
    	return pixData;
 	},

 	createCell: function(left, top)
 	{
		this.left = left;
  		this.top  = top;
  	}
};



var Board=
{
 

  pixels : [null],
  cells : [null],

  init : function( ctx)
  {

   // var n = new Cell();
    this.cells[0] = new Cell(100, 100);
    this.cells[1] = new Cell(10, 100);
    this.cells[2] = new CellUtils.createCell(200, 100);
    
    this.pixels[0] = CellUtils.initImage(ctx);
    //this.cells[0] =  CellUtils.createCell(1,2);
  },

  draw :function( ctx)
  {
  	
	ctx.putImageData(this.pixels[0], this.cells[0].left,50);
	ctx.putImageData(this.pixels[0], this.cells[2].left,50);
  }

 
};