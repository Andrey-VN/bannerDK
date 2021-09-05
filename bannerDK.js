window.onload = function() {

    var startDK = document.getElementById("start");
    startDK.onclick = hendlerStart;

};

function hendlerStart() {

    var a = document.getElementById("a");
    var b = document.getElementById("b");

    a = Number(a.value);
    b = Number(b.value);

    var x = document.getElementById("x");
    var y = document.getElementById("y");

    controller.sectionSizeX = Number(x.value)*0.001;
    controller.sectionSizeY = Number(y.value)*0.001;

    controller.inputValues(a, b);
    controller.valueYXZero();

};

var controller = {

    sectionSizeX : 0,
    sectionSizeY : 0,

    valueYXZero : function() {
        this.sectionSizeX = 0;
        this.sectionSizeX = 0;
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

    calculationOfPrintingOnABannerForDk : function(a, b) {
        return (a + 2*(this.sectionSizeX + this.sectionSizeY))*
        (b + 2*(this.sectionSizeX + this.sectionSizeY));
    },

    calculationOfStapling : function(a, b) {
        return 2*(a + b);
    },

    calculateTheCutOfTheBar : function(a, b) {
        var count;
        
        if ( a < 1 && b < 1) {
            count = 4;
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

        return  count*2*(this.sectionSizeY + this.sectionSizeX);
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
        
        return res;
    },

    calculationOfStaples : function(a, b) {
        var value = (2*(a + b)/0.05)*0.001
        return value;
    },

    calculationOfTimber : function(a, b) {
        var res = 2*(a + b);

        if ( a < 1 && b < 1) {           
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

        return res;
    },

    calculationOfSelfTappingScrews : function(a, b) {
        var count;

        if ( a < 1 && b < 1) {
            count = 8;
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

        return  count;
    }   

};

var viev = {

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


