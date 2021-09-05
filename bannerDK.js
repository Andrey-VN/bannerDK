window.onload = function() {

    var startDK = document.getElementById("start");
    startDK.onclick = hendlerStart;

};

function hendlerStart() {
    controller.startController();
};

var controller = {

    sectionSizeX : 0,
    sectionSizeY : 0,

    startController : function(){
        var a = document.getElementById("a");
        var b = document.getElementById("b");

        a = Number(a.value);
        b = Number(b.value);

        if(this.isZero(a, b)) {
            viev.displayNone();
            alert("Введенное поле не может быть отрицательным значением или нулем");
            return;
        }

        var x = document.getElementById("x");
        var y = document.getElementById("y");

        x = Number(x.value);
        y = Number(y.value);

        if(this.isZero(x, y)) {
            viev.displayNone();
            alert("Введенное поле не может быть отрицательным значением или нулем");
            return;
        }

        this.sectionSizeX = x*0.001;
        this.sectionSizeY = y*0.001;

        this.inputValues(a, b);
        this.valueYXZero();
    },

    isZero : function(a, b){
        if(a <= 0 || b <= 0){
            return true
        }
        return false;
    },

    inputValues : function(a, b) {
        var resBar = this.calculationOfTimber(a, b);
        viev.displayTimber(resBar);

        var resSelf = this.calculationOfSelfTappingScrews(a, b);
        viev.displaySelfTappingScrew(resSelf);
        viev.displayDrillingAHoleInWood(resSelf);
        viev. displaySelfTappingWoodFastening(resSelf);

        var resStapler = this.calculationOfStaples(a, b);
        viev.displayStaplers(resStapler);

        var resSelfForInstallation = this.calculationOfSelfTappingScrewsForInstallation(a, b);
        viev.displaySelfTappingScrewForInstallation(resSelfForInstallation);
        viev.displayMountingDowelSelfTappingScrew(resSelfForInstallation);

        var resTheCutOfTheBar = this.calculateTheCutOfTheBar(a, b);
        viev.displayCuttingOfABar(resTheCutOfTheBar);

        var resOfStapling = this.calculationOfStapling(a, b);
        viev.displayStapling(resOfStapling);

        var resPrintingOnABannerForDk = this.calculationOfPrintingOnABannerForDk(a, b);
        viev.displayPrintOnBannerForDk(resPrintingOnABannerForDk);
    },

    valueYXZero : function() {
        this.sectionSizeX = 0;
        this.sectionSizeX = 0;
    },

    roundToThousandths : function(res) {
        return Math.floor(res*1000)/1000;
    },

    calculationOfPrintingOnABannerForDk : function(a, b) {
        var res = a == 0 || b == 0 ? 0 : this.roundToThousandths((a + 2*(this.sectionSizeX + this.sectionSizeY))*
        (b + 2*(this.sectionSizeX + this.sectionSizeY)));  
        return res;
    },

    calculationOfStapling : function(a, b) {
        return 2*(a + b);
    },

    calculateTheCutOfTheBar : function(a, b) {
        var count;
        
        if ( a < 1 && b < 1) {
            count = a == 0 || b == 0 ? 0 : 8;
            return count;
        }
        else {
            count = 12;
        }
        
        if(a >= b) {
            count += Math.floor(b - 1) + Math.floor(b)*Math.floor(a - 1);          
        }
        else {
            count += Math.floor(a - 1) + Math.floor(a)*Math.floor(b - 1);
        }
        count += 12*(Math.ceil(a/4) - 1)*(Math.ceil(b/4)); //12 резов
        count -= (Math.ceil(a/4) - 1)*Math.floor(b)*(Math.ceil(b/4)); //
        count += (Math.ceil(a/4) - 1)*Math.floor(b - 1)*(Math.ceil(b/4));
        if(Math.ceil(b/4) >= 2){
            count += 11*(Math.ceil(b/4) - 1);  //подогнал
        }

        return  this.roundToThousandths(count*2*(this.sectionSizeY + this.sectionSizeX));
    },   

    calculationOfSelfTappingScrewsForInstallation : function(a, b) {
        var res = 0;
     
        res +=Math.floor(a + 1)*(Math.ceil(b/4))*2;
        res +=Math.floor(b - 1)*Math.ceil(a/4)*2;

        if(b/4 >= 1){
            res -= 2*(Math.ceil(b/4) - 1);
        }
        if(a/4 >= 1){
            res += 2*(Math.ceil(a/4) - 1);
        }
        
        return this.roundToThousandths(res);
    },

    calculationOfStaples : function(a, b) {
        var value = (2*(a + b)/0.05)*0.001
        return this.roundToThousandths(value);
    },

    calculationOfTimber : function(a, b) {
        var res = 2*(a + b);

        if ( a < 1 && b < 1) { 
            res = a == 0 || b == 0 ? 0 : 8;         
            return res;
        }
        if(a >= 2) {
            res += b*Math.floor(a - 1);
        }
        if(b >= 2) {
            res += a*Math.floor(b - 1);
        }

        res += b*(Math.ceil(a/4) - 1);
        res += (Math.ceil(b/4))*(Math.ceil(a/4) - 1);
        res += (Math.ceil(b/4));
        res += a*(Math.ceil(b/4) - 1);

        return this.roundToThousandths(res);
    },

    calculationOfSelfTappingScrews : function(a, b) {
        var count;

        if ( a < 1 && b < 1) {
            count = a == 0 || b == 0 ? 0 : 8;
            return count;
        }
        else {
            count = 16;
        }
        
        if(a >= b) {
            count += Math.floor(b - 1)*4 + Math.floor(b)*4*Math.floor(a - 1);          
        }
        else {
            count += Math.floor(a - 1)*4 + Math.floor(a)*4*Math.floor(b - 1);
        }

        count += 16*(Math.ceil(a/4) - 1)*(Math.ceil(b/4)); 
        count -= 4*(Math.ceil(a/4) - 1)*Math.floor(b)*(Math.ceil(b/4));
        count += 4*(Math.ceil(a/4) - 1)*Math.floor(b - 1)*(Math.ceil(b/4));

        if(Math.ceil(b/4) >= 2){
            count += 12*(Math.ceil(b/4) - 1);  //подогнал
        }

        return  this.roundToThousandths(count);
    },

};

