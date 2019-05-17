var GROUND_Y = 420;
var nkechi, nkechiImg, nkechiJmp, nkechiPassport, nkechiBG, nkechiPort, ground;
var cutsceneland, cutscenefail, cutsceneend, cutsceneleave;
var papers, clouds, coins, queues, pillars;
var gameOver;
var groundImg, bgImg, gridMov, overlayImg;
var soundtrack, soundtrack2, soundtrack3,soundtrack4;
var player_lives = 3;
var player_points = 1;
var myFont;
var playScreen = 3;
var intro, airplane, credits;
var IntroText = "Your ErrantBox passport\nsays you're Nkechi Eze,\n a Nigerian citizen\nwith freedom of movement.";
var Title = "Game Designer\nIrene Tokini Fubara\n\nSounds\n Weary by Solange\n\nVoice Acting by Helen Dixon\n\nMario Coin Sound by Alexander\nAvailable on Orange Free Sounds\n\nVideo Game Death/Lose Life Sound Effect\nby Sound Effects Factory\n\nThanks to Nonto, Tara, Charlie,\nSaskia and Phoenix from Code Liberation";


function preload(){

soundtrack = loadSound('assets/Sprites/Misc/Mario-coin-sound_01.mp3');
soundtrack2 = loadSound('assets/Sprites/Misc/Video Game Death - Lose Life Sound Effect.mp3');
soundtrack3 = loadSound('assets/Sprites/Misc/rthumbprint.mp3');
soundtrack4 = loadSound('assets/Sprites/Misc/Weary_ScrewednChopped.mp3')
myFont = loadFont('assets/Sprites/neural.ttf');


}

function setup() {
  noCursor();
  createCanvas(1080, 608);
  frameRate(60);
  soundtrack.setVolume(0.3);
  soundtrack2.setVolume(0.3);
  soundtrack3.setVolume(0.3);
  soundtrack4.setVolume(0.3);
  soundtrack4.loop();


  textFont(myFont);

  intro = createVideo('assets/Sprites/Nkechi.mp4');
  intro.hide();
  intro.stop();

  airplane = loadAnimation("assets/Sprites/Airplane010.png", "assets/Sprites/Airplane106.png");
  cutsceneland = loadAnimation("assets/Sprites/CutScene/cutscene30.png", "assets/Sprites/CutScene/cutscene60.png");
  cutscenefail = loadAnimation("assets/Sprites/CutScene/cutscene61.png", "assets/Sprites/CutScene/cutscene99.png");
  cutsceneend = loadAnimation("assets/Sprites/CutScene/cutscene100.png", "assets/Sprites/CutScene/cutscene129.png");
  cutsceneleave = loadAnimation("assets/Sprites/CutScene/cutscene130.png", "assets/Sprites/CutScene/cutscene162.png");

  gridMov = loadAnimation("assets/Sprites/ScreenSaver/screensaver000.png", "assets/Sprites/ScreenSaver/screensaver300.png");
  overlayImg = loadAnimation("assets/Sprites/Overlay/Overlay0000.png", "assets/Sprites/Overlay/Overlay0124.png");

  queueImg = loadImage('assets/Sprites/queue1.png');
  pillarImg = loadImage('assets/Sprites/pillar1.png');
  cloudImg = loadImage ('assets/Sprites/Misc/clouds1.png');
  groundImg = loadImage('assets/Sprites/Misc/BG_Ground1.png');

  nkechiImg = loadImage('assets/Sprites/nkechi4.png');
  nkechiJmp = loadImage('assets/Sprites/nkechi5.png');
  nkechiPassport = loadImage('assets/Sprites/Nkechi_passport.png');


  nkechi = createSprite(width/2, height/2+50, 40, 40);
  nkechi.velocity.y = 0;
  nkechi.setCollider('circle', 0, 0, 0.1);
  nkechi.addImage("stand", nkechiImg);
  nkechi.addAnimation("walking", "assets/Sprites/nkechi1.png", "assets/Sprites/nkechi4.png");
  nkechi.addImage("jump", nkechiJmp);


  ground = createSprite(0, GROUND_Y+100); //image 800x200
  ground.addImage(groundImg);


  pillars = new Group();
  queues = new Group();
  papers = new Group();
  clouds= new Group();
  coins= new Group();
  gameOver = true;
  updateSprites(true);

  camera.position.y = height/2;

}




