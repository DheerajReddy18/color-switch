 var myobstacles=[];
   var outerradius=60;
   var innerradius=45;
   var startangle=0;
   var endangle=0;
   var colours=["blue","green","red","yellow","orange","pink","brown"]
   var n=colours.length;
   
   var b=[];
   var x=300;
   var rotate=0;
   var y=60;
   var running=false;
   var i=0;
   var raf=0;
   var c=0;
   var o=0;
   var score=0;
   var totscore=0;
   var count=0;
   

  
  
   var canvas=document.getElementById("canvas");
   var ctx=canvas.getContext('2d');
   var myobstacles=[];
  
   
   
  function startgame(){

     myobstacles.push(new obstacle);
	 myobstacles[0].randomcolor();
	 gamearea.updategamearea();
	
	  
  }
  
  
  
   var ball={
	  l:300,
	  m:590,
	  vy:-1.5,
	  radius:5,
	  color:"blue",
	  draw:function(){
	      ctx.beginPath();
		  ctx.arc(300,this.m,this.radius,0,Math.PI*2,true);
		  ctx.closePath();
		  ctx.fillStyle=this.color;
		  ctx.fill();
		  
		  
	  }
	 } 	  
		  
  
 		
  
 
  class obstacle{
  constructor(){
  this.x=300;
  this.y=60;
  this.z=[];
  this.score=0;
  this.rotate=0;
  }
   
  randomcolor(){
    
    for ( i=0;i<2;i++) 
	   {
	     
		 if(i>0)
		 {
		 this.z[i]=Math.floor(Math.random()*7);
		
		  while(this.z[i-1]==this.z[i])
		 this. z[i]=Math.floor(Math.random()*7);
		 }
		 else
		  this.z[i]=Math.floor(Math.random()*7);
		  
	}
  }
   drawobstacle(){
  
   for( var j=0;j<2;j++)
   {
   if(this.rotate > (Math.PI)*2)
	{
	  this.rotate=0
	}
     
     startangle=((Math.PI)*j)+this.rotate;
	 endangle=(Math.PI)*(j+1)+this.rotate;
	 ctx.strokeStyle=colours[this.z[j]];
	 ctx.lineWidth=10;
	 ctx.beginPath();
	 ctx.arc(x,this.y,outerradius,startangle,endangle);  
	 ctx.stroke();
	 if(this.score==0)
	 {
	 ctx.fillStyle="teal";
	 ctx.beginPath();
	 ctx.arc(x,this.y,10,0,Math.PI*2);
	 ctx.closePath();
	 ctx.fill();
	 
	 }
	
	
   }
 
 

  	  
}
}


function updateball()
{
 canvas.addEventListener('click',function(e)
	   { 
	  	  if (!running)
	         {	 
			   running=true;
			   o=ball.m
			   ball.vy=-ball.vy;
			 }
		  else if( ball.vy>0)
		    {	  
		       o=ball.m;
              			 
			}
		  else	if(ball.vy<0)
		  {
	           ball.vy=-ball.vy;  
		       o=ball.m
		  }
	       
	   } );  
	  
	  if (running==true)
	   {
          ball.m-=ball.vy;
		  if(ball.m<o-40)
		  {
		   
		   ball.vy=-ball.vy;
          }
          if(ball.m==590)
		  {
		   running=false;	
		   
		  } 	
	   }
	   if(ball.m+ball.radius==600 || ball.m+ball.radius==0)
	      ball.draw();
	  if(myobstacles.length>2)   
	      ball.color=colours[myobstacles[myobstacles.length-2].z[1]]
	  else
	       ball.color=colours[myobstacles[0].z[1]]
		ball.draw();
}






var gamearea={
  updategamearea:function(){
  
     ctx.clearRect(0,0,600,600)
     if(myobstacles[0].y==600)
	 {
	  myobstacles=myobstacles.slice(1,);
	  
	
      }	
	  if(myobstacles[0].y==350) 
	  {
	     myobstacles.push(new obstacle); 
		 count=0;
		 myobstacles[myobstacles.length-1].randomcolor(); 
		 c=0;
		  for( var i=0;i<myobstacles.length;i++)
			           totscore+=myobstacles[i].score;
	  }
	  
		updateball();
		
		 
		  
	   
         for( var i=0;i<myobstacles.length;i++)
	          {
	               myobstacles[i].drawobstacle();
				   
	              
				  
				   if(Math.abs(ball.m-myobstacles[i].y)<70   &&  Math.abs(ball.m-myobstacles[i].y)>55)
				   {    
				     if(myobstacles[i].rotate<=Math.PI*1.5 && myobstacles[i].rotate>Math.PI*0.5  )
					  {
						if(ball.m>myobstacles[i].y)
						 {
						  if(ball.color==colours[myobstacles[i].z[1]])
						   c=0;
					 	  else
						   c=1;
						 }
						else
						 {
						   if(ball.color==colours[myobstacles[i].z[0]])
						   c=0;
					 	  else
						   c=1;
						
						 } 
						 
						 
					   }
					if(myobstacles[i].rotate>=Math.PI*1.5 || myobstacles[i].rotate<Math.PI*0.5  )
					{
					 if(ball.m>myobstacles[i].y)
					 {	
						 if( ball.color==colours[myobstacles[i].z[0]])
						   c=0;
					 	 else
						   c=1;
						
					   }
					  else
					  {
					      if( ball.color==colours[myobstacles[i].z[1]])
						   c=0;
					 	 else
						   c=1;
					  } 
					
						
        		    }	
				}	
					
				 if(Math.abs(ball.m-myobstacles[i].y)<=15)
				 {
				    
				     myobstacles[i].score=1;
					 while(count!=1)
					 {
					   totscore+=myobstacles[i].score;
					   count=1;
					 }
					
				 }	
					
                  myobstacles[i].y+=1;  
	              myobstacles[i].rotate+=0.0175*3;	          
			  
			  }
			  
			    
			   
			  
			  gamearea.displayscore();
			  
	 
	     raf=requestAnimationFrame(gamearea.updategamearea);  
		 
		 if(c==1)
		 {
		   cancelAnimationFrame(raf);
	  
         }	 
	
	},
	 displayscore:function(){
	 ctx.font="30px arial";
	 ctx.fillStyle="blue";
	 ctx.fillText("score:"+totscore,8,20);
	 
	 
	 }
}
  
  
  
