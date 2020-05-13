  var myobstacles=[];
   var outerradius=60;
   var innerradius=45;
   var startangle=0;
   var endangle=0;
   var colours=["blue","green","red","yellow","pink","orange"]
   var n=colours.length;
   var z=[];
   var x=300;
  
   var i=0;
   var raf;
  
   var canvas=document.getElementById("canvas");
   var ctx=canvas.getContext('2d');
   var myobstacles=[];
  
   
   
  function startgame(){

     myobstacles[0]= new obstacle;
	 myobstacles[0].randomcolor();
	 myobstacles[0].drawobstacle();
	  
	  
  }
  
 
  class obstacle{
  constructor()
  {
  this.y=60;
  this.rotate=0;
  }
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
    
   
   ctx.clearRect(0,0,600,600);
   
   for(i=0;i<2;i++)
   {
   if(this.rotate<Math.PI*2)
	{
	 console.log(this.rotate);
     startangle=(Math.PI)*i+this.rotate;
	 endangle=(Math.PI)*(i+1)+this.rotate;
	 ctx.fillStyle=colours[z[i]];
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
	else
	{
	 this.rotate=0;
	 this.drawobstacle(); 
	}
  }
  gamearea.updategamearea();
  
  requestAnimationFrame(this.drawobstacle);	  
}

}


var gamearea={
  updategamearea:function(){
    
	
	 
      for (i=0;i<myobstacles.length;i++)
	  {
	     if(myobstacles[i].rotate==Math.PI)
	          myobstacles.push(new obstacle());
	     myobstacles[i].y+=1;
		 myobstacles[i].rotate+=0.0175; 
	  } 
	   
  },
  
    	  stop:function(){
	      
	  
	  }
	  
  }
  
