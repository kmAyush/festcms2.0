// Author: Hoang Tran (https://www.facebook.com/profile.php?id=100004848287494)
// Github verson (1 file .html): https://github.com/HoangTran0410/3DCarousel/blob/master/index.html

// You can change global variables here:
// var radius = 400; // how big of the radius
// var autoRotate = true; // auto rotate or not
// var rotateSpeed = -60; // unit: seconds/360 degrees
// var imgWidth = 270; // width of images (unit: px)
// var imgHeight = 250; // height of images (unit: px)
// var imgrad=25;

// // Link of background1 music - set 'null' if you dont want to play background1 music
// var bgMusicURL = null;
// var bgMusicControls = true; // Show UI music control

/*
     NOTE:
       + imgWidth, imgHeight will work for video
       + if imgWidth, imgHeight too small, play/pause button in <video> will be hidden
       + Music link are taken from: https://hoangtran0410.github.io/Visualyze-design-your-own-/?theme=HauMaster&playlist=1&song=1&background1=28
       + Custom from code in tiktok video  https://www.facebook.com/J2TEAM.ManhTuan/videos/1353367338135935/
*/

// ===================== start =======================
// animation start after 1000 miliseconds
// setTimeout(init, 1000);
var odrag1 = document.getElementsByName('arena-drag')[0]
var ospin1 = document.getElementsByName('arena-spin')[0]
var aImg1 = ospin1.getElementsByTagName('img')
var aVid1 = ospin1.getElementsByTagName('video')
var aEle1 = [...aImg1, ...aVid1] // combine 2 arrays

// Size of images
ospin1.style.width = imgWidth + 'px'
ospin1.style.height = imgHeight + 'px'

// Size of ground1 - depend on radius
var ground1 = document.getElementsByName('ground1')[0]
ground1.style.width = radius * 3 + 'px'
ground1.style.height = radius * 3 + 'px'

function init (delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform =
      'rotateY(' + i * (360 / aEle.length) + 'deg) translateZ(' + radius + 'px)'
    aEle[i].style.transition = 'transform 1s'
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + 's'
  }
  for (var i = 0; i < aEle1.length; i++) {
    aEle1[i].style.transform =
      'rotateY(' + i * (360 / aEle1.length) + 'deg) translateZ(' + radius + 'px)'
    aEle1[i].style.transition = 'transform 1s'
    aEle1[i].style.transitionDelay = delayTime || (aEle1.length - i) / 4 + 's'
  }
}

function applyTranform1 (obj) {
  // Constrain the angle of camera (between 0 and 180)
  if (tY > 180) tY = 180
  if (tY < 0) tY = 0

  // Apply the angle
  obj.style.transform = 'rotateX(' + -tY + 'deg) rotateY(' + tX + 'deg)'
}

function playSpin1 (yes) {
  ospin1.style.animationPlayState = yes ? 'running' : 'paused'
}

var sX,
  sY,
  nX,
  nY,
  desX = 0,
  desY = 0,
  tX = 0,
  tY = 10

// auto spin
if (autoRotate) {
  var animationName = rotateSpeed > 0 ? 'spin' : 'spinRevert'
  ospin1.style.animation = `${animationName} ${Math.abs(
    rotateSpeed
  )}s infinite linear`
}

// add background1 music
if (bgMusicURL) {
  document.getElementById('music-container').innerHTML += `
<audio src="${bgMusicURL}" ${
    bgMusicControls ? 'controls' : ''
  } autoplay loop>    
<p>If you are reading this, it is because your browser does not support the audio element.</p>
</audio>
`
}

// setup events
document.onpointerdown = function (e) {
  clearInterval(odrag1.timer)
  e = e || window.event
  var sX = e.clientX,
    sY = e.clientY

  this.onpointermove = function (e) {
    e = e || window.event
    var nX = e.clientX,
      nY = e.clientY
    desX = nX - sX
    desY = nY - sY
    tX += desX * 0.1
    tY += desY * 0.1
    applyTranform1(odrag1)
    sX = nX
    sY = nY
  }

  this.onpointerup = function (e) {
    odrag1.timer = setInterval(function () {
      desX *= 0.95
      desY *= 0.95
      tX += desX * 0.1
      tY += desY * 0.1
      applyTranform1(odrag1)
      playSpin1(false)
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag1.timer)
        playSpin1(true)
      }
    }, 17)
    this.onpointermove = this.onpointerup = null
  }

  return false
}

// document.onmousewheel = function(e) {
//   e = e || window.event;
//   var d = e.wheelDelta / 20 || -e.detail;
//   radius += d;
//   init(1);
// };
