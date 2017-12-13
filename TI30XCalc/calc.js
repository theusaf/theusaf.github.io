//code for option 1
var opts = [null,null];
opts[0] = document.getElementById('opt1');
opts[1] = document.getElementById('opt2');
var inputNum = document.getElementById('rn');
var res = document.getElementById('result');
var ch = document.getElementById('type');

function ret(n,a){
    return n - a;
}

function l(n,a){
    while(n > a){
        n = ret(n,a);
    }
    return n;
}

var checkLength = function(e,l){
    if(e.length > l){
        return true;
    }else{
        return false;
    }
};

//it seems that full understanding is not yet in my mind :p
function go(){
    if(ch.value == 'Find Next Percents from Number'){
        inputNum.onchange = function(){
            if(checkLength(inputNum.value,10) === true){
                inputNum.value = 9999999999;
            }
            
            res.value = "";
            var rep = document.getElementById('re');
            var a = Math.pow(2,31) - 85; //loop around number
            var ap = NaN; //unknown start loop number?
            var val = Math.abs(Number(inputNum.value));
            var div = 53668.30516818;
            
            //change to setInterval instead later on, due to the fact that computers cannot handle 10 trillion scripts running at once....
            var j = 0;
            var m = setInterval(function(){
                if(j !== 0){
                    val = val * 40014;
                }
                if(val <= a){
                    res.value = res.value + "\n" + Number(Number(val / div) - Math.floor(val/div)).toFixed(5);
                }else{
                    var n = val;
                    n = l(n,a);
                    val = n;
                    console.log(n);
                    res.value = res.value + "\n" + Number(Number(n / div) - Math.floor(n/div)).toFixed(5);
                }
                j = j + 1;
                if(j == Number(rep.value)){
                    clearInterval(m);
                }
            },1
            );
            res.value = res.value.replace(/\n/,"");
        };
    }
}

window.onload = go;
ch.onchange = go;