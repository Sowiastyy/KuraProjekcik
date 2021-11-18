var s, s2, p; //Declaration of global variables
$(window).ready(function(){

    load();
    update();
})
class Screen{
    constructor(cnv) {
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

class Player {
    constructor(l, r, color) {
        //Cords and movement
        this.spd    = 2;
        this.x      = Math.floor((s.w()-100) * Math.random()+25);   
        this.y      = Math.floor((s.h()-100) * Math.random()+25);   
        this.xcurv  = 1
        this.ycurv  = 1;
        this.rotCB  = false;
        this.l      = l; //left key
        this.r      = r ; //right key
        this.w      =  6;
        //Other
        this.score  = 0;
        this.color  = color;
        this.alive  = true;
        this.okres  = Math.floor(100 * Math.random()+50);
        this.col    = true;
    }

    update(){
        if(this.x>s.w())
            this.alive=false;
        if(this.y>s.h())
            this.alive=false;
        s.ctx.fillStyle=this.color;
        s2.ctx.fillStyle=this.color;
        var data = s.ctx.getImageData(this.x+(this.w/2)+(this.xcurv*this.w*1.1), this.y+(this.w/2)+(this.ycurv*this.w*1.1), 1, 1);
        var i = 0;


        s2.ctx.beginPath();
        s2.ctx.arc(this.x, this.y,this.w,0,Math.PI*2,true);
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
            s.ctx.arc(this.x,this.y,this.w,0,Math.PI*2,true);
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
    constructor(x, y, condition, behaviour) {
        this.x = x;
        this.y = y; 
        this.r = 30;
        this.condition = condition;
        this.behaviour = behaviour;
        this.timeLeft = 0;
    }
    update() {
        if(this.picked)
        {
            if(this.timeLeft>0) {
                this.timeLeft--;
                for(const _id in p) {
                    if(this.condition(_id, this.picked)) {
                        this.behaviour(_id);
                    }
                }

            }
            return;
        }


        s2.ctx.fillStyle="#01021A";
        s2.ctx.beginPath();
        s2.ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
        s2.ctx.fill();

        for(const _id in p) {
            if(CircleCollapse(this.x, this.y, this.r, p[_id].x, p[_id].y, p[_id].w)) {
                this.picked = _id;
                this.timeLeft=100;
            }
        }

    }
}
var keys =[];
var _Behaviours = [
    function(id){p[id].spd=3},
    function(id){p[id].spd=1}
];
var powUp = new PowerUp(100, 100, new Function("a", "b", "return a==b"), function(id){p[id].spd=3});
var PColors = [[252, 74, 28], [252, 237, 40], [14, 22, 255],[ 4, 255, 11, 100], [1, 2, 26]];
function load() {
    //Initialization of global objects using constructors
    s = new Screen(document.getElementById("gra"));
    s2 = new Screen(document.getElementById("gra2"));
    p = [
        new Player(65, 68, "#FC4A1C"),
        new Player(37, 39, "#FCED28"),
        new Player(100, 102, "#0E16FF"),
        new Player(74, 76, "#04FF0B")
    ];

    document.body.addEventListener("keydown", function(e){
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function(e){
        keys[e.keyCode] = false;
    });

    //Making Border
    s.ctx.fillStyle="#01021A";
    s.ctx.fillRect(0,0, s.w(),s.h());
    s.ctx.clearRect(25, 25,s.w()-50,s.h()-50);
    
}

function update() {
    setTimeout(function(){
        update();
    }, 1000/s.FPS);
    s2.ctx.clearRect(0, 0, s.w(), s.h());
    //Player update
    p[0].update();
    p[1].update();
    p[2].update();
    p[3].update();
    //The name of variable describes itself
    var i =0;
    var HowManyDead = 0;
    while(p[i]) {
        if(p[i].alive==false) 
            HowManyDead++;
        i++;
    }
    if(HowManyDead==4) {
        load();
    }
    powUp.update();
}