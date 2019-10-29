'use strict';

// 视频/音频采集配置
const mediaStreamContrains = {
    video: true
    // // 视频
    // video: {
    //     // 最小帧率：20帧/每秒
    //     frameRate: { min: 20 },
    //     // 宽度最小640，理想宽度1280
    //     width: { min: 640, ideal: 1280 },
    //     // 高度最小360，理想高度720
    //     height: { min: 360, ideal: 720 },
    //     // 宽高比
    //     aspectRatio: 16 / 9
    // },
    // // 音频
    // audio: {
    //     // 回音消除
    //     echoCancellation: true,
    //     // 降噪
    //     noiseSuppression: true,
    //     // 自动增益
    //     autoGainControl: true
    // }
};

const localVideo = document.querySelector("video");

function gotLocalMediaStream(mediaStream) {
    localVideo.srcObject = mediaStream;
}

function handleLocalMediaStreamError(error) {
    console.log("navigator.getUserMedia error:", error);
}

navigator.mediaDevices.getUserMedia(mediaStreamContrains)
    .then(gotLocalMediaStream)
    .catch(handleLocalMediaStreamError);