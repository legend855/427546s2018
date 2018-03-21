
var canvas = document.getElementById("canvas"),
    ctx    = canvas.getContext('2d');


var style = ctx.strokeStyle,
    lineWidth = ctx.lineWidth,
    lineJoin = ctx.lineJoin;

var direction = Math.PI / 180;

/*
function draw() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0,0,150,75);
}
*/

function clearCanvas() {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
}

/*
function drawPrimitive() {
    if(primitive=="line") {
        clear();
        if(ratio == 1) line()
    }
}
*/

function process_fractal() {
    var primitive = document.getElementById("primitive").value,
        iterations = parseInt(document.getElementById("iter").value),
        ratio = parseInt(document.getElementById("ratio").value);

    ctx.lineWidth = 200;
    //alert(iterations);

    /*
    if(primitive == "line") {
        clearCanvas();
        if(ratio == 1)
            fractal_line(0, 20, 150, 400, ratio);
        else 
            fractal_line(iterations, 20, 150, 400, ratio);
    }

    */
    switch(primitive) {
        case "line":
            clearCanvas();
            if(ratio == 1)
                fractal_line(0, 100, 150, 400, ratio);
            else 
                fractal_line(iterations, 20, 150, 400, ratio);
            break;
        
        case "polyline":
            clearCanvas();
            var x_p = 280, y_p = 150, len_edg = 200,
                xd = yd = Math.pow((200*200 - 100*100),0.5);
            ctx.save();
            if(ratio == 1) {
                polyline_fractal(0, x_p, y_p, len_edg, ratio, 120);
                polyline_fractal(0, x_p-100, y_p+yd, len_edg, ratio, 30);
                polyline_fractal(0, x_p-100+xd, y_p+yd+100, len_edg, ratio, -60);
                polyline_fractal(0, x_p-100+xd+100, y_p+yd+100-yd, len_edg, ratio, 0);
                polyline_fractal(0, x_p-100+xd+100+200, y_p+yd+100-yd, len_edg, ratio, 150);            
            } else{
                polyline_fractal(iterations, x_p, y_p, len_edg, ratio, 120);
                polyline_fractal(iterations, x_p-100, y_p+yd, len_edg, ratio, 30);
                polyline_fractal(iterations, x_p-100+xd, y_p+yd+100, len_edg, ratio, -60);
                polyline_fractal(iterations, x_p-100+xd+100, y_p+yd+100-yd, len_edg, ratio, 0);
                polyline_fractal(iterations, x_p-100+xd+100+200, y_p+yd+100-yd, len_edg, ratio, 150);
            }
            ctx.restore();

            break;

        case "circle":
            clearCanvas();

            if(iterations == 2 && ratio == 2)
                ratio = 4, iterations = 1;

            circle_fractal(iterations, 400, 300, 200, ratio);
            
            break;
        
        case "ellipse":
            clearCanvas();
            
            ellipse_fractal(0, 400, 300, 250, 175, iterations);
            
            break;

        case "rectangle":
            clearCanvas();
            var x=200, y=200, width=378, height=190;
            ctx.save()
            
            if(ratio == 1) {
                polyline_fractal(0, x, y, height, ratio, 90);
                polyline_fractal(0, x, y+height, width, ratio, 0);
                polyline_fractal(0, x+width, y+height, height, ratio, -90);
                polyline_fractal(0, x+width, y, width, ratio, -180);
            }
            else {
                polyline_fractal(iterations, x, y, height, ratio, 90);
                polyline_fractal(iterations, x, y+height, width, ratio, 0);
                polyline_fractal(iterations, x+width, y+height, height, ratio, -90);
                polyline_fractal(iterations, x+width, y, width, ratio, -180);
            }
            ctx.restore()
            
            break;

        default:
            alert("Invalid option!");
    }
}

