const canvas = document.getElementById("canvas-title");
const ctx = canvas.getContext("2d");

width = window.innerWidth
height = window.innerHeight

canvas.width  = width;
canvas.height = height;

scale_factor = (width / 1280)

crowd_image = new Image();
crowd_image.src = "images\\crowd.png";

player_image = new Image();
player_image.src = "images\\guy.png";

megaphone_image = new Image();
megaphone_image.src = "images\\megaphone.png";

won_image = new Image();
won_image.src = "images\\won.png";

won = false
rumble = 0
progress = 0
crowd_move = 0

document.body.onkeyup = function(e) {
    if (won)
    return;

    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
      progress += .02
      rumble += 3
    }
  }

  document.body.onclick = function(e) {
        if (won)
        return;

      progress += .02
      rumble += 3
  }


function MainLoop() {

    rumblex = Math.random() * Math.log(rumble + 1) * 5;
    rumbley = Math.random() * Math.log(rumble + 1) * 5;

    ctx.fillStyle = "White";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    font = 50 * scale_factor

    ctx.fillStyle = `Black`
    ctx.font = `${font}px Arial`;

    if (won == false) {
        h1 = "Quickly! You need to call off the strike now!"
        ctx.fillText(h1, width / 2 - (ctx.measureText(h1).width / 2) + rumblex,
                 height / 5 + rumbley);  

        ctx.font = `${font / 2}px Arial`;
        h1 = "(click or press space to run)"
        ctx.fillText(h1, width / 2 - (ctx.measureText(h1).width / 2) + rumblex,
                 height / 4 + rumbley); 
        ctx.font = `${font}px Arial`; 
    }

    else {
        h1 = "Unionize that Bitchhhh!!!!"
        ctx.fillText(h1, width / 2 - (ctx.measureText(h1).width / 2) + rumblex,
                 height / 5 + rumbley);  
    }

    
    


    ctx.drawImage(player_image, width / 20 + progress * width, canvas.height / 2, 300, 300 * player_image.height / player_image.width);

    if (won == false)
    ctx.drawImage(megaphone_image, width - (width / 6), 
                canvas.height / 2, 300, 300 * crowd_image.height / crowd_image.width);

    for (let index = 0; index < 15; index++) {
        ctx.drawImage(crowd_image, 
                    width / 2 - (progress * 7 * crowd_image.width) - crowd_move + rumblex +
                    300 * index, 
                    canvas.height / 2, 300, 300 * crowd_image.height / crowd_image.width + rumbley);
    }
    
   

    if (progress >= .7){
            won = true
            rumble = 0
            player_image = won_image
            crowd_move += 2
        }

    rumble -= .2
    rumble = Math.max(rumble, 0)

    setTimeout(MainLoop, 10)

}

MainLoop()