var viev = {
    
    displayNone: function(){
        var tagOutput = document.getElementsByTagName("output");
        for(var i = 0; i < tagOutput.length; i++) {
            tagOutput[i].innerHTML = null;
        }
    },

    displayTimber : function(res) {
        var timberRes = document.getElementById("timberRes");
        timberRes.innerHTML = res;
    },

    displaySelfTappingScrew : function(res) {
        var timberRes = document.getElementById("selfTappingScrewRes");
        timberRes.innerHTML = res;
    },

    displayStaplers : function(res) {
        var timberRes = document.getElementById("staples");
        timberRes.innerHTML = res;
    },

    displaySelfTappingScrewForInstallation : function(res) {
        var timberRes = document.getElementById("selfTappingScrewForMounting");
        timberRes.innerHTML = res;
    },

    displayCuttingOfABar : function(res) {
        var timberRes = document.getElementById("cuttingOfABar");
        timberRes.innerHTML = res;
    },

    displayDrillingAHoleInWood : function(res) {
        var timberRes = document.getElementById("drillingAHoleInWood");
        timberRes.innerHTML = res;
    },

    displaySelfTappingWoodFastening : function(res) {
        var timberRes = document.getElementById("selfTappingWoodFastening");
        timberRes.innerHTML = res;
    },

    displayStapling : function(res) {
        var timberRes = document.getElementById("stapling");
        timberRes.innerHTML = res;
    },

    displayMountingDowelSelfTappingScrew : function(res) {
        var timberRes = document.getElementById("mountingDowelSelfTappingScrew");
        timberRes.innerHTML = res;
    },

    displayPrintOnBannerForDk : function(res) {
        var timberRes = document.getElementById("bannerPrinting");
        timberRes.innerHTML = res;
    }
    
};


