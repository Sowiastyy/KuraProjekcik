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
        this.x = 100;
        this.y = 100;
        this.xcurv = 1;
        this.ycurv = 1;
        this.rotCB = true;
    }
    update(){
        console.log(this.xcurv+", "+ this.ycurv);
        s.ctx.fillStyle="#F09D51";
        s.ctx.beginPath();
        s.ctx.arc(this.x,this.y,5,0,Math.PI*2,true);
        s.ctx.fill();

        this.x+=2*this.xcurv;
        this.y+=2*this.ycurv;

        if(keys[65]){ // A
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
        if(keys[68] && this.xcurv<10){ // D
        }

    }
}
var keys =[];
var p = new Player();

function load() {
    s.init(document.getElementById("gra"));
    p.init();
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
    p.update();
}