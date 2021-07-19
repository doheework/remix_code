var video;
let sliderR;
let sliderG;
let sliderB;
let mic, recorder, soundFile;
let input;
var vid;
var fft;
var w;

var volhistory = [];

let state = 0;


function preload() {
  songS2 = loadSound("2_intro.mp3", loaded);
  img3 = loadImage('3_button.png', loaded);
  songS3 = loadSound("3_button.mp3", loaded);
  songS4 = loadSound("4_snap.mp3", loaded);
  img4 = loadImage("4_snap.png", loaded);
  img5 = loadImage("5_slidebar.png", loaded);
  songS5 = loadSound("5_slider.mp3", loaded);
  img6 = loadImage("6_record.png", loaded);
  songS6 = loadSound("6_record.mp3", loaded);
  img7 = loadImage("7_input.png", loaded);
  songS7 = loadSound("7_input.mp3", loaded);
  song1 = loadSound("sample1.m4a", loaded);
  song2 = loadSound("sample2.m4a", loaded);
  song3 = loadSound("sample3.m4a", loaded);
  song4 = loadSound("sample4.m4a", loaded);
  songS8 = loadSound("8_outro.mp3", loaded);

}

function loaded() {
  console.log("loaded");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noStroke();

  //volume
  song1.setVolume(0.6);
   song2.setVolume(0.6);
   song3.setVolume(0.6);
   song4.setVolume(0.6);
  
  //text
  textSize(240);
  textFont("Permanent Marker");
  text("Make",10,340);
  textSize(300);
  text("your",50,640);
  textSize(400);
  text("MIX",900,600);
  textSize(380);
  text("tape",900,900);
  
  //sound group
  fft = new p5.FFT(0.9, 64);
  w = width / 128;

  //colour slide
  sliderR = createSlider(0, 255, 0);
  sliderG = createSlider(0, 255, 0);
  sliderB = createSlider(0, 255, 0);
  sliderR.position(1380, 520);
  sliderG.position(1380, 560);
  sliderB.position(1380, 600);
  sliderR.hide();
  sliderG.hide();
  sliderB.hide();

  //standard
  colorX = map(mouseX, windowWidth, 600, 0, 255);
  colorY = map(mouseY, windowHeight, 600, 0, 255);

  //video setup
  video = createCapture(VIDEO);
  video.size(400, 400);
  video.hide();

  //audio in
  mic = new p5.AudioIn();
  mic.start();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();

  //1 Title page
  button1 = createButton("START");
  button1.mousePressed(togglePlaying1);
  button1.position(594, 650);
  button1.size(500, 100);
  button1.style('font-size', '40px');

  //1 title video
  vid = createVideo("tittlevideo.mp4");
  vid.size(402, 402);
  vid.loop();
  vid.position(642, 150);

}

//2 Intro
function togglePlaying1() {
  button1.hide();
  vid.hide();

  //2 intro_ layout
  fill(0);
  rect(0, 0, 500, windowHeight);
  fill(40);
  rect(windowWidth - 500, 0, 500, windowHeight);

  //2 Intro_ agree button
  button2 = createButton("Agree");
  button2.mousePressed(togglePlaying2);
  button2.position(1410, 600);
  button2.size(80, 30);

  //2 sound
  songS2.play();

  //2 intro_instruction
  textAlign(CENTER);
  textSize(50);
  fill(255);
  textFont("courier");
  text("BEFORE", 1450, 120);
  text("START", 1450, 160);

  textSize(15);
  text("This Program saves your data automatically. The data would be used to archive for this project.  If you are okay, Press the “Agree” button.", 1310, 300, 300);
  text("ENJOY!", 1450, 500);

}

