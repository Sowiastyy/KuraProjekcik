$(window).ready(function(){
    load();
    update();
})
class Screen{
    init(cnv) {
        this.canvas = cnv;
        this.ctx = this.canvas.getContext("2d");

        this.ctx.filter = "none";
        this.canvas.width = window.innerWidth*0.98;
        this.canvas.height = window.innerHeight*0.98;
    }
    get FPS(){
        return 60;
    }
    w() {
        return this.canvas.width;
    }
    h() {
        return this.canvas.height;
    }
}

var s = new Screen();

class Player {
    init() {
        this.x = 0;
        this.w= 100;
        this.h =100;
        this.y = 0;
        this.HowSpeedImI = 10;
    }
    update(){
        s.ctx.fillStyle="#F09D51";
        s.ctx.fillRect(this.x-cz/2, this.y, 100+cz/2, 100);
        if(keys[87] && this.y>0){ // W
            this.y -= this.HowSpeedImI;
        }
        if(keys[83] && this.y<s.h()-100){ // S
            this.y += this.HowSpeedImI;
        }
        if(keys[65] && this.x>0){ // A
            this.x -= this.HowSpeedImI;
        }
        if(keys[68] && this.x<s.w()-100){ // D
            this.x += this.HowSpeedImI;
        }
    }
}
class cherr
{
    init()
    {
        this.x = 1 +  Math.floor((s.w() - 160) * Math.random());
        this.y = 1 + Math.floor((s.h() - 160) * Math.random());
        this.w=160;
        this.h=160;
    }
    update()
    {
        s.ctx.drawImage(cherry, this.x, this.y, 100, 100);
        

        

        if(score>huj && CherryAlive == false)
        {
            c.init();
            
            CherryAlive = true;
        }

        if(SquareCollapse(this, p)) 
        {
            p.HowSpeedImI+= 0.5;
            this.x=1000000;
            this.y=1000000;
            CherryAlive = false;
            huj= score + 10;
            cz+=10;
            
        }

        
    }
    
    
    
    
    
}
class apple {
    init() {
        this.x=1 + Math.floor((s.w() - 160) * Math.random());
        this.y=1 + Math.floor((s.h() - 160) * Math.random());
        this.w=160;
        this.h=160;
        this.variant = 1 + Math.floor((4 - 1) * Math.random());;
    }
    update(){
        s.ctx.drawImage(apples, 
            (this.variant-1)*160, 0, 
            160, 160, 
            this.x, this.y, 
            80, 80);
        if(SquareCollapse(this, p)) {
            score+=this.variant;
            this.init();
        }
    }
}
function SquareCollapse(a, b) {
    if(a.x+(a.w/2+cz/2)>b.x && a.x-(a.w/2+cz/2)<b.x && a.y+(a.h/2)>b.y && a.y-(a.h/2)<b.y) {
        return true;
    }
}
var CherryAlive = true;
var huj = 10;
var score=0;
var cz = 0;
apples = new Image();
apples.src = "apple_sheet.png";

cherry = new Image();
cherry.src = "124325.png";

var keys =[];
var p = new Player();
var a = new apple();
var c = new cherr();

function load() {
    s.init(document.getElementById("gra"));
    p.init();
    a.init();
    c.init();
    document.body.addEventListener("keydown", function(e){
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function(e){
        keys[e.keyCode] = false;
    });
}
function update() {
    setTimeout(function(){
        update();
    }, 1000/s.FPS);
    s.ctx.clearRect(0, 0, s.w(), s.h()); //Works like system("cls");
    a.update();
    p.update();
    c.update();
    s.ctx.fillStyle="#F06543";
    s.ctx.font = "36px Trebuchet MS";
    s.ctx.fillText(score*100, s.w()-90, 45);
    
}