function draw() {



  //print(nkechi.position.x);
  //print(frameCount);

   if (playScreen === 0) {
    startScreen();
    } else if (playScreen === 1){

                      if(!gameOver){
                        nkechi.addSpeed(0.25,90);


                        if (nkechi.position.y > 400){
                          nkechi.changeAnimation("walking");
                          nkechi.velocity.y = -0.3;
                          nkechi.position.y = 400;

                          }
                       if (keyWentDown(UP_ARROW) ){
                         nkechi.velocity.y = -12;
                         nkechi.changeAnimation("jump");

                       }


                        if(nkechi.overlap(papers)){
                          deathstate ();
                          die ();


                        }


                      //spawn papers
                      if(random() < (1/190)) {

                        var paperH = random(200, 250);
                        var paper = createSprite(nkechi.position.x + width, GROUND_Y-200/2+70, 0, paperH);
                        paper.addAnimation("scan", "assets/Sprites/Misc/Paper1.png", "assets/Sprites/Misc/Paper18.png");
                        papers.add(paper);

                      }

                      //get rid of passed papers
                      for(var i = 0; i<papers.length; i++)


                        if(papers[i].position.x < nkechi.position.x-width/2)
                          papers[i].remove();

                          if(frameCount%150 === 0) {
                            var pillarH = random(0, 50);
                            var pillar = createSprite(nkechi.position.x + width, 200, pillarH, pillarH);
                            pillar.addImage(pillarImg);
                            pillars.add(pillar);


                          }

                          for(var m = 0; m<pillars.length; m++)
                          if(pillars[m].position.x < nkechi.position.x-width/2)
                            pillars[m].remove();


                          if(frameCount%60 === 0) {
                              var queue = createSprite(nkechi.position.x + 1500, 410, 0, 0);
                              queue.addImage(queueImg);
                              queues.add(queue);


                            }

                            for(var n = 0; n<queues.length; n++)
                            if(queues[n].position.x < nkechi.position.x-1500)
                              queues[n].remove();



                      if(frameCount%90 === 0) {
                        var cloudH = random(0, 50);
                        var cloud = createSprite(nkechi.position.x + width,cloudH, cloudH, cloudH);
                        cloud.addImage(cloudImg);
                        clouds.add(cloud);


                      }

                      for(var j = 0; j<clouds.length; j++)
                      if(clouds[j].position.x < nkechi.position.x-width/2)
                        clouds[j].remove();


                      if (random() < (1/300))  {
                          var coinH = random(90, 400);
                          var coin = createSprite(nkechi.position.x+width,coinH, 1, 1);
                          coin.addAnimation("pic", "assets/Sprites/Misc/coin/coin1.png", "assets/Sprites/Misc/coin/coin19.png" );
                          coins.add(coin);


                        }

                        for(var k = 0; k<coins.length; k++)
                        if(nkechi.overlapPixel(coins[k].position.x, coins[k].position.y)){
                          soundtrack.play(true);
                          coins[k].remove();
                          player_points +=1 ;}


                  }


                    camera.position.x = nkechi.position.x + width/4;


                    //wrap ground
                    if(camera.position.x > ground.position.x)
                      ground.position.x+=ground.width+100;




                    background(206, 217, 227);
                    camera.off();

                    camera.on();
                    drawSprites(queues);
                    drawSprites(pillars);
                    drawSprite(ground);
                    drawSprites(papers);
                    drawSprites(clouds);
                    drawSprite(nkechi);
                    drawSprites(coins);


                    camera.off();
                    draw_Score();
                    draw_Hint();
                    animation(overlayImg, width/2, height/2);



        }   else if (playScreen === 2) {
            setTimeout (endScreen, 3000);
          }

          if (playScreen === 3) {
            PreScreen();
          }
          if (playScreen === 5) {
            PreScreen2();
          }
          if (playScreen === 6) {
            PreScreen3();
          }
          if (playScreen === 7) {
            PreScreen4();
          }
          if (playScreen === 9) {
            PreScreenFourB();
          }
          if (playScreen === 4) {
            setTimeout (PostScreen, 3000);
          }
          if (playScreen === 10) {
            PostScreen2();
          }
          if (playScreen === 8) {
            CreditScreen();
          }



}




