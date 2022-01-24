function initializeKeys() {
  let melodyBox = document.getElementById("melody-text");
  let keys = document.getElementsByClassName("key");
  for (let i = 0; i < keys.length; i++) {
    let key = keys.item(i);
    let sound = document.getElementById(key.getAttribute("sound"));
    key.onmousedown = function () {
      key.classList.add('key-active');

      const startButton = document.getElementById('start-recording');
      if (!startButton.classList.contains('stop')) {
        console.log('nothing')
      } else {
        melodyBox.value += key.innerText + " ";
        key.onmouseup = function () {
          key.classList.remove('key-active');
          sound.pause();
          sound.currentTime = 0;
        }
      }
      sound.play();
    }
    key.onmouseup = function () {
      key.classList.remove('key-active');
      sound.pause()
      sound.currentTime = 0;
    }
  }
}

function initializeRecordingButton() {
  let button = document.getElementById("start-recording");
  button.onclick = function () {
    let state = button.getAttribute("state")
    if (state === "recording") {
      button.setAttribute("state", "not-recording")
      button.classList.remove("stop");
      button.innerText = "START";
      melodieTextRecordingModeOFF()

    } else {
      button.setAttribute("state", "recording");
      button.classList.add("stop");
      button.innerText = "STOP";
      melodieTextRecordingModeOn()
    }
  }
}

function melodieTextRecordingModeOn() {
  document.getElementById('melody-text').classList.remove('stopRecording')
  document.getElementById('melody-text').classList.add('startRecording')
}

function melodieTextRecordingModeOFF() {
  document.getElementById('melody-text').classList.remove('startRecording')
  document.getElementById('melody-text').classList.add('stopRecording')
}

function newLineOnEnter(event) {
    if (event.keyCode == 13) {
      console.log("Enter key is pressed");
      document.getElementById('melody-text').innerText += "\n";
    }
}

initializeKeys();
initializeRecordingButton();
