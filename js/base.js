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
    tabS("ul.tabTitle li", "ul.tabCommon","li");
    tabS("ul.tabTitles li", "div.caseMain", "li");
    tabS("div.tabLic a", "ul.tabMainList", "a");
    tabS("div.tabTitle a", "ul.slideMain", "a");

    //点击菜单显示tabLic
    function showMenu(showBtn,menuMain,hideBtn,menuList) {
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

    //滑出地址栏
    function addressMain() {
        var winHeiwght = $(window).height();
        var addressBtn = $(".addressBtn");
        var bg = $(".bg");
        var popAddress = $(".popAddress");
        addressBtn.bind("click", function () {
            bg.height(winHeiwght).css({
                display:"block",
                background: "rgba(0,0,0,0.15)",
                top: $(window).scrollTop()
            });
            popAddress.show(200);
            $("body").eq(0).css("overflow", "hidden");
            $("body").bind("touchmove", function (event) {
                event.preventDefault;
            }, false);
            var reset = $(".reset");
            var submit = $(".submit");
            reset.click(function () {
                bg.css("display", "none");
                $("body").unbind("touchmove");
                $("body").eq(0).css("overflow", "auto");
            });
            submit.click(function () {
                bg.css("display", "none");
                $("body").unbind("touchmove");
                $("body").eq(0).css("overflow", "auto");
            });
        });
    }
    addressMain();

    //首页点击向下展开更多
    function clickDownShow() {
        var aClickMore = $("a.clickMore");
        var duibi = $("ul.duibi");
        duibi.css("height", "26rem");
        aClickMore.bind("click", function () {
            var this_s = $(this);
            if (this_s.hasClass("moreHide")) {
                this_s.removeClass("moreHide").html("展开更多案例");
                duibi.animate({
                    height: "26rem"
                }, 200);
            } else {
                this_s.addClass("moreHide").html("向上收起");
                duibi.animate({
                    height: "53rem"
                }, 200);
            }
        });
    }
    clickDownShow();
});