//浏览器检查
(function () {
    window.sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var attr;
    (attr = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = attr[1] : //火狐浏览器
	(attr = ua.match(/msie ([\d.]+)/)) ? sys.msie = attr[1] : //IE浏览器
	(attr = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = attr[1] : //谷歌浏览器
	(attr = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = attr[1] : //opera浏览器
	(attr = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = attr[1] : "无法检测该浏览器版本！";  //苹果浏览器
    if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1]; //判断是webkit内核浏览器
})()
//跨浏览器添加事件绑定
function addEvent(obj, type, fn) {
    if (typeof obj.addEventListener != "undefined") {  //W3C
        obj.addEventListener(type, fn, false);
    } else {     //IE
        //创建一个存放事件的哈希表（散列表）
        if (!obj.events) obj.events = {};

        //第一次执行事件的时候执行
        if (!obj.events[type]) {
            //创建一个存放事件处理函数的数组
            obj.events[type] = [];
            //把第一次的事件处理函数先储存到第一个位置上
            if (obj["on" + type]) obj.events[type][0] = fn;
        } else {
            //同一个注册函数进行屏蔽，不添加到计数器里;   解决相同函数的重复问题
            if (addEvent.equal(obj.events[type], fn)) return false;
        }

        //第二次使用事件计算器来存储
        obj.events[type][addEvent.ID++] = fn;

        //执行事件处理函数
        obj["on" + type] = addEvent.exec;
    }
}
//为每个事件分配一个计算器
addEvent.ID = 1;

//执行事件处理函数
addEvent.exec = function (event) {   //解决IE下this和event的使用问题
    var e = event || addEvent.fixEvent(window.event);  //此处调用配对后的IE中的event事件
    var es = this.events[e.type]
    for (var i in es) {
        es[i].call(this, e);
    }
}

//屏蔽同一事件处理函数
addEvent.equal = function (es, fn) {
    for (var i in es) {
        if (es[i] == fn) return true;
    }
    return false;
}

//把IE常用的Event对象配对到W3C中去
addEvent.fixEvent = function (event) {
    event.preventDefault = addEvent.fixEvent.preventDefault;   //阻止默认行为，W3C下用的是preventDefault()阻止默认行为，在IE下用的是returnValue = false;阻止默认行为
    event.stopPropagation = addEvent.fixEvent.stopPropagation;   //阻止冒泡，W3C下用的是stopPropagation()阻止冒泡，在IE下用的是cancelBubble = true;阻止冒泡
    event.target = event.srcElement;  //获取事件对象
    return event;
}

//IE阻止默认行为
addEvent.fixEvent.preventDefault = function () {
    this.returnValue = false;
}

//IE阻止冒泡
addEvent.fixEvent.stopPropagation = function () {
    this.cancelBubble = true;
}

//跨浏览器删除事件
function removeEvent(obj, type, fn) {
    if (typeof obj.removeEventListener != "undefined") {
        obj.removeEventListener(type, fn, false);
    } else {
        if (obj.events) {  //解决IE下不能选中文本框内容
            for (var i in obj.events[type]) {
                if (obj.events[type][i] == fn) {
                    delete obj.events[type][i];
                }
            }
        }
    }
}
//综合跨浏览器，现代DOM加载事件
function addDomLoaded(fn) {
    var isReady = false;
    var timer = null;
    function doReady(fn) {
        if (timer) clearInterval(timer);
        if (isReady) return;
        isReady = true;
        fn();
    }
    //首先判断非主流浏览器
    if ((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)) {
        timer = setInterval(function () { //在图片加载之前就执行
            if (document && document.getElementById && document.getElementsByTagName && document.body) {
                doReady(fn);
            }
        }, 1);
    }
        //然后是判断W3C标准以及IE9以上的DOM加载事件
    else if (document.addEventListener) {
        addEvent(document, "DOMContentLoaded", function () {  //添加事件方式添加现代加载事件
            fn();
            removeEvent(document, "DOMContentLoaded", arguments.callee);
        });
    }
        //IE6、7、8下的DOM加载事件
    else if (sys.ie && sys.ie < 9) {
        var timer = null;
        timer = setInterval(function () {
            try {
                document.documentElement.doScroll("left");//IE采用doScroll方法实现现代加载事件
                fn();
            } catch (e) {

            }
        });
    }
}