

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");


window.onload = function(){
   init();
  // window.addEventListener('resize', init, false)
}

function init(){

  var ccHeight =  document.getElementById("cContainer").clientHeight;
  var ccWidth =  document.getElementById("cContainer").clientWidth;
  c.height =  ccHeight-60;
  c.width =  ccWidth-60;
  console.log( ccHeight, ccWidth);

}


    // Lager to arrays med x og y koordinater som kan manipuleres.
    // active danner linje ("tråden") som henger fra siste markerte punkt til pil.
    // finish knytt sluttpunkt til startpunkt.


    var active = true;
    var x = [];
    var y = [];
    var punkt=0;


    /* Ved klikk registreres ny verdi til x[i] og y[i]. i øker med en og draw() kalles.
    Når i øker med en(++) vil siste x og y verdi, x[i] og y[i], bli udefinert. */


       c.addEventListener("click", klikk)

        function klikk(e) {

            x[punkt] = e.clientX-c.offsetLeft;
            y[punkt] = e.clientY-c.offsetTop;

        //Er klikk nr 3 eller mer i nærheten av x[0], lukkes figuren.

        if (punkt>1 && Math.abs(x[0]-x[punkt])<= 20 && Math.abs(y[0]-y[punkt]) <= 20) {

            active=false;

        //fjerner siste registrerte punkt

            x.splice(punkt, 1);
            y.splice(punkt, 1);

             draw();

            }

                else {
                    punkt+=1;
            }

       }


    //For å å se "tråden" kalles draw() for en hver musebevegelse.

    c.addEventListener("mousemove", mouseMove);

    function mouseMove(e) {

       if(active) {

            x[punkt] = e.clientX-c.offsetLeft;
            y[punkt] = e.clientY-c.offsetTop;

            draw();

        }

    }


    function draw () {


            ctx.fillStyle="green"; // bestemmer fyllfarge

            ctx.clearRect(0,0, c.width, c.height);

                                                                    //nullstiller dash-property
            ctx.beginPath();
            ctx.moveTo(x[0], y[0]);

            //linjer tegnes
            for (let i=1; i<punkt; i++){
                ctx.lineTo(x[i], y[i]);

            }

            // om polygon fortsatt ikke lukket
            if(active) {

                ctx.lineTo(x[punkt], y[punkt]);
                ctx.stroke();

            }

                else {

                    ctx.lineTo(x[0], y[0]);
                    ctx.stroke();
                    ctx.fill();


            }

    }




//Transfomasjon:



  /*  var btn = document.getElementById("Tform");

    btn.onclick = transform;

    // i er lik antall ledd i x- og y-array.


   function transform() {

    var S = document.getElementById("scale").value;
    var R = document.getElementById("rotate").value;
    var T = document.getElementById("trans").value;

    ConvertNew();   //konverterer til klassisk koordinatsystem

    console.log(x);
    console.log(y);


    //Roter

    var Rot = 0

    var xTemp = [];
    var yTemp = [];

    if(R !== null) {

        Rot = R* Math.PI / 180;
    }


    for (let k=0; k<punkt; k++){

        xTemp[k] = x[k]*Math.cos(Rot)-y[k]*Math.sin(Rot);
        yTemp[k] = x[k]*Math.sin(Rot)+y[k]*Math.cos(Rot);

    }


    x=xTemp;
    y=yTemp;


  //Skaler

    var S = S.match(/\d+/g);
    var Sx = 1;
    var Sy = 1;

    if(S !== null) {

        Sx = parseInt(S[0]);
        Sy = parseInt(S[1]);
   }

    for (let k=0; k<punkt; k++) {

        x[k]=x[k]*Sx
        y[k]=y[k]*Sy
    }



  //Transler


    var T = T.match(/\-?\d+/g);
    var Tx = 0;
    var Ty = 0;

    if(T !== null){
        Tx = parseInt(T[0]);
        Ty = parseInt(T[1]);
    }

    for (let k=0; k<punkt; k++) {


        x[k]=x[k]+Tx;
        y[k]=y[k]+Ty;

    }

    ConverBack();

    draw()


    }
*/


    function ConvertNew() {


        for (let j = 0; j<punkt; j++) {

            x[j] = x[j] - 300;
            y[j] = (y[j]-300)*(-1);


        }
    }

    function ConverBack() {

        for (let j =0 ; j<punkt; j++) {

            x[j] = x[j] + 300;
            y[j] = (y[j]-300)*(-1);

        }

    }

    //var btn2 = document.getElementById("Erase");

    //btn2.onclick = Erase;

    function Erase() {

        ctx.clearRect(0,0, c.width, c.height);



        active = true;
        x = [];
        y = [];
        punkt=0;
    }
