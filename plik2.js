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
        this.x = 1000;
        this.y = 1000;
        this.leng = 0;

    }
    update(){
        console.log(this.x)
        s.ctx.fillStyle="#F09D51";
        s.ctx.beginPath();
        
        s.ctx.moveTo(100+this.leng, 100-(this.leng*0.5));

        s.ctx.lineTo(100, 100);
        this.leng++;

        s.ctx.stroke();
        /* Controller
        if(keys[87] && this.y>0){ // W

            this.y -= 10;
        }
        if(keys[83] && this.y<s.h()-100){ // S
            this.y += 10;
        }
        if(keys[65] && this.x>0){ // A
            this.x -= 10;
        }
        if(keys[68] && this.x<s.w()-100){ // D
            this.x += 10;
        }
*/
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