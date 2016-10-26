$(document).ready(function () {
    //选项卡
    function tabS(clickBtn,showMain,siblingsC) {
        var abstractMenuA = $(clickBtn);
        var MTextOne = $(showMain);
        abstractMenuA.bind("click", function () {
            var this_ = $(this);
            if (this_.hasClass("on")) {
                MTextOne.eq(abstractMenuA.index(this)).show().siblings().hide();
            } else {
                this_.addClass("on").siblings(siblingsC).removeClass("on");
                MTextOne.eq(abstractMenuA.index(this)).show().siblings().hide();
            }
        });
    }
    tabS("ul.sixMainT li", "ul.sixListMainO", "li");

    //点击菜单显示tabLic
    function showMenu(showBtn, menuMain, hideBtn, menuList) {
        var winHeiwght = $(window).height();
        var menuMain = $(menuMain); //菜单主体
        var menuBtn = $(showBtn);  //菜单触发按钮
        var close = $(hideBtn); //菜单关闭按钮
        menuBtn.bind("click", function () {
            menuMain.height(winHeiwght).show(200);
            $("body").eq(0).css("overflow", "hidden");
            $("body").bind("touchmove", function (event) {
                event.preventDefault;
            }, false);
            close.click(function () {
                hideMenu(200);
            });
            var menuListLi = $(menuList).children("li");
            menuListLi.click(function () {
                hideMenu(0);
            });
        });
        function hideMenu(time) {
            menuMain.height(winHeiwght).hide(time);
            $("body").unbind("touchmove");
            $("body").eq(0).css("overflow", "auto");
        }
    }
    showMenu("a.menuBtn", ".menuMain", "a.close", ".menuList");

    //头像选中
    function shoosePic() {
        var picList = $(".picList");
        picList.children("li").click(function () {
            var this_ = $(this);
            if (this_.hasClass("on")) {
                this_.removeClass("on");
            } else {
                this_.addClass("on").siblings("li").removeClass("on");
            }
        });
    }
    shoosePic();

    //反馈成功弹窗
    function succesPop() {
        var tijiaos = $(".tijiaos");
        var winHEI = $(window).height();
        tijiaos.click(function () {
            $(".fkResultM").css({
                top:$(window).scrollTop(),
                display:"block",
                height:winHEI
            });
            $(".fkResult").animate({
                top:"30%",
                opacity:1
            }, 500);
            $("body").eq(0).css("overflow", "hidden");
            $("body").bind("touchmove", function (event) {
                event.preventDefault;
            }, false);
            $(".cjBtn").children("a").click(function () {
                $(".fkResultM").css("display", "none");
                $(".fkResult").animate({
                    top: "-100%",
                    opacity: 0
                }, 500);
                $("body").unbind("touchmove");
                $("body").eq(0).css("overflow", "auto");
            });
        });
    }
    succesPop();
});