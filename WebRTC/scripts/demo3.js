'use strict';

// 获取Video标签
let videoplay = document.querySelector("video#player");
// 获取Canvas标签
let elePicture = document.querySelector("canvas#picture");
elePicture.width = 640;
elePicture.height = 480;
// 获取滤镜选择框
let eleSelectFilter = document.querySelector("select#filter");

// 播放视频流
function gotMediaStream(stream) {
    videoplay.srcObject = stream;
}

// 错误处理
function handleError(error) {
    console.log('getUserMedia error:', error);
}

function start() {
    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia is not supported!");
    } else {
        // 采集配置
        let constraints = {
            video: { width: 640, height: 480, frameRate: 15 },
            audio: false
        }

        // 采集音视频数据流
        navigator.mediaDevices.getUserMedia(constraints)
            .then(gotMediaStream)
            .catch(handleError);
    }
}

// 执行下载文件
function download(url) {
    let oa = document.createElement("a");
    oa.download = "photo";
    oa.href = url;

    document.body.appendChild(oa);
    oa.click();
    oa.remove();
}

// switch filter
eleSelectFilter.onchange = function(){
    videoplay.className = this.value;
}

// take picture
document.querySelector("button#takePicture").onclick = function () {
    elePicture.className = eleSelectFilter.value;
    elePicture.getContext("2d").drawImage(videoplay, 0, 0, elePicture.width, elePicture.height);
};

// Download picture
document.querySelector("button#downloadPicture").onclick = function () {
    download(elePicture.toDataURL("image/jpeg"));
}

// 初始化调用摄像头
start();