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

function k(){
    if(checkLength(inputNum.value,10) === true){
                inputNum.value = 9999999999;
            }
                    
                    res.value = "";
                    var rep = document.getElementById('re');
                    var start = document.getElementById('st');
                    var end = document.getElementById('ed');
                    
                    var sn = Number(start.value);
                    var en = Number(end.value);
                    var a = Math.pow(2,31) - 85; //loop around number
                    var val = Math.abs(Number(inputNum.value));
                    var div = 53668.30516818;
                    var useOpt = false;
                    if(start.value !== '' || end.value !== ''){
                        if(start.value === ''){
                            start.value = 0;
                        }
                        if(end.value === ''){
                            end.value = 0;
                        }
                        useOpt = true;
                        console.log('using alt');
                    }
                    
                    var j = 0;
                    var m = setInterval(function(){
                        var str = "\n";
                        if(j === 0){
                            str = "";
                        }
                        if(j !== 0){
                            val = val * 40014;
                        }
                        if(val <= a){
                            if(useOpt === true){
                                res.value = res.value + str + Math.round(Number((Number((val / div) - Math.floor(val/div)) * (en - sn)) + sn));
                            }else{
                                res.value = res.value + str + Number(Number(val / div) - Math.floor(val/div)).toFixed(5);
                            }
                        }else{
                            var n = val;
                            n = l(n,a);
                            val = n;
                            if(useOpt === true){
                                res.value = res.value + str + Math.round(Number((Number((n / div) - Math.floor(n/div)) * (en - sn)) + sn));
                            }else{
                                res.value = res.value + str + Number(Number(n / div) - Math.floor(n/div)).toFixed(5);
                            }
                        }
                        j = j + 1;
                        if(j == Number(rep.value)){
                    clearInterval(m);
                }
                    },1);
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
        var hasChange = false;
        inputNum.onchange = inputNum.onkeydown =  function(e){
            hasChange = false;
            if(e.type == 'change' || (e.type = 'keydown' && e.keyCode == 13)){
                var t = e.type;
                var o = setTimeout(
                function(){
                    hasChange = false;
                }
                ,20);
                
                if(t == 'change'){
                    hasChange = true;
                    clearTimeout(o);
                    k();
                }
                if(t == 'keydown'){
                    setTimeout(
                    function(){
                        if(hasChange == true){
                            console.log('nope');
                        }else{
                            k();
                        }
                    },10)
                }
            }
        };
    }
}

window.onload = go;
ch.onchange = go;