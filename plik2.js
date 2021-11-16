$(window).ready(function(){
    load();
    update();
})
class Screen{
    init(cnv) {
        this.canvas = cnv;
        this.ctx = this.canvas.getContext("2d");

        this.ctx.filter = "none";
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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
var s2 = new Screen();
class Player {
    init(l, r, color) {
        //Cords and movement
        this.spd    = 2;
        this.x      = Math.floor((s.w()-100) * Math.random()+25);   
        this.y      = Math.floor((s.h()-100) * Math.random()+25);   
        this.xcurv  = 1
        this.ycurv  = 1;
        this.rotCB  = false;
        this.l      = l; //left key
        this.r      = r ; //right key
        //Other
        this.score=0;
        this.color  = color;
        this.alive  =true;
        this.okres  = Math.floor(100 * Math.random()+50);
        this.col    = true;
    }

    update(){
        s.ctx.fillStyle=this.color;
        s2.ctx.fillStyle=this.color;
        var data = s.ctx.getImageData(this.x+(this.xcurv*4), this.y+(this.ycurv*4), 1, 1);
        var i = 0;


        s2.ctx.beginPath();
        s2.ctx.arc(this.x, this.y,5,0,Math.PI*2,true);
        s2.ctx.stroke();
        s2.ctx.fill();
        if(!this.alive)
            return;

    
        if(this.col) {
            while(PColors[i]) {

                if(data.data[0]==PColors[i][0] && data.data[1] == PColors[i][1] && data.data[2]== PColors[i][2])
                    this.alive=false;
                    if(i<=3)
                        p[i].score++;
                i++;
            }
        }
        this.okres--;
        if(this.okres>0) {
            s.ctx.beginPath();
            s.ctx.arc(this.x,this.y,5,0,Math.PI*2,true);
            this.col=true;
            s.ctx.fill();

        }
        else if(this.okres<-20) {
            this.okres=Math.floor(150 * Math.random()+200);
            
        }
        else
            this.col=false;



        this.x+=this.spd*this.xcurv;
        this.y+=this.spd*this.ycurv;

        if(keys[this.l]){ // A
            if(this.ycurv<1 && this.rotCB==false) {
                this.ycurv+=0.1;
            }
            else if(this.xcurv<1 && this.rotCB==false) {
                this.xcurv+=0.1;
            }
            else if(this.ycurv>-1) {
                this.rotCB = true;
                this.ycurv-=0.1;
            }
            else {
                this.xcurv-=0.1;
                if(this.xcurv<=-1) {
                    this.rotCB=false;
                }
            }
    
        }
        if(keys[this.r] && this.xcurv<10){ // D
            if(this.xcurv<1 && this.rotCB==true) {
                this.xcurv+=0.1;
            }
            else if(this.ycurv<1 && this.rotCB==true) {
                this.ycurv+=0.1;
            }
            else if(this.xcurv>-1) {
                this.xcurv-=0.1;
                this.rotCB=false;
            }
            else {
                this.ycurv-=0.1;
                if(this.ycurv<=-1) {
                    this.rotCB=true;
                }
            }
        }
    
        

    }
}
class PowerUp {
    init(x, y) {
        this.x = x;
        this.y = y; 
        s.ctx.fillStyle="#01021A";
        s.ctx.fillRect(this.x,this.y, 10, 10 );
    }
}
var keys =[];
var p= [new Player(),new Player(),new Player(),new Player()];

var PColors = [[252, 74, 28], [252, 237, 40], [14, 22, 255],[ 4, 255, 11, 100], [1, 2, 26]];

function load() {
    s.init(document.getElementById("gra"));
    s2.init(document.getElementById("gra2"));
    p[0].init(65, 68, "#FC4A1C");
    p[1].init(37, 39, "#FCED28");
    p[2].init(100, 102, "#0E16FF");
    p[3].init(74, 76, "#04FF0B");

    document.body.addEventListener("keydown", function(e){
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function(e){
        keys[e.keyCode] = false;
    });
    s.ctx.fillStyle="#01021A";
    s.ctx.fillRect(0,0, s.w(),s.h());
    s.ctx.clearRect(25, 25,s.w()-50,s.h()-50);

}

function update() {
    setTimeout(function(){
        update();
    }, 1000/s.FPS);
    s2.ctx.clearRect(0, 0, s.w(), s.h());
    p[0].update();
    p[1].update();
    p[2].update();
    p[3].update();
    var i =0;
    var HowManyDead = 0;
    while(p[i]) {
        if(p[i].alive==false) 
            HowManyDead++;
        i++;
    }
    if(HowManyDead==3) {
        load();
    }
}