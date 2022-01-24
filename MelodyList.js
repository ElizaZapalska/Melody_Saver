function createRemoveButtons() {
    const myNodelist = document.getElementsByTagName("LI");
    let i;
    for (i = 0; i < myNodelist.length; i++) {
        let span = document.createElement("SPAN");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }
}

function removeItemOnClick() {
    let close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;
            div.style.display = "none";
            deleteMelody(div["title"])
        }
    }
}

function  setTitleAndMelodyFieldOnClick() {
    const list = document.querySelector('ul');

    list.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
            console.log(ev.target.title);
            console.log(ev.target.getAttribute('melody'));
            document.getElementById('melody-title').value = ev.target.title;
            document.getElementById('melody-text').value = ev.target.getAttribute('melody');
        }
    }, false);
}

// Create a "download" button and append it to each list item
function createDownloadButtons() {
    const myNodelist = document.getElementsByTagName("LI");
    let i;
    for (i = 0; i < myNodelist.length; i++) {
        let span = document.createElement("A");
        let txt = document.createTextNode("\u2193");
        span.className = "download";
        span.appendChild(txt);

        myNodelist[i].appendChild(span);
        downloadFile(span, span.parentElement.getAttribute("title"), span.parentElement.getAttribute("title") + "\n\n" + span.parentElement.getAttribute("melody"));
    }
}


function downloadFile(element, filename, text) {
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
}

function newElementFromLi() {
    const inputValueTitle = document.getElementById("melody-title").value;
    const inputValueMelody = document.getElementById("melody-text").value;
    newElement(inputValueTitle, inputValueMelody)
}

function newElement(inputValueTitle, inputValueMelody) {
    melodieTextRecordingModeClear();
    let li = document.createElement("li");
    let t = document.createTextNode(inputValueTitle);
    li.appendChild(t);
    if (inputValueTitle === '' || inputValueMelody === '') {
        alert("Title and melody text shouldn't be empty");
    } else {
        document.getElementById("myUL").appendChild(li);
        li.setAttribute("melody", inputValueMelody);
        li.setAttribute("title", inputValueTitle);
        sendMelody(inputValueTitle, inputValueMelody)
    }

    document.getElementById("melody-title").value = "";
    document.getElementById("melody-text").value = "";

    let span2 = document.createElement("SPAN");
    let txt2 = document.createTextNode("\u00D7");
    span2.className = "close";
    span2.appendChild(txt2);
    li.appendChild(span2);

    let span = document.createElement("A");
    let txt = document.createTextNode("\u2193");
    span.className = "download";
    span.appendChild(txt);
    li.appendChild(span);
    downloadFile(span, inputValueTitle, inputValueTitle + "\n\n"+ inputValueMelody);

    removeItemOnClick()

}

function melodieTextRecordingModeClear() {
    document.getElementById('melody-text').classList.remove('startRecording', 'stopRecording')
    document.getElementById('start-recording').setAttribute('class', 'button-recording');
    document.getElementById('start-recording').innerText = "START";
}


createRemoveButtons()
removeItemOnClick()
createDownloadButtons()
setTitleAndMelodyFieldOnClick()
