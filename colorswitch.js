 var myobstacles=[]; //an array to store the obstacles
   var outerradius=60;  //outeradius of all obstacles
   var startangle=0;    //starting angle of arc
   var endangle=0;      //ending angle of arc
   var colours=["blue","green","red","yellow","orange","pink","brown"]; //variable to stor colours
   var audiocount=0;   //variable used to play audio only for first click count      //
   var x=300;          //x position of obstacle
   var rotate=0;       //rotate variable used to spin  the obstacles
   var y=60;           // y position of obstacles
   var running=false;  //variable to check the motion of ball
   var i=0;            //counter variable
   var raf=0;          //request animation frame variable to store a number further used to cancel
   var c=0;            //a flag variable to see collision 
   var o=0;            //position of ball stored on cick
   var score=0;        //score for each obstacle passing
   var totscore=0;     //total score for one gameplay
   var highscore=0;    //high score stored in this variable and also in local storage
   var count=0;        //to make the score sound to play once
   
   var scoresound=document.getElementById("scores"); //getting element scores to play sound on getting points
   
   var sound=document.getElementById("song");   //getting element scores to play bgm song
   var canvas=document.getElementById("canvas");  
   var ctx=canvas.getContext('2d');
  
  
   
   
  function startgame(){   //invoked on loading of page
     
     myobstacles.push(new obstacle);    //new obstacle added
	 myobstacles[0].randomcolor();        //calls random color function
	 gamearea.updategamearea();          //calls update game area()
	
	  
  }
  
  
  
   var ball={           
	  l:300,              //properties of ball        
	  m:590,  
	  vy:-1.5,            //negative value to move up
	  radius:5,
	  color:"blue",   
	  draw:function(){                //function to draw the ball on canvas
	  
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
   
  randomcolor(){                       //stores  two  random colours in z
    
    for ( i=0;i<2;i++) 
	   {
	     
		 if(i>0)
		 {
		 this.z[i]=Math.floor(Math.random()*7);
		
		  while(this.z[i-1]==this.z[i])
		 this. z[i]=Math.floor(Math.random()*7);   // a while loop to avoid same colours selected for the obstacle
		 }
		 else
		  this.z[i]=Math.floor(Math.random()*7);
		  
	}
  }
   drawobstacle(){              //draws   the obstacle on canvas     
                       
   for( var j=0;j<2;j++)           //drawing semicircles
   {
   if(this.rotate > (Math.PI)*2)     //if rotate becomes greater than 360 deg it is resetted to 0
	{
	  this.rotate=0
	}
     
     startangle=((Math.PI)*j)+this.rotate;     //drawing semicircles with help of i variable to set angles
	 endangle=(Math.PI)*(j+1)+this.rotate;      
	 ctx.strokeStyle=colours[this.z[j]];
	 ctx.lineWidth=10;                            //thickness of line
	 ctx.beginPath();
	 ctx.arc(x,this.y,outerradius,startangle,endangle);  
	 ctx.stroke();                                //arc drawn succefully
	 if(this.score==0)
	 {
	 ctx.fillStyle="teal";
	 ctx.beginPath();
	 ctx.arc(x,this.y,10,0,Math.PI*2);     //to draw a ball in center of all obstacles only if score =0 or ellse the ball disappears
	 ctx.closePath();
	 ctx.fill();
	 
	 }
	
	
   }
 
 

  	  
}
}


function updateball()                         //updating positions of ball
{                                            
 canvas.addEventListener('click',function(e)      //event listener to jump the ball
	   { 
	      
	  	  if (!running)
	         {	
			  
			   running=true;       
			   o=ball.m               //if ball is running then change the positions of ball
			   ball.vy=-ball.vy;      //ball movement reversed 
			 }
		  else if( ball.vy>0)         
		    {	  
		       o=ball.m;                //to store the location of ball at time of click
              			 
			}
		  else	if(ball.vy<0)           //check the vy variable and reverse the direction to make the ball move 
		  {           
	           ball.vy=-ball.vy;         
		       o=ball.m
		  }
		 if(audiocount==0)            //audiocount only plays(bgm of game) for the first click by the mouse
		 {
		    audiocount=1;
			sound.play();
		 } 
		  
	       
	   } );  
	  
	  if (running==true)
	   {
          ball.m-=ball.vy;
		  if(ball.m<o-40)      //to make the ball go up by 40 units on click after that it returns to the intial stsrting position
		  {
		   
		   ball.vy=-ball.vy;
          }
          if(ball.m==590)        //590 being the intial position of ball and make ball running as false
		  {
		   running=false;	
		   
		  } 	
	   }
	   if(ball.m+ball.radius==600 || ball.m+ball.radius==0)   
	      ball.draw();                 //if ball goes to ends of canvas the values arent increased just drawn at borders
	 if(myobstacles.length==1)
	   	  ball.color=colours[myobstacles[0].z[1]]; 
	
	
	//if ball colour has the same colour as the next obstacle then let the colour remain same
	  
	if(ball.color==colours[myobstacles[0].z[0]] || ball.color==colours[myobstacles[0].z[1]])
	{
		 
	  if(myobstacles.length>2)   
	      ball.color=colours[myobstacles[myobstacles.length-2].z[1]]  ;   //one of the colour at z[1] is given to ball(out of 7) so that game  can be played 
	  else
	       ball.color=colours[myobstacles[0].z[1]];
	 
	}    
		ball.draw();
}






var gamearea={
  updategamearea:function(){
  
     ctx.clearRect(0,0,600,600)
     if(myobstacles[0].y==525)
	 {                                          //removing the old obstacle at y postion of obstacle at 590
	  myobstacles=myobstacles.slice(1,);
	  
	
      }	
	  if(myobstacles[0].y==340)                //adding the new obstacle at y postion of obstacle at 340
	  {
	     myobstacles.push(new obstacle);   //adding new obstacle to array
		 count=0;
		 myobstacles[myobstacles.length-1].randomcolor(); //random color() is called  for the selecting random colours
		 c=0;
		
	  }
	  
		updateball();
		
		 
		  
	   
         for( var i=0;i<myobstacles.length;i++)
	          {
	               myobstacles[i].drawobstacle();     
				                          
	              
				  /*collision detection of ball with outer obstacle if angle is between 90 to 270 and two cases for 
				  if ball touches the upperpart and if balltouches the lower part and same for the angle between 270-360 and 0-90
				  so that the colour is same as  with the ball collided   */
				  
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
				
				
			// collision detection for center ball to add points for user		
				 if(Math.abs(ball.m-myobstacles[i].y)<=15)
				 {
				    
				     myobstacles[i].score=1;
					 while(count!=1)            //while loop to play the sound  once add total score
					 {
					   scoresound.play();
					   totscore+=myobstacles[i].score;
					   count=1;
					 }
					
				 }	
				 
			
					
                  myobstacles[i].y+=1;                    //updating y position of obstacles and rotate
	              myobstacles[i].rotate+=0.0175*3;	          
			  
			  }
			  
			    
			   
			  
			  gamearea.displayscore();    //displaying score()
			  
	 
	     raf=requestAnimationFrame(gamearea.updategamearea);   //raf is invoked
		 
		 if(c==1)
		 {                                    //cancel animaton frame is invoked if c value is 1
		   cancelAnimationFrame(raf);
		   sound.pause();
		   gamearea.storage();
		   setTimeout(function(){       //to alert the user with game over meassage and displaying the high score after one second delay
		     
			      
			  alert("gameover"+"\nhighscore:"+highscore);
	       },1000);
         }	 
	
	},
	 displayscore:function(){                   //displaying the score
	 ctx.font="30px arial";
	 ctx.fillStyle="blue";
	 ctx.fillText("score:"+totscore,8,20);
	 
	 
	 },
	 storage:function(){       //if there is any value in local storage compare it with current score and display the highest
	
	   if(localStorage.getItem("highscore")!=null)
	   {
	     console.log(JSON.parse(localStorage.getItem("highscore")));
	     highscore=JSON.parse(localStorage.getItem("highscore"));
	   }
	   else
	     highscore=0;
	   if(highscore<totscore)
	     highscore=totscore;
	  
	   localStorage.setItem("highscore",JSON.stringify(highscore));
	 
	 
	 }
	 
}
  