//3 snap
function togglePlaying2() {
  button2.hide();

  //3_snap first thanks
  songS3.play();

  //3_snap first coding
  image(img3, 0, 0, 500, 930);

  //3_snap layout
  fill(40);
  rect(windowWidth - 500, 0, 500, windowHeight);
  fill(40);
  rect(593, 100, 500, 500);

  //coding


  //snap 
  buttonSnap = createButton('SNAP');
  buttonSnap.mousePressed(takesnap);
  buttonSnap.position(1385, 500);
  buttonSnap.size(120, 60);

  //next
  button3 = createButton('NEXT');
  button3.mousePressed(togglePlaying3);
  button3.position(1410, 700);
  button3.size(80, 30);

  //insturction
  fill(255);
  textAlign(RIGHT);
  textSize(50);
  text("DESIGN", windowWidth - 40, 100);
  text("the cover", windowWidth - 40, 140);
  textSize(25);
  text("Shoot the jacket", windowWidth - 40, 220);

  textAlign(LEFT);
  textSize(20);
  text("Pose in front of the camera", 1250, 320);
  text("If you ready, press 'SNAP' button", 1250, 360);
  text("Snap the pic until you want", 1250, 400);

}


function takesnap() {
  image(video, 643, 150, 400, 400);
  songS4.play();
  image(img4, 0, 0, 500, 930);
}

function togglePlaying3() {
  buttonSnap.hide();
  button3.hide();

  //button coding
  image(img3, 0, 0, 500, 930);
  songS3.play();

  //layout
  fill(40);
  rect(windowWidth - 500, 0, 500, windowHeight);

  //instruction
  fill(255);
  textAlign(RIGHT);
  textSize(50);
  text("DESIGN", windowWidth - 40, 100);
  text("the cover", windowWidth - 40, 140);
  textSize(25);
  text("Colour", windowWidth - 40, 220);

  textAlign(LEFT);
  textSize(20);
  text("Choose the background colour", 1250, 320);
  text("Press the 'START' button", 1250, 360);
  text("And draw the slide bar below", 1250, 400);

  //background colour 
  sliderR.show();
  sliderG.show();
  sliderB.show();

  //start button
  buttonStart = createButton('START');
  buttonStart.mousePressed(togglePlayingStart);
  buttonStart.position(1410, 440);
  buttonStart.size(80, 30);

  //next button
  button4 = createButton('NEXT');
  button4.mousePressed(togglePlaying4);
  button4.position(1410, 700);
  button4.size(80, 30);
}

function togglePlayingStart() {
  image(img5, 0, 0, 500, 930);
  songS5.play();

}

function togglePlaying4() {
  button4.hide();
  buttonStart.hide();
  sliderR.hide();
  sliderG.hide();
  sliderB.hide();

  //button coding
  image(img3, 0, 0, 500, 930);
  songS3.play();

  //layout
  fill(40);
  rect(windowWidth - 500, 0, 500, windowHeight);

  //instruction
  fill(255);
  textAlign(RIGHT);
  textSize(50);
  text("DESIGN", windowWidth - 40, 60);
  text("the music", windowWidth - 40, 100);
  textSize(25);
  text("Record the hook", windowWidth - 40, 180);

  textAlign(LEFT);
  textSize(20);
  text("Press ‘RECORD’ button to start", 1250, 280);
  text("Say anything you want on the mic", 1250, 320);
  text("It could be a short beat ", 1250, 360);
  text("Or conversation", 1250, 400);
  text("Then, press ’STOP’ to finish", 1250, 470);
  text("If the button changes to ‘SAVED’, ", 1250, 540);
  text("it is successes", 1250, 580);

  //record button
  buttonR = createButton('RECORD');
  buttonR.mousePressed(togglePlayingR);
  buttonR.position(1410, 630);
  buttonR.size(80, 80);

  //next button
  button5 = createButton('NEXT');
  button5.mousePressed(togglePlaying5);
  button5.position(1410, 750);
  button5.size(80, 30);

  //mic circle

}

