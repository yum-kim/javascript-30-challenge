//* 구현할 것
// 재생/일시정지 버튼 클릭 시 비디오 재생/정지 이벤트,
// 클릭하는 위치에 따라 비디오의 재생시점 조절,
// 버튼 클릭 시 재생시점 10초 전, 25초 뒤로 이동시키기,
// 현재 재생된 정도에 따라 progress__filled에 나타내기(1/10)

let video = document.querySelector(".viewer");
let playBtn = document.querySelector("#playBtn");

// 1) 재생, 일시정지 버튼 클릭 시 영상 재생/정지 시키기
playBtn.addEventListener("click", control);

function control() {
    let hasToggle = playBtn.classList.contains("toggle");

    if(!hasToggle) {
        PauseVideo();
    } else {
        playVideo();
    }
}

function playVideo() {
    playBtn.classList.remove("toggle");
    video.play();
    playBtn.textContent = "pause";

    setInterval(() => {
        updateProgress();
    }, 1000);
}

function PauseVideo() {
    playBtn.classList.add("toggle");
    video.pause();
    playBtn.textContent = "►";
}

//2) 드래그 후 마우스를 놓거나/클릭했을 때 progressBar 움직이게하기 + 재생시점 조절하기
let progressBar = document.querySelector(".progress");
let progressFill = document.querySelector(".progress__filled");

progressBar.addEventListener("click", movePlaypoint);

function movePlaypoint(e) {

    //1. 클릭한 지점이 전체중에 어느 시점인지 확인
    let progress = e.pageX / progressBar.clientWidth;
    let progressPercent = Math.floor(progress * 100);

    progressFill.style.flexBasis = `${progressPercent}%`

    //2. 비디오 전체 재생시간 중 progress% 만큼 재생시점 이동
    video.currentTime = video.duration * progress;
    
}

// 3) 버튼 클릭 시 재생시점 10초 전, 25초 뒤로 이동시키기
let skipBtns = document.querySelectorAll(".skipBtn");
let nextBtn = document.querySelector(".nextBtn");

skipBtns.forEach((btn) => {
    btn.addEventListener("click", skipVideo);
})

function skipVideo(e) {
    console.log(e.target)

    if (e.target.dataset.skip == "-10") {
        video.currentTime = video.currentTime - 10;
    } else {
        video.currentTime = video.currentTime + 25;
    }

    console.log(video.currentTime)
}

//4) 재생되는동안 progressbar도 함께 움직이며 현재 재생시점 보여주기
function updateProgress() {
    let progress = video.currentTime / video.duration;
    let progressPercent = progress * 100;
        
    progressFill.style.flexBasis = `${progressPercent}%`
    
    console.log(progressPercent);
}
