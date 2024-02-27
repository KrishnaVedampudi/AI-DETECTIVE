status = "";
value = "";
objects = ["null"];

function setup()
{
    canvas = createCanvas(700, 600);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    value = document.getElementById("Name").innerHTML;
}
function modelLoaded()
{
    console.log("Model Loaded!");
    status = "true";
    objectDetector.detect(video, gotResults);
}
function gotResults(error, results)
{   
    if(error)
    {
        console.log(error);
    }
    objects = results;   
    console.log(objects);
}

function draw()
{
    image(video, 0, 0, 700, 600);   
    
    if(status = "true")
    {
    if(objects !="null")
    {
      for(i=0; i <= objects.length; i++)
       {        
        r = random(255);
        g = random(255);
        b = random(255);
        textSize(18);                                 
        fill(r, g, b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y+15);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(value = objects[i].label)
        {
           video.stop();
           objectDetector.detect(gotResults);
           document.getElementById("status").innerHTML = "Object was Found";

           var synth = window.speechSynthesis;
           speak_data = "Object Mentioned was found";
           var utterThis = new SpeechSynthesisUtterance(speak_data);
           synth.speak(utterThis);
        
       }else
       { 
        document.getElementById("status").innerHTML = "Object was not Found";

       }
    }
    }
    } 
}

document.addEventListener('DOMContentLoaded', function() {
    // Check if the browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('getUserMedia is not supported in this environment');
        return;
    }

    // Request access to the camera
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        // User granted access to the camera
        console.log('Camera access granted');
        // You can do further processing here, such as displaying the camera stream
    })
    .catch(function(error) {
        // User denied access to the camera or an error occurred
        console.error('Camera access denied or error:', error);
    });
});

