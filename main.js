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

class bomb
{
    init()
    {
        this.x = 1 +  Math.floor((s.w() - 160) * Math.random());
        this.y = 1 + Math.floor((s.h() - 160) * Math.random());
        this.w=160;
        this.h=160;
        this.j = 200;
        this.i=30;
        this.k=30;
    }

    update()
    {
        this.j--;
        if(this.j<=0)
        {
            s.ctx.drawImage(kolo, this.x,this.y, 200, 200);
            this.i--;
            if(this.i<=0)
            {
                s.ctx.drawImage(kabum, this.x-40,this.y-40, 300, 300);

                this.k--;
                if(this.k<=0)
                {
                    this.init();
                }

            }
        }

        //if(p.x <=this.x )
        

    }
}

class blasters
{
    init(hui)
    {
        this.x = 1 +  Math.floor((s.w() - 160) * Math.random());
        this.y = 1 + Math.floor((s.h() - 160) * Math.random());
        this.w=160;
        this.h=160;

        this.tak=Math.floor((Math.random() * 260) + 140);
        this.nie = 100;
        this.i = 50;
        this.dzieciak = hui;
    }
    update()
    {
        this.tak--;
        if (this.tak<0)
        {
            this.tak=0;
        }

        if(this.tak == 0)
        {
            s.ctx.drawImage(this.dzieciak, 1700,this.y, 200, 200);

            this.i --;

            if(this.i<0)
            {
                this.i=0;
            }
            if(this.i == 0)
            {
                var i=0;
                s.ctx.fillStyle="blue";
                s.ctx.fillRect(i,this.y+78,1700,10);
                
                    
                if(tacz == false && this.y-23 <= p.y && this.y > p.y ||   tacz == false && this.y-27 <= p.y-100 && this.y > p.y-100 )
                {
                    score-=10;
                    tacz = true;
                }
                this.nie--;
                if(this.nie<0)
                {
                    this.nie = 0;
                }
                if(this.nie == 0 ) 
                {
                    this.init(this.dzieciak);
                    tacz = false;
                }
            }
            
        }
        
        
    }
}

class blasters1
{
    init(hui)
    {
        this.x = 1 +  Math.floor((s.w() - 160) * Math.random());
        this.y = 1 + Math.floor((s.h() - 160) * Math.random());
        this.w=160;
        this.h=160;

        this.tak=Math.floor((Math.random() * 260) + 140);
        this.nie = 100;
        this.i = 50;
        this.dzieciak = hui;
    }
    update()
    {
        this.tak--;
        if (this.tak<0)
        {
            this.tak=0;
        }

        if(this.tak == 0)
        {
            s.ctx.drawImage(this.dzieciak, -50,this.y, 200, 200);

            this.i --;

            if(this.i<0)
            {
                this.i=0;
            }
            if(this.i == 0)
            {
                var i=0;
                s.ctx.fillStyle="blue";
                s.ctx.fillRect(i+150,this.y+78,1700,10);
                
                    
                if(tacz == false && this.y-23 <= p.y && this.y > p.y ||   tacz == false && this.y-27 <= p.y-100 && this.y > p.y-100 )
                {
                    score-=10;
                    tacz = true;
                }
                this.nie--;
                if(this.nie<0)
                {
                    this.nie = 0;
                }
                if(this.nie == 0 ) 
                {
                    this.init(this.dzieciak);
                    tacz = false;
                }
            }
            
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
var tacz = false;
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

dzieciak1= new Image();
dzieciak1.src = "dzieciak1.png";

kolo= new Image();
kolo.src = "kolo.png";

kabum= new Image();
kabum.src = "bum.png";

var keys =[];
var p = new Player();
var a = new apple();
var c = new cherr();
var b = new blasters();
var b1 = new blasters1();
var bum = new bomb();
var bum1 = new bomb();


function load() {
    s.init(document.getElementById("gra"));
    p.init();
    a.init();
    c.init();
    b.init(dzieciak);
    b1.init(dzieciak1);
    bum.init();
    bum1.init();
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
    if(score>30)
    {
        b1.update();
    }
    bum.update();
    bum1.update();
    s.ctx.fillStyle="#F06543";
    s.ctx.font = "36px Trebuchet MS";
    s.ctx.fillText(score*100, s.w()-90, 45);
    
}