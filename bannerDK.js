window.onload = function() {

    var startDK = document.getElementById("start");
    startDK.onclick = hendlerStart;
    //viev.displayTimber(2);

};

function hendlerStart() {
    var a = document.getElementById("a");
    var b = document.getElementById("b");

    controller.inputValues(a.value, b.value);
};

var controller = {

    inputValues : function(a, b) {

        var resBar = this.barValueOutput(a, b);
        viev.displayTimber(resBar);

        var resSelf = this.selfTappingValueOutput(a, b);
        viev.displaySelfTappingScrew(resSelf);
    },

    barValueOutput : function(a, b) {

        var res = 2*(Number(a) + Number(b)) + 1;

        if(a >= 2) {
            res += Number(b)*Math.floor(Number(a) - 1);
        }
        if(b >= 2) {
            res += Number(a)*Math.floor(Number(b) - 1);
        }

        if(a > 4) {
            res += (1 + Number(b))*(Math.floor(Number(a)/4));
        }

        if(b > 4) {
            res += (1 + Number(a))*(Math.floor(Number(b)/4));
        }

        

        return res;
    },

    selfTappingValueOutput : function(a, b) {
        var a = Number(a);
        var b = Number(b);
        var count;

        if ( a < 1 && b < 1) {
            count = 8;
            return count;
        }
        else {
            count = 16;
        }
        
        if(a >= b) {
            if(a >= 2) {
                count += Math.floor(Number(a) - 1)*4;
            }
            if(b >= 2) {
                count += Math.floor(Number(a))*4*Math.floor(Number(b - 1));
            }
        }
        else {
            if(b >= 2) {
                count += Math.floor(Number(b) - 1)*4;
            }
            if(a >= 2) {
                count += Math.floor(Number(b))*4;
            }
        }

        return count;

    },   

};

var viev = {

    displayTimber : function(res) {
        var timberRes = document.getElementById("timberRes");
        timberRes.innerHTML = res;
    },

    displaySelfTappingScrew : function(res) {
        var timberRes = document.getElementById("selfTappingScrewRes");
        timberRes.innerHTML = res;
    }

};


