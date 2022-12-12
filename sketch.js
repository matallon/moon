/* ~~~NOISE SKETCH~~~
My sketch is using noise to change the x and y positions of points making up a circle to make it move. The main circle
itself is made up of 30 versions of the same circle. I think the addition of the alpha value in the background is very
effective as  it creates the haze behind the circles. I also added noise mountains and stars to the canvas to create a 
shot of the horizon, with the circles being a kind of sci-fi sun, moon or random thing within space. 
Overall, I think this is my most visually appealing piece of generative art within this second portfolio, but its also
probably the least complex as it is a very simple effect. Either way, I'm very happy with the outcome ! 
*/

var input;

function setup()
{
    createCanvas(1000,1000);
    input = 0;
}

function draw() 
{
    //the alpha value in the background is providing a large amount of the final effect
    background(0,5);
    strokeWeight(1.5);
    stroke(255);

    for(var i = 0; i < 30; i  ++){
        //draw the stars in the background ! 
        point(random(0,width),random(0,height-100));
        push();
        //draw all the circles using the function. Drawing 30 instead of just one makes it more visually appealing
        noisyCircle(450 +(10 * (i *0.2)), 400 + map(noise(i),0,1,0,20),8,0.45,2,input*1.2,100,350)
        pop(); 
    }
    input +=0.005;
    
    //draw the mountains in the foreground to create the landscape 
    mountain(-50,320,40,0.01);
    mountain(0,350,50,0.009);
    mountain(0,420,75,0.007);
    mountain(0,450,100,0.005);
}

function noisyCircle(x,y,octaves,falloff,noiseRadius,increaser,radius1,radius2){
    
    noiseDetail(octaves, falloff);
    translate(x,y);
    noFill();
    beginShape();
    for (var theta=0; theta < 360; theta++) 
    {
        //this moves through the 2D noise plane in a circular motion it means that the first and last positions of noise in the circle will be next to each other - very useful for tiling or looping backgrounds
        //draw a circle using sin and cos  & add noise to these values 
        let i_x = sin(radians(theta));
        let i_y = cos(radians(theta));

        let noiseX = map(i_x, -1,1,0,noiseRadius);
        let noiseY = map(i_y, -1,1,0,noiseRadius);

        let noiseVal = noise(noiseX + increaser, noiseY-input);
        let r = map(noiseVal, 0,1,radius1,radius2);

        let x = sin(radians(theta)) * r;
        let y = cos(radians(theta)) * r;

        vertex(x,y);
    }
    endShape(CLOSE);
}

//mountain creating function ! 
function mountain (x,y,color,noiseValue){
    fill(color);
    noStroke();
    push();
    //plot all the points of the mountains
    beginShape();
    translate(x,y); 
    vertex(0,y + 150);
    for(var i = 0; i < width + 55; i++){
        let noiseVal = noise(noiseValue * i);
        let yVal = map(noiseVal,0,1,-10,250);
        vertex(i,yVal);
    }
    vertex(width,y + 150);
    endShape();
    pop();
}
