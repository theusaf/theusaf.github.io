//website js
//alert("test");
window.onload = function(){
    var color = "";
    var r = 0;
    var g = 0;
    var b = 0;
    var bo = document.getElementById("body");
    var hi = setInterval(function(){
        //red first
        if(g === 0 && b === 0 && r !== 255){
            r += 1;
        }else{
            //yellow
            if(r === 255 && b === 0 && g !== 255){
                g += 1;
            }else{
                //green
                if(g === 255 && r >= 1 && b === 0){
                    r -= 1;
                }else{
                //blue
                if(g >= 1 && r === 0){
                    g -= 1;
                    b += 1;
                    }else{
                        if(b === 255){
                            b = 0;
                            g = 0;
                            r = 0;
                        }
                    }
                }
            }
        }
        console.log(r);
        console.log(g);
        console.log(b);
        color = "rgb(" + r + "," + g + "," + b + ")";
        bo.style.background = color;
    },10);
};