function die() {
  updateSprites(false);
  //soundtrack.pause(true);
  player_lives -= 1;
  soundtrack2.play(true);
  gameOver = true;

}

function deathstate () {
  nkechi.rotation = -90;
  nkechi.position.y =500;

}

function newGame() {
  papers.removeSprites();
  clouds.removeSprites();
  coins.removeSprites();
  queues.removeSprites();
  pillars.removeSprites();
  nkechi.rotation = 0;
  nkechi.position.y = 400;
  //soundtrack.stop(true);


  gameOver = false;
  updateSprites(true);
  nkechi.position.x = width/2;
  nkechi.position.y = height/2;
  nkechi.velocity.y = 0;
  ground.position.x = 800/2;
  ground.position.y = GROUND_Y+100;


}

function startScreen() {
  intro.play();
  camera.off();
  image(intro,0,0);
  textSize(40);
  player_lives = 3;
  player_points = 1;
  textSize(30);
  fill(62,112,155);
  text("Click to continue", width/2,height/2+280);
  fill(255,201,23);
  text("Click to continue", width/2+2,height/2+280);
  animation(overlayImg, width/2, height/2);


}

function endScreen() {
  camera.off();
  animation(cutscenefail, width/2, height/2);
  fill("black");
  textSize(60);
  text("ENTRANCE DENIED", width/2+1,height/2+1);
  textSize(50);
  text("CLICK TO RESTART PROCESS", width/2+1, height/2+50+1);
  fill(255,201,23);
  textSize(60);
  text("ENTRANCE DENIED", width/2,height/2);
  textSize(50);
  text("CLICK TO RESTART PROCESS", width/2, height/2+50);
  animation(overlayImg, width/2, height/2);

}

function CreditScreen() {
  camera.off();
  fill("black");
  rect(0, 0, 1080, 608);
  fill(255,201,23);
  textAlign(CENTER);
  textSize(30);
  textLeading(24);
  text(Title, width/2+1,height/2-190);
  fill(255,201,23);
  text("Click to restart", width/2+2,height/2+280);
  animation(overlayImg, width/2, height/2);


}

function PostScreen() {

  updateSprites(false);

  camera.off();
  animation(cutsceneend, width/2, height/2);

  fill(62,112,155);
  text("Click to continue", width/2,height/2+280);
  fill(255,201,23);
  text("Click to continue", width/2+2,height/2+280);

  animation(overlayImg, width/2, height/2);

}

function PostScreen2() {
  camera.off();
  animation(cutsceneleave, width/2, height/2);
  textSize(40);
  fill(62,112,155);
  text("Click to restart", width/2,height/2+280);
  fill(255,201,23);
  text("Click to restart", width/2+2,height/2+280);
  animation(overlayImg, width/2, height/2);

}

function PreScreen() {
  newGame();
  camera.off();
  animation(gridMov, width/2, height/2);
  fill(62,112,155);
  textSize(150);
  textAlign(CENTER);
  text("BORDER RITUAL", width/2,height/2);
  fill(255,201,23);
  text("BORDER RITUAL", width/2+7,height/2);
  textSize(40);
  fill(62,112,155);
  text("Click to start", width/2,height/2+260);
  fill(255,201,23);
  text("Click to start", width/2+2,height/2+260);
  animation(overlayImg, width/2, height/2);


}

function PreScreen2() {

  camera.off();
  animation(airplane, width/2, height/2);
  fill(0);
  rect(0, 0, 1080, 130);
  rect(0, 508, 1080, 130);
  textSize(30);
  fill(62,112,155);
  text("Click to continue", width/2,height/2+260);
  fill(255,201,23);
  text("Click to continue", width/2+2,height/2+260);
  textSize(40);
  fill(62,112,155);
  text("You're landing at London Airport...", width/2,height/2-200);
  fill(255,201,23);
  text("You're landing at London Airport...", width/2+2,height/2-200);
  animation(overlayImg, width/2, height/2);



}

