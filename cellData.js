

function Cell( left, top, pix)
{
  this.left = left;
  this.top  = top;
  this.pix  = pix;
}




var CellUtils = 
{
 	js1 : function () {
    	alert("Hello from js1");
 	},

    

   	bkPixel1: function( data, ndx)
    {
		data[ndx+0]=12; data[ndx+1]=12; data[ndx+2]=12; data[ndx+3]=255;
    }, 
	bkPixel2: function( data, ndx)
    {
		data[ndx+0]=30; data[ndx+1]=30; data[ndx+2]=30; data[ndx+3]=255;
    },
    bkPixel3: function( data, ndx)
    {
		data[ndx+0]=100; data[ndx+1]=100; data[ndx+2]=100; data[ndx+3]=255;
    },
    bkPath: function( d, ndx)
    {
		d[ndx+0]= 100; d[ndx+1]=100; d[ndx+2]=100; d[ndx+3]=255;
    },
    bkPath2: function( d, ndx)
    {
		d[ndx+0]= 100; d[ndx+1]=100; d[ndx+2]=100; d[ndx+3]=255;
    },
    bkPathL: function( d, ndx)
    {
		d[ndx+0]= 200; d[ndx+1]= 200; d[ndx+2]=200; d[ndx+3]=255;
    },
    bkPathD: function( d, ndx)
    {
		d[ndx+0]= 20; d[ndx+1]= 20; d[ndx+2]=20; d[ndx+3]=255;
    },
    fgPath: function( d, ndx)
    {
		d[ndx+0]= 220; d[ndx+1]=220; d[ndx+2]= 220; d[ndx+3]=255;
    },

    fillRect: function( pix, l, t , w, h, stride,cFunc1, cFunc2)
    {
    	for( var j = 0; j<h; j++)
    	{
    		var lineStart =  l + (t + j)*stride; 
    		for (var i= 0 ; i<w; i++)
    		{
    			var p  = (i + lineStart)*4;
    			if(( i!=0) && (j!=0 )){
    				cFunc1(pix.data,p);
    			}else
    			{
    				cFunc2(pix.data,p);
     			}
      		}
    	}
    },

 	initBkImage: function( ctx , elSize)
 	{
 		ts = elSize*5;
		var pixData = ctx.createImageData(ts,ts);
		
    	var w = elSize;
    	var h = elSize;
    	
    	for( var y =0; y<5; y++)
    	{
    		for( var x =0; x<5; x++)
    		{
    			this.fillRect( pixData , x*w, y*h, w, h, ts, this.bkPixel2,this.bkPixel2);
    		}
    	}
    	this.fillRect( pixData , 0, 0, ts, 1, ts, this.bkPixel3,this.bkPixel3);
    	this.fillRect( pixData , 0, 0, 1, ts, ts, this.bkPixel3,this.bkPixel3);
     	return pixData;
 	},

 	initPathImage: function( ctx , elSize,  path)
 	{
 		//alert("Hello " + path.length);
 		ts = elSize*5;
 		var pixData = ctx.createImageData(ts,ts);
 		for( var y =0; y<5; y++)
    	{
    		for( var x =0; x<5; x++)
    		{
    			this.fillRect( pixData , x*elSize, y*elSize, elSize, elSize, ts, this.bkPath,this.bkPath);
    		}
    	}

		this.fillRect( pixData , 0, 0, ts, 1, ts, this.bkPathL,this.bkPathL);
    	this.fillRect( pixData , 0, 0, 1, ts, ts, this.bkPathL,this.bkPathL);
    	this.fillRect( pixData , 0,    ts-1, ts, 1,  ts, this.bkPathD,this.bkPathD);
    	this.fillRect( pixData , ts-1, 0,    1,  ts, ts, this.bkPathD,this.bkPathD);

    	for( var n  = 0; n< path.length; n+=2)
    	{
    		var xx = path[n];
    		var yy = path[n+1];
     		this.fillRect( pixData , xx*elSize, yy*elSize, elSize, elSize, ts, this.fgPath,this.fgPath);
  
    	}
    	
    	return pixData;
 	},


 	createCell: function(left, top, pix)
 	{
		this.left = left;
  		this.top  = top;
  		this.pix  = pix;
  	}
};



var Board=
{
 
  elementSize :8,
  numInX:16,
  numInY:16,
  pixels  : [null],
  pathPix : [null],
  path  : [
  				[0,1,1,1,1,0],
  				[3,0,3,1,4,1],
  				[4,3,3,3,3,4]
  			],	
  cells : [null],

  init : function( ctx)
  {

   // var xa = this.path[0];
   
    this.pixels[0]  = CellUtils.initBkImage(ctx, this.elementSize);
    for( var i  = 0; i< this.path.length; i++)
    {
        this.pathPix[i] = CellUtils.initPathImage(ctx, this.elementSize, this.path[i]);

    }
 
    var sz = this.elementSize *5;
    var cnt = 0;
    for( var y = 0; y<this.numInY; y++)
    {
    	for( var x = 0; x< this.numInX; x++)
    	{
    		this.cells[cnt] = new CellUtils.createCell(x*sz, y*sz,this.pixels[0]);
    		cnt++;
		}
	}

    // show all
     for( var i  = 0; i< this.path.length; i++)
     {
		this.cells[i].pix = this.pathPix[i];
     }
  
  },

  draw :function( ctx)
  {
  	var sz = this.elementSize *5;
  	for( var x = 0; x< this.cells.length; x++)
  	{
		ctx.putImageData(this.cells[x].pix, this.cells[x].left, this.cells[x].top);
	}
	//ctx.putImageData(this.pixels[0], this.cells[2].left,50);
  }

 
};