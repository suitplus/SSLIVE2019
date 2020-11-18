// console.js
var live = false;

function start() {
    $.ajax({
        url: "/console/livestatus.php",
        method: "POST",
        data: {
            cmd: "start"
        },
        success: function (data) {
            if (data == "success") {
                live = true;
                $('#LiveControlButton').text("停 止 直 播").unbind("click").click(end);
                $("#LiveStatusReminder").css("visibility", "visible");
                growl.show({ text: "直播已开始！", type: "custom", imgsrc: "/src/img/growl/ok.gif", autoclose: 1000 });
            } else {
                alert(data);
            }
        }
    })
}
function logOut(){
	//登出
	$.cookie('user', "", { expires: -1, path: '/' });
	$.cookie('time', "", { expires: -1, path: '/' });
	$.cookie('token', "", { expires: -1, path: '/' });
	location.reload();
}
function end() {
    $.ajax({
        url: "/console/livestatus.php",
        method: "POST",
        data: {
            cmd: "stop"
        },
        success: function (data) {
            if (data == "success") {
                live = false;
                $("#LiveControlButton").text("开 始 直 播").unbind("click").click(start);
                $("#LiveStatusReminder").css("visibility", "hidden");
                growl.show({ text: "直播已停止！", type: "custom", imgsrc: "/src/img/growl/ok.gif", autoclose: 1000 });
            } else {
                alert(data);
            }
        }
    })
}

// 获得当前直播情况
function get() {
    $.ajax({
        url: "/console/livestatus.json",
        method: "GET",
        success: function (data) {
            var live = data.Live;//是否开播
            if (live) {
                $("#LiveStatusReminder").css("visibility", "visible");
                $('#LiveControlButton').text("停 止 直 播").unbind("click").click(end);
            } else {
                $("#LiveStatusReminder").css("visibility", "hidden");
                $("#LiveControlButton").text("开 始 直 播").unbind("click").click(start);
            }
        }
    });
}

function load() {
    setInterval(newtime, 1000);
    get();
}

$('document').ready(load);