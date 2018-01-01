



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


 	createCell: function(left, top,sz)
 	{
		this.left = left;
  		this.top  = top;
   		this.needRedraw = true;
  		this.type = "none";
  		this.index = -1;
  		this.rot  = 0;
  		this.clIndex = 0;
  		this.sz = sz;
  		this.isSelectd = false;
  	},

  	setCl: function( ndx, rot, clObj)
  	{
		clObj.index = ndx;
		clObj.rot   = rot;
		clObj.type  = "cl"; 
  	},

  	cellAddRot(clObj)
  	{
  		var r = clObj.rot + 1;
  		if( r > 3) r  = 0;
  		clObj.rot  = r;
  	},
  	cellCopy(dstObj, srcObj)
  	{
		dstObj.type  = srcObj.type;
		dstObj.index = srcObj.index;
		dstObj.rot   = srcObj.rot;
  	},

  	drawSelection(ctx,clObj )
  	{
 		ctx.strokeStyle = '#FF9000'; //rgb
 		ctx.strokeRect(clObj.left, clObj.top, clObj.sz, clObj.sz);
  	},

  	imagedataToImage: function (imagedata) 
  	{
    	var canvas = document.createElement('canvas');
    	var ctx = canvas.getContext('2d');
    	canvas.width = imagedata.width;
    	canvas.height = imagedata.height;
    	ctx.putImageData(imagedata, 0, 0);
    	var image = new Image();
    	image.src = canvas.toDataURL();
    	return image;
	}

};



