/**
 * Created by banana.cao on 12/20/2016.
 */
/*To get the height of the current form and assign it to a div*/
// function assignHeight() {
//     $("#box").height($(window).height());
// }


/*To show and hide the sign out logo*/
var flag = true;
function showOut() {
    if (flag) {
        $("#out,#out1").fadeIn("slow");
        flag = false;
    }
    else {
        $("#out,#out1").fadeOut("slow");
        flag = true;
    }
}

/*To display the Add window and make the rest of the page can not be edited*/
function Add() {
     $("#hide").css({"display":"block"});
    $("#alert1").css({"display":"block"});

}
function closeAdd() {
    $("#hide").css({"display":"none"});
    $("#alert1").css({"display":"none"});
}

/*To Edit the data in table*/
function Edit() {
    $("#show1").css({"display":"none"});
    $("#show2").css({"display":"block"});
    $("td input").removeAttr("readonly");
    $("td input").css({
        "border": "1px solid #bbbbbb",
        "color": "#bbbbbb"

    });
}

/*To cancel edit the data in table*/
function Cancel() {
    $("#show1").css({"display":"block"});
    $("#show2").css({"display":"none"});
    $("td input").attr("readonly", "readonly");
    $("td input").css({
        "border": "none",
        "color": "#000"
    });
}

/*To delete the data in table*/

//$("#alert2").css({"display":"none"});
function Delete() {
    var alert2 = document.getElementById("alert2");
    if (alert2.style.display == "none")
        alert2.style.display = "block";
    else
        alert2.style.display = "none";
}


/*Use to change color of the left navigation bar*/
function ChangeColor1() {
    $("#dsb,#dsb1").css({"color":"white"});
    $("#dsb-a,#dsb1-a").css({"color":"white"});
    $("#um,#um1").css({"color":"#b8c7ce"});
    $("#um-a,#um1-a").css({"color":"#b8c7ce"});

}
function ChangeColor2() {
    $("#dsb,#dsb1").css({"color":"#b8c7ce"});
    $("#dsb-a,#dsb1-a").css({"color":"#b8c7ce"});
    $("#um,#um1").css({"color":"white"});
    $("#um-a,#um1-a").css({"color":"white"});
}