function togglePlayingR() {
  if (state === 0 && mic.enabled) {
    // Tell recorder to record to a p5.SoundFile which we will use for playback
    recorder.record(soundFile);
    buttonR.html("STOP");
    state++;
  } else if (state === 1) {
    recorder.stop(); // stop recorder, and send the result to soundFile
    buttonR.html("SAVED");
    state++;
    saveSound(soundFile, 'mySound.wav');
    image(img6, 0, 0, 500, 930);
    songS6.play();
  }
}

function togglePlaying5() {
  buttonR.hide();
  button5.hide();

  //button coding
  image(img3, 0, 0, 500, 930);
  songS3.play();

  //layout
  fill(40);
  rect(windowWidth - 500, 0, 500, windowHeight);

  //instruction
  fill(255);
  textAlign(RIGHT);
  textSize(50);
  text("DESIGN", windowWidth - 40, 60);
  text("the name", windowWidth - 40, 100);
  textSize(25);
  text("Give a name", windowWidth - 40, 180);

  textAlign(LEFT);
  textSize(20);
  text("Insert the name in the box", 1250, 280);
  text("Click each 'SUBMIT' button", 1250, 320);


  //input album name
  text("Album", 1400, 380);
  inputAlbum = createInput();
  inputAlbum.position(1345, 400);
  buttonAlbum = createButton('SUBMIT');
  buttonAlbum.position(1485, 400);
  buttonAlbum.mousePressed(Album);


  //insturction
  textAlign(LEFT);
  textSize(20);
  text("Select the style", 1250, 500);

  //style button
  buttonStyle1 = createButton('1');
  buttonStyle1.position(1250, 530);
  buttonStyle1.mousePressed(Style1);
  buttonStyle1.size(30, 30);

  buttonStyle2 = createButton('2');
  buttonStyle2.position(1350, 530);
  buttonStyle2.mousePressed(Style2);
  buttonStyle2.size(30, 30);

  buttonStyle3 = createButton('3');
  buttonStyle3.position(1450, 530);
  buttonStyle3.mousePressed(Style3);
  buttonStyle3.size(30, 30);

  //next button
  button6 = createButton('NEXT');
  button6.mousePressed(togglePlaying6);
  button6.position(1410, 750);
  button6.size(80, 30);
}


function Album() {
  const album = inputAlbum.value();
  image(img7, 0, 0, 500, 930);
  songS7.play();

}

function Style1() {
  const album = inputAlbum.value();
  textSize(120);
  textFont("Nova Square");
  textAlign(LEFT);
  text(album, 643, 150,370,370);
  Style2.hide();
}

function Style2() {
  textAlign(CENTER);
  const album = inputAlbum.value();
  textSize(80);
  textFont("Zen Dots");
  text(album, 660,300,402,150);
}

function Style3() {
  textAlign(LEFT);
  const album = inputAlbum.value();
  textSize(60);
  textFont("Oi");
  text(album,635,150, 402,402);
  text(album,635,320, 402,402);


}