function PreScreen3() {

  camera.off();
  animation(airplane, width/2, height/2);
  noStroke();
  fill(0);
  rect(0, 0, 745,608);
  rect(0, 0, 1080,220);
  image(nkechiPassport, 0,0);
  textAlign(LEFT);
  textSize(30);
  textLeading(33);
  fill(255,201,23);
  text(IntroText, width/2+210-1,height/2-250);
  textAlign(CENTER);
  textSize(30);
  fill(62,112,155);
  text("Click to continue", width/2,height/2+280);
  fill(255,201,23);
  text("Click to continue", width/2+2,height/2+280);
  animation(overlayImg, width/2, height/2);


}

function PreScreen4() {
  newGame();
  camera.off();
  intro.stop();
  animation(cutsceneland, width/2, height/2);

  textSize(40);
  player_lives = 3;
  player_points = 1;
  animation(overlayImg, width/2, height/2);


     fill(62,112,155);
     text("Click to continue", width/2,height/2+280);
     fill(255,201,23);
     text("Click to continue", width/2+2,height/2+280);


}

function PreScreenFourB() {
  camera.off();
  animation(cutscenefail, width/2, height/2);
  textSize(40);
  fill(62,112,155);
  text("Click to continue", width/2,height/2+280);
  fill(255,201,23);
  text("Click to continue", width/2+2,height/2+280);
  animation(overlayImg, width/2, height/2);

}


function mousePressed() {
  blendMode(DARKEST);
  if (playScreen ===3){
    playScreen = 5;
  }  else if (playScreen ===5){
      playScreen = 6;
    } else if (playScreen ===6){
        playScreen = 0;
      } else if (playScreen ===0){
      playScreen = 7;
    }  else if (playScreen === 7) {
    playScreen = 9;
  } else if (playScreen === 9){
  playScreen = 1;
  } else if (playScreen === 1){

  if(gameOver){
            newGame();

        }
          nkechi.velocity.x = +9;
          nkechi.velocity.y = -12;
          nkechi.changeAnimation("jump");
          soundtrack3.play();
  }   else if (playScreen === 2) {
      playScreen = 3;

    }else if (playScreen === 4) {
        playScreen = 10;
    }  else if (playScreen === 10){
        playScreen = 8;
    }else if (playScreen === 8) {
          playScreen = 3;
        }


}


function mouseReleased(){
  blendMode(NORMAL);
}

function draw_Score(){
    // Draws the player's score to the screen

    fill("black");
    textSize(25);
    text("Tokens: " + player_points, 101,101);
    text("Tries: " + player_lives,101,126);
    text("ErrantBox Footage",908,101);
    text("06/06/2017",870,126);
    fill(255,201,23);
    textSize(25);
    text("Tokens: " + player_points, 100,100);
    text("Tries: " + player_lives,100,125);
    text("ErrantBox Footage",908,100);
    text("06/06/2017",870,125);


    if(nkechi.overlap(papers)){
      fill("black");
      textSize(60);
      textAlign(CENTER);
      text("TRIES: " + player_lives, width/2+1, height/2+1);
      textSize(50);
      text("CLICK TO PLAY", width/2+1, height/2+50+1);
      fill(255,201,23);
      textSize(60);
      textAlign(CENTER);
      text("TRIES: " + player_lives, width/2, height/2);
      textSize(50);
      text("CLICK TO PLAY", width/2, height/2+50);
    }

    if (player_lives === 0) {
     playScreen = 2;
   }

   if (player_points < 5) {
     nkechi.velocity.x = +9;

  }

   if (player_points > 5) {
     nkechi.velocity.x = +13;

  }

   if (player_points > 10) {
     nkechi.velocity.x = +15;

  }

  if (player_points > 15) {
    nkechi.velocity.x = +17;

 }

   if (player_points === 20) {
    playScreen = 4;
  }


}




function draw_Hint() {
  textSize(30);
  textLeading(27);
  textAlign(CENTER);
  fill(62,112,155);
  text("To cross the border collect 20 Trickster Tokens\nClick to Jump and avoid the scanners",  width/2,height/2+240);
  fill(255,201,23);
  text("To cross the border collect 20 Trickster Tokens\nClick to Jump and avoid the scanners", width/2+2,height/2+240);

}
