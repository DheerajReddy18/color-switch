var myobstacles=[];
   var outerradius=60;
   var innerradius=45;
   var startangle=0;
   var endangle=0;
   var colours=["blue","green","red","yellow","pink","orange"]
   var n=colours.length;
   var z=[];
   var x=300;
   var rotate=0;
   var y=60;
  
   var i=0;
   var raf=0
  
   var canvas=document.getElementById("canvas");
   var ctx=canvas.getContext('2d');
   var myobstacles=[];
  
   
   
  function startgame(){

     myobstacles.push(new obstacle);
	 myobstacles[0].randomcolor();
	 gamearea.updategamearea();
	  
	  
  }
  
 
  class obstacle{
 
  randomcolor(){
   
    for ( i=0;i<2;i++) 
	   {
	     
		 if(i>0)
		 {
		 z[i]=Math.floor(Math.random()*6);
		
		  while(z[i-1]==z[i])
		  z[i]=Math.floor(Math.random()*6);
		 }
		 else
		  z[i]=Math.floor(Math.random()*6);
		  
	}
  }
   drawobstacle(){
  
   for( var j=0;j<2;j++)
   {
   if(this.rotate > (Math.PI)*2)
	{
	  this.rotate=0
	}
     
     startangle=(Math.PI)*j+this.rotate;
	 endangle=(Math.PI)*(j+1)+this.rotate;
	 ctx.fillStyle=colours[z[j]];
	 ctx.beginPath();
	 ctx.arc(x,this.y,outerradius,startangle,endangle);  
	 ctx.closePath();
	 ctx.fill();
	 ctx.beginPath();
	 ctx.fillStyle="black";
     ctx.arc(x,this.y,innerradius,startangle,endangle);
	 ctx.closePath();
	 ctx.fill();
   }
 
 

  	  
}
}
var gamearea={
  updategamearea:function(){
     
     if(myobstacles[0].y==300)
	 {
	  myobstacles.push(new obstacle);
	  myobstacles=myobstacles.slice(1,);
	  myobstacles[myobstacles.length-1].randomcolor();
	  
		 
	   }	 
	 
	
	   
	 for( var i=0;i<myobstacles.length;i++)
	   myobstacles[i].drawobstacle();
	   myobstacles[i].y+=1;
	   myobstacles[i].rotate+=0.0175;
	   
	  raf=requestAnimationFrame(gamearea.updategamearea);  
	  clearRect(0,0,600,600);
	 
	},
	 
	
	   
	   
  
  
    	  stop:function(){
	      
	  
	  }
	  
  }
  