function togglePlaying6() {
  buttonStyle1.hide();
  buttonStyle2.hide();
  buttonStyle3.hide();
  buttonAlbum.hide();
  inputAlbum.hide();
  button6.hide();

  
  //outro
  songS8.play();
  
  
  //layout
  fill(255);
  rect(0, 0, 500, windowHeight);
  rect(windowWidth - 500, 0, 500, windowHeight);

  //layout
  textFont("courier");
  fill(0);
  textSize(30);
  text("List", 1210, 160);
  strokeWeight(2);
  stroke(0);
  line(1200, 170, windowWidth - 100, 170);
  
  //text
   textSize(18);
  text("If you want to get your album, plese follow the instruction below" , 100, 100,300);
  text("1. Screenshot(command⌘ + shift ⇧ + 3) this page",100 , 200, 300); 
  text("2. Write down your email, a name of soundfile and time on the sheet",100 , 270,300); 
  textSize(22);
  fill(255,0,0);
  text("For the next player, please refresh the website." , 1210,630,400);
  text("If you are the new and see this sentence, refresh the site" , 1210,700,400);
  
  //smaple 1
  fill(0);
  buttonS1 = createButton("▶");
  buttonS1.mousePressed(togglePlayingS1);
  buttonS1.position(1520, 210)
  buttonS1.size(50, 30);
  textSize(30);
  text("City Pop", 1210, 220);
  textSize(15);
  text("Prod. by ogjjang", 1220, 250);

  //sample2
  buttonS2 = createButton("▶");
  buttonS2.mousePressed(togglePlayingS2);
  buttonS2.position(1520, 310)
  buttonS2.size(50, 30);
  textSize(30);
  text("Snitch", 1210, 320);
  textSize(15);
  text("Prod. by Pr!d3", 1220, 350);

  //sample3
  buttonS3 = createButton("▶");
  buttonS3.mousePressed(togglePlayingS3);
  buttonS3.position(1520, 410)
  buttonS3.size(50, 30);
  textSize(30);
  text("Trip", 1210, 420);
  textSize(15);
  text("Prod. by TYRAN Beats.", 1220, 450);


  //sample4
  buttonS4 = createButton("▶");
  buttonS4.mousePressed(togglePlayingS4);
  buttonS4.position(1520, 510)
  buttonS4.size(50, 30);
  textSize(30);
  text("Amusement", 1210, 520);
  textSize(15);
  text("Prod. by plantplantworld", 1220, 550);
}

function togglePlayingS1() {
  if (!song1.isPlaying()) {
    song1.play();
    buttonS1.html("■");
    soundFile.loop();
  } else {
    song1.stop();
    buttonS1.html("▶");
    soundFile.stop();
  }
}

function togglePlayingS2() {
  if (!song2.isPlaying()) {
    song2.play();
    buttonS2.html("■");
    soundFile.loop();
  } else {
    song2.stop();
    buttonS2.html("▶");
    soundFile.stop();
  }
}

function togglePlayingS3() {
  if (!song3.isPlaying()) {
    song3.play();
    buttonS3.html("■");
    soundFile.loop();
  } else {
    song3.stop();
    buttonS3.html("▶");
    soundFile.stop();
  }
}

function togglePlayingS4() {
  if (!song4.isPlaying()) {
    song4.play();
    buttonS4.html("■");
    soundFile.loop();
  } else {
    song4.stop();
    buttonS4.html("▶");
    soundFile.stop();
  }
}

function draw() {
  //background colour album
  noStroke();
  fill(sliderR.value(), sliderG.value(), sliderB.value());
  rect(593, 100, 500, 50);
  rect(593, 100, 50, 500);
  rect(593, 550, 500, 50);
  rect(1043, 100, 50, 500);

  if (song1.isPlaying()) {
    var spectrum = fft.analyze();
    stroke(255);
    for (var i = 0; i < spectrum.length; i++) {
      var amp = spectrum[i];
      var y = map(amp, 0, 256, height, 0);
      fill(242, 135, 73);
      rect((i * w) - 100, y, w - 2, height - y);
    }
  } else {}

  if (song2.isPlaying()) {
    var spectrum = fft.analyze();
    stroke(255);
    for (var i = 0; i < spectrum.length; i++) {
      var amp = spectrum[i];
      var y = map(amp, 0, 256, height, 0);
      fill(140, 58, 103);
      rect((i * w) - 100, y, w - 2, height - y);
    }
  } else {}

  if (song3.isPlaying()) {
    var spectrum = fft.analyze();
    stroke(255);
    for (var i = 0; i < spectrum.length; i++) {
      var amp = spectrum[i];
      var y = map(amp, 0, 256, height, 0);
      fill(63, 147, 166);
      rect((i * w) - 100, y, w - 2, height - y);
    }
  } else {}

  if (song4.isPlaying()) {
    var spectrum = fft.analyze();
    stroke(255);
    for (var i = 0; i < spectrum.length; i++) {
      var amp = spectrum[i];
      var y = map(amp, 0, 256, height, 0);
      fill(191, 242, 5);
      rect((i * w) - 100, y, w - 2, height - y);
    }
  } else {}

}