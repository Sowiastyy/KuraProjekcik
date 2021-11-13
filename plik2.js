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
var s2 = new Screen();
class Player {
    init(l, r, color, x ,y) {
        this.x = x;
        this.y = y;
        this.xcurv = 1;
        this.ycurv = 1;
        this.rotCB = false;
        this.l = l;
        this.r = r ;
        this.color = color;
        this.alive=true;
        this.okres = 0;
    }

    update(){
        //console.log(this.xcurv+", "+ this.ycurv);
        s.ctx.fillStyle=this.color;
        var data = s.ctx.getImageData(this.x+(this.xcurv*4), this.y+(this.ycurv*4), 1, 1);
        var i = 0;
        this.okres++;
        while(PColors[i]) {

            if(data.data[0]==PColors[i][0] && data.data[1] == PColors[i][1] && data.data[2]== PColors[i][2]) {
                console.log(PColors[i][0]+ "="+ data.data[0]);
                console.log(PColors[i][1]+ "="+ data.data[1]);
                console.log(PColors[i][2]+ "="+ data.data[2]);
                this.alive=false;

            }
            i++;
        }

        if(this.alive) {
            if(this.okres<100) {
                s.ctx.beginPath();
                s.ctx.arc(this.x,this.y,5,0,Math.PI*2,true);
                s.ctx.fill();

            }
            else if(this.okres>120) {
                this.okres=0;
            }



            this.x+=2*this.xcurv;
            this.y+=2*this.ycurv;
    
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
var p = new Player();
var p2 = new Player();
var p3 = new Player();
var p4 = new Player();

var PColors = [[252, 74, 28], [252, 237, 40], [14, 22, 255],[ 4, 255, 11, 100], [1, 2, 26]];

function load() {
    

    s.init(document.getElementById("gra"));
    s2.init(document.getElementById("gra2"));
    p.init(65, 68, "#FC4A1C", 200, 100);
    p2.init(37, 39, "#FCED28", 300, 200);
    p3.init(74, 76, "#04FF0B", 300, 300);
    p4.init(100, 102, "#0E16FF", 400, 200);
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
    p.update();

    p2.update();
    p3.update();
    p4.update();
    s2.ctx.fillRect(300, 300, 50, 50);
}