/**
 * Created by Administrator on 2016/12/18.
 */
$(function () {


  $('#myTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
  $('#myTestarea').val('<iframe src="https://modao.cc/app/LqI0k5i9pwwXs4tgKvk2qldsKl6zo6U/embed" width="1104" height="848" allowTransparency="true" frameborder="0"></iframe>')
      .focus(function () {
        this.select();
      });
  $(":text").focus(function () {
    this.select();
  });


  $("#close-btn").click(function () {
    $("#rig-close-page").css({width: 0});
  });
  $("#close-page-nav div span").parent().click(function () {
    $(this).css({color: "#f75b50"}).siblings().css({color: "#636a74"});
  });


  $('#mySpy ul li').eq(1).click(function () {
    console.log($("#rig-close-page").css("width"));
    if ($("#rig-close-page").css("width") == "320px"){
      $("#rig-close-page").css({width: 0});
    }else{
      $("#rig-close-page").css({width: 320});
    }
  });
  $('#mySpy').tooltip("hide");
});