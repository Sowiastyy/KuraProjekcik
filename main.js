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
      
        s.ctx.drawImage(leosia ,this.x-cz/2, this.y, 100+cz/2, 100);
       
       
       
        if(score>150)
        {
            s.ctx.drawImage(chain ,this.x-cz/2, this.y+30, 100+cz/2, 100);
        }

        if(score>100)
        {
            s.ctx.drawImage(sword ,this.x-cz/2+50, this.y+20, 110+cz/2, 110);
        }

        if(score>50)
        {
            s.ctx.drawImage(helm ,this.x-cz/2-20, this.y-40, 140+cz/2, 100);
        }
        
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

class blasters
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
        s.ctx.drawImage(dzieciak, 1700,this.y, 200, 200);

        var i=0;
        s.ctx.fillStyle="blue";
        s.ctx.fillRect(i,this.y+78,1700,10);
            
        if( this.y-23 <= p.y && this.y > p.y || this.y-27 <= p.y-100 && this.y > p.y-100)
        {
            console.log("yooo");
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
    if(a.x+(a.w/2+cz/2)>b.x && a.x-(a.w/2)<b.x && a.y+(a.h/2)>b.y && a.y-(a.h/2)<b.y) {
        return true;
    }
}
var CherryAlive = true;
var huj = 10;
var score=0;
var cz = 0;
apples = new Image();
apples.src = "apple_sheet.png";

leosia = new Image();
leosia.src = "young.png";

cherry = new Image();
cherry.src = "124325.png";

helm = new Image();
helm.src = "helm.png";

sword = new Image();
sword.src = "sword.png";

chain= new Image();
chain.src = "chain.png";

dzieciak= new Image();
dzieciak.src = "dzieciak.png";

var keys =[];
var p = new Player();
var a = new apple();
var c = new cherr();
var b = new blasters();

function load() {
    s.init(document.getElementById("gra"));
    p.init();
    a.init();
    c.init();
    b.init();
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
    b.update();
    s.ctx.fillStyle="#F06543";
    s.ctx.font = "36px Trebuchet MS";
    s.ctx.fillText(score*100, s.w()-90, 45);
    
}