function fractal_line( iter_l, x1, y1, length, ratio_l ) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(x1, y1);
    ctx.moveTo(0, 0);
    frac(iter_l);
    ctx.restore();

    // fractal function
    function frac(l) {
        var angle, j, k;
        ctx.save();
        if(l == 0) {
            //alert(length);
            ctx.lineTo(length, 0);
            ctx.stroke();

        }
        else {
            //rotate canvas in all directions 
            ctx.scale(1/ratio_l, 1/ratio_l);
            ctx.rotate(60*direction);
            frac(l-1);
            ctx.rotate(-120*direction);
            frac(l-1);
            ctx.rotate(0*direction);
            frac(l-1);
            ctx.rotate(120*direction);
            frac(l-1);

            // do we need more than one?
            if(ratio_l > 2) {
                angle = 240;
                for(k=6; k<=2*ratio_l; ) {
                    ctx.rotate(0*direction);
                    frac(l-1);
                    j = k/2;
                    if(j%2 == 1) {
                        ctx.rotate(0*direction);
                        frac(l-1);
                        angle += 240;
                    }
                    else {
                        ctx.rotate(direction*angle);
                        frac(l-1);
                        angle += 120;
                    }
                    k += 2;
                }
            }
        }
        ctx.restore();
        ctx.translate(length, 0);
    }    
}

function polyline_fractal(iter_l, x, y, length, ratio_l, angle_l) {
    ctx.save();
    ctx.translate(x, y);
    ctx.moveTo(0, 0);
    ctx.rotate(angle_l*direction);
    frac(iter_l);
    ctx.restore();

    function frac(iter) {
        var j, k, angle;
        ctx.save();
        // 1 iteration? draw one polyline
        if(iter == 0) {
            ctx.lineTo(length, 0);
            ctx.stroke();
        }
        else {
            ctx.scale(1/ratio_l, 1/ratio_l);
            ctx.rotate(60*direction);
            frac(iter - 1);
            ctx.rotate(-120 * direction);
            frac(iter - 1);
            ctx.rotate(0 * direction);
            frac(iter - 1);
            ctx.rotate(120 * direction);
            frac(iter - 1);

            if(ratio_l > 2) {
                angle = 240;
                for(k=6; k<= 2*ratio_l; k++) {
                    ctx.rotate(0*direction);
                    frac(iter-1);
                    j = k/2;
                    if(j%2 == 1) {
                        ctx.rotate(angle*direction);
                        frac(iter-1);
                        angle += 240;
                    }
                    else {
                        ctx.rotate(angle*direction);
                        frac(iter-1);
                        angle += 120;
                    }
                    k += 2;
                }
            }
        }
        ctx.restore();
        ctx.translate(length, 0);
    }
}

function circle_fractal(iter_l, x, y, length, ratio_l) {
    var i, deg = 180/ratio_l, cos=length*Math.cos(deg*direction), sin=length*Math.sin(deg*direction);
    if(ratio_l == 1 || iter_l ==0) {
        ctx.beginPath();
        ctx.arc(x, y, length, 0*direction, direction*0, false);
        ctx.stroke();
        ctx.restore();
    }
    else {
        deg = 180/(ratio_l*iter_l);
        if(ratio_l%2 == 1) {
            ctx.beginPath();
            ctx.arc(x-length-cos, y-sin, length, 0*direction, deg*direction, false );
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x, y, length, (180+deg)*direction, (180+2*deg)*direction, false );
            ctx.stroke();

            if(ratio_l >= 3) {
                for(i=2; i<ratio_l; i++) {
                    if(ratio_l == 3) {
                        ctx.beginPath();
                        ctx.arc(x+length+cos, y-sin, length, 2*deg*direction, 3*deg*direction, false);
                        ctx.stroke();
                        i += 1;
                    }
                    if(r == 5) {
                        ctx.beginPath();
                        ctx.arc(x, y-2*length*Math.cos((deg/2)*direction), length, 2*deg*direction,3*deg*direction, false);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.arc(x, y, length, (180+3*deg)*direction, (180+deg*4)*direction, false);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.arc(x+length+cos, y-sin, length, 4*deg*direction, 5*deg*direction, false);
                        ctx.stroke()
                        i += 3;
                    }
                } 
            }
            ctx.beginPath();
            ctx.arc(x, y, length, 0*direction, deg*direction, false);
            ctx.stroke();
            if(ratio_l >= 3) {
                for(i=i+1; i<2*ratio_l;) {
                    if(ratio_l == 3){
                        ctx.beginPath();  
                        ctx.arc(x, y+2*sin, length , (180+deg)*direction, (180+2*deg)*direction,false);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.arc(x, y, length, 2*deg*direction, 3*deg*direction, false);
                        ctx.stroke();
                        i = i+2;
                    }
                    if(ratio_l == 5) {
                        var l = 2*length*Math.cos((deg/2)*direction);
                        ctx.beginPath();
                        ctx.arc(x+l*Math.cos(54*direction),y+l*Math.sin(54*direction),len,(180+deg)*direction,(180+2*deg)*direction,false);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.arc(x, y, length, 2*deg*direction, 3*deg*direction, false);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.arc(x-l*Math.cos(54*direction), y+l*Math.sin(54*direction),length,(180+3*direction)*direction,(180+4*deg)*direction,false);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.arc(x, y, length, 4*deg*direction, 5*deg*direction, false);
                        ctx.stroke();
                        i = i+4;
                    }
                }
            }
            ctx.restore()
        }
        if(ratio_l%2 == 0) {
            if(ratio_l == 2 && iter_l) {
                for(var i = 0, j = 1; i < 2*iter_l*ratio_l ;){
                    var chSign = Math.pow((-1),j);
                    ctx.beginPath();
                    ctx.arc(x+chSign*length+chSign*cos, y+chSign*sin, length, (i*(360/(2*ratio_l)))*direction,((i+1)*(360/(2*ratio_l)))*direction, false);
                    ctx.stroke();
                    i += 2;
                    j += 1;
                }       
                for(var k = 1; k < 2*ratio_l*iter_l ;){
                    ctx.beginPath();
                    ctx.arc(x, y, length, (k*(360/(2*ratio_l)))*direction, ((k+1)*(360/(2*ratio_l)))*direction, false);
                    ctx.stroke();
                    k += 2;
                }   
            }
            if(ratio_l == 4 && iter_l == 1){
                for(var i = 0, j = 1; i < 2*iter_l*ratio_l ;){
                    var chSign = Math.pow((-1),j);
                    var eg = 2*length*Math.cos((deg/2)*direction);
                    ctx.beginPath();
                    ctx.arc(x+chSign*eg*Math.cos((deg/2)*direction), y+chSign*eg*Math.sin((deg/2)*direction),
                        length,(i*deg)*direction, ((i+1)*deg)*direction, false);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(x+Math.pow((-1),j-1)*eg*Math.sin((deg/2)*direction), y+chSign*eg*Math.cos((deg/2)*direction),
                    length, ((i+2)*deg)*direction,((i+3)*deg)*direction,false);
                    ctx.stroke();
                    i = i + 4;
                    j = j + 1;
                }
                for(var k = 1; k < 2*ratio_l*iter_l ;){
                    ctx.beginPath();
                    ctx.arc(x, y, length, (k*(360/(2*ratio_l)))*direction, ((k+1)*(360/(2*ratio_l)))*direction, false);
                    ctx.stroke();
                    k = k + 2;
                }
            }
        }
    }
}

function ellipse_fractal(iter, x, y, rad_y, rad_x, ratio) {
    if(rad_y > rad_x) {
        rx = rad_y;
        ry = rad_y;
    }else {
        rx = rad_x;
        ry = rad_y;
    }
    ratiox = rx / ry;
    ratioy = ry / rx;
    ctx.save();
    ctx.scale(ratiox, ratioy);
    ctx.beginPath()
    ctx.arc(x/ratiox, y/ratioy, rx, ry, 0, Math.PI*2, false);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}