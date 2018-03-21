


var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

var edge = document.getElementById("score"),
    direction = Math.PI / 180, radius = 200;


    function paint_path(x,y) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x,y,50,50,0,Math.PI*2,false);
        ctx.stroke()
        
        ctx.beginPath();
        ctx.arc(x,y,90,90,0,Math.PI*2,false);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x,y-70,10,10,0,Math.PI*2,false);
        ctx.stroke();
    
        ctx.beginPath();
        ctx.arc(x-70*Math.cos(52.5*direction),y+70*Math.sin(52.5*direction),10,10,0,Math.PI*2,false);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x+70*Math.cos(52.5*direction),y+70*Math.sin(52.5*direction),10,10,0,Math.PI*2,false);
        ctx.stroke();
    
        ctx.beginPath();
        ctx.arc(x-70*Math.cos(15*direction),y-70*Math.sin(15*direction),10,10,0,Math.PI*2,false);
        ctx.stroke();
        ctx.closePath();  
    }

    
function process_score() {  
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();  
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
    ctx.closePath();
    ctx.strokeStyle = "#FF0095";
    ctx.lineWidth = 4;

    if(edge.value == 100) { 
        var x = 400, y = 300;
        paint_path(x,y);
        ctx.save(); 
        ctx.beginPath();
        ctx.arc(x,y,radius,radius,0,Math.PI*2,false);
        ctx.stroke();
        ctx.closePath();
    }

    if(edge.value >= 80 && edge.value <= 99) {
        var x = 400, y = 300, rX, rY, ratioX, ratioY;
        rX = radius;
        rY = radius*(1-0.01*(100-edge.value));
        ratioX = rX / rX;
        ratioY = rY / rX;
        ctx.save(); 
        ctx.scale(ratioX,ratioY);
        ctx.beginPath();
        ctx.arc(x/ratioX,y/ratioY,rX,rY,0,Math.PI*2,false);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        paint_path(x,y);
    }
    
    if(edge.value <= 79 && edge.value >= 4) {
        var x = 400, y = 300;
        var vertices = getPolygonVertices(edge.value, radius); 
        ctx.save();
        ctx.beginPath();
        ctx.translate(canvas.width / 2, canvas.height / 2);  
        ctx.moveTo(vertices[0][0], vertices[0][1]);  
    
        for (var i = 1; i < vertices.length; i++) {  
            ctx.lineTo(vertices[i][0], vertices[i][1]);  
        }  
        ctx.closePath();
        ctx.stroke();  
        ctx.restore();
        paint_path(x,y);
    }   
}

function getPolygonVertices (edges, r) {  
    var ca = 0, aiv = 360 / edges, list = new Array();  
    for (var k = 0; k < edges; k++) {  
        var x = Math.cos(ca * direction) * r,  y = Math.sin(ca * direction) * r; 
        list.push([x, y]);  
        ca += aiv;  
    }

    return list;  
}

