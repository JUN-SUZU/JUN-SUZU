document.getElementById("hamBtn").addEventListener("click", function () {
    document.getElementById("hamMenu").classList.toggle("show");
});
const cv = document.getElementById("canvas");
const cvw = cv.width;
const cvh = cv.height;
function cStartMenu() {
    var ctx = cv.getContext("2d");
    ctx.font = "30px consolas";
    ctx.textAlign = "center";
    ctx.fillText("Start", cvw / 2, cvh / 2);
}
function cStart() {
    // canvasの初期化
    var ctx = cv.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
}
cStartMenu();
let flame = 1;
cv.addEventListener("click", function (event) {
    // 座標を取得
    var rect = this.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    // 座標を表示
    // alert("x座標：" + x + "\ny座標：" + y);
    if (flame == 0) cStartMenu();
    else if (flame = 1) cStart();
});