var Board=
{
 
    msDownLock:false,
  	drawCall : 0,
  	elementSize :8,
  	numInX:16,
  	numInY:16,
  	selectedObj: null,
  	pixels  : [null],
  	pathPix : [null],
  	path  : [
  				[0,1, 1,1, 1,0],
  				[3,0, 3,1, 4,1],
  				[4,3, 3,3, 3,4],
  				[0,3, 1,3, 1,4],
 				[1,0, 1,1, 1,2, 1,3, 1,4],
				[0,1, 1,1, 2,1, 3,1, 4,1],
				[3,0, 3,1, 3,2, 3,3, 3,4],
				[0,3, 1,3, 2,3, 3,3, 4,3],
  			],	
  	cellArray : [[null]],
  	auxImage : null,
  	animTask: {
  		img: null,
  		rStart: 0,
  		rEnd: 0,
  		xStat : 0,
  		yStart: 0,
 		tStep:0,
  		t:0,
  		n:0,
  		onStart:function(){},
  		onEnd:function(){},
   		init: function( rs, re, xs, xe, ys, ye, num, img,funcStat, funcEnd)
  		{
  			if(this.img == null){
  				this.img = img;
  				this.rStart = rs;
  		 		this.rEnd = re;
  		 		this.xStart = xs;
  		 		this.yStart = ys;
                this.xEnd  = xe;
                this.yEnd  = ye;
  				this.tStep = 1.0/num;
  				this.t = 0;
  				this.onStart  = funcStat; 
  				this.onEnd    = funcEnd; 
  				this.n = 0;
  			}
  		},

  		perform : function(ctx)
  		{
            if(this.img != null){
            	if(this.n == 0){
             		if( this.onStart!=null) this.onStart();
             	}
           	    var w = this.img.width;
         	    var h = this.img.height;
         	    var tt = (this.t>=1) ? 1: this.t;
         	    tt = 3*tt*tt - 2*tt*tt*tt;
         	    var rt = this.rStart * (1- tt) + this.rEnd * tt;
         	    var xt = this.xStart * (1- tt) + this.xEnd * tt;;
         	    var yt = this.yStart * (1- tt) + this.yEnd * tt;;
    			ctx.translate( xt + w/2, yt + h/2);
    			ctx.rotate(rt *3.1415/180.0);
    			ctx.drawImage(this.img,-w/2,-h/2, w, h);
    			ctx.resetTransform();
    			if(this.t>=1){
        			if(this.onEnd!=null) this.onEnd() ;
        			this.img  = null;
    			}else{
    				this.t +=  this.tStep;
    				this.n++;
    			}
            }
  		}
  	},

	init : function( ctx)
 	{
  		this.pixels[0]  = CellUtils.initBkImage(ctx, this.elementSize); //background
  		// Create pixel data for every path
    	for( var i  = 0; i< this.path.length; i++)
    	{
        	this.pathPix[i] = CellUtils.initPathImage(ctx, this.elementSize, this.path[i]);
    	}
 
        // Create 2-D cell array
    	var sz = this.elementSize *5;
    	var cnt = 0;
    	for( var y = 0; y<this.numInY; y++)
    	{
    		this.cellArray[y] = new Array();
    		for( var x = 0; x< this.numInX; x++)
    		{
     			this.cellArray[y][x] = new CellUtils.createCell(x*sz, y*sz,sz);
    			cnt++;
			}
		}
    	// Create some image
   	    this.auxImage  = CellUtils.imagedataToImage(this.pathPix[0]);

    	// show all
    	

		CellUtils.setCl(0,0, this.cellArray[0][0]);
		CellUtils.setCl(0,1, this.cellArray[0][1]);
		CellUtils.setCl(0,2, this.cellArray[0][2]);
		CellUtils.setCl(0,3, this.cellArray[0][3]);

		CellUtils.setCl(0,0, this.cellArray[1][0]);
		CellUtils.setCl(0,1, this.cellArray[1][1]);
		CellUtils.setCl(0,2, this.cellArray[1][2]);
		CellUtils.setCl(0,3, this.cellArray[1][3]);

		CellUtils.setCl(1,1, this.cellArray[6][6]);
		//this.cellArray[6][6].isSelected = true;
  
    },

  	draw :function( ctx)
  	{
  		// Draw all cells
   		var sz = this.elementSize *5; 
		for( var line = 0; line < this.numInY; line++ )
		{
			for( var row = 0; row< this.numInX; row++ )
			{
				var cl = this.cellArray[line][row];
				if( cl.needRedraw==true){
					if( cl.type=="cl"){
						var n = cl.index*4 + cl.rot;
						ctx.putImageData(this.pathPix[n], cl.left, cl.top);
					}
					if( cl.type=="none"){
						ctx.putImageData(this.pixels[0], cl.left, cl.top); // background
					}
				}
			}
		}
         
        if(this.selectedObj!= null ){ 
			CellUtils.drawSelection(ctx,this.selectedObj);
		}
		// Do animations
		this.animTask.perform(ctx);
		this.drawCall++;
  	},

  	onMouseMove : function( xp, yp)
  	{

  	},

  	onMouseDown : function( xp, yp, ctx)
  	{
        if( this.msDownLock == true)
        {
        	return;
        }
        var hasAnim = false;
        var numAnimFrames = 0;
        this.msDownLock  = true;
        var  canRotate = false;
        var  canMove = false
  		var sz = this.elementSize *5;
  		line = Math.floor(yp/sz);
  		row  = Math.floor(xp/sz);
        
        var myCell  = this.cellArray[line][row];
        var selCell = this.selectedObj;
        if(myCell.type=="cl")
        {
        	if( selCell == null){
        		this.selectedObj = myCell;
        		numAnimFrames = 1;
        	}else
        	{
        		if((selCell.left== myCell.left) &&(selCell.top == myCell.top)){
        			canRotate = true; // click on selected == rotate
        		}else{
        			this.selectedObj = myCell; // change selection
        			numAnimFrames = 1;
        		}
        	}
        }

        if( (myCell.type=="none") && (selCell!= null) )
        {
			canMove = true;
        }

        if ((canRotate==true) && (this.animTask.img == null))
        {	
        	numAnimFrames = 12;
        	hasAnim = true;
  			this.animTask.init( 
  				myCell.rot*90, myCell.rot*90 + 90,                  // angle
  				row*sz,  row*sz,        // x from to 
  				line*sz, line*sz,       // y from to
  				numAnimFrames,                      // num frames
  				this.auxImage,                                                   // image to animate
  				function( ){ myCell.type = "none"} ,// call when anim start
  				function( ){ myCell.type = "cl"; CellUtils.cellAddRot(myCell); Board.msDownLock  = false;}  // call when anim end
  			);
  		}

  		if ((canMove==true) && (this.animTask.img == null))
        {	
        	var dx = row*sz  - selCell.left;
        	var dy = line*sz - selCell.top;
        	var dd = Math.sqrt(dx*dx + dy*dy);
        	numAnimFrames = 20 * dd/640;;
        	hasAnim = true;
  			this.animTask.init( 
  				selCell.rot*90,  selCell.rot*90 ,                  // angle
  				selCell.left,    row*sz,        // x from to 
  				selCell.top ,    line*sz,       // y from to
  				numAnimFrames,                   // num frames
  				this.auxImage,                                                   // image to animate
  				function( ){selCell.type = "none";} ,// call when anim start
  				function( ){CellUtils.cellCopy(myCell,selCell); myCell.type = "cl"; Board.selectedObj= myCell; Board.msDownLock  = false;}  // call when anim end
  			);
  		}

  		if(hasAnim==false )
  		{
  			Board.msDownLock  = false;
  		}
  		return numAnimFrames;
  		
   	}

 
};