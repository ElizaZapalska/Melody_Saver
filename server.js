const serverUrl = "http://localhost:5000"

function downloadMelodies() {
    fetch(serverUrl + '/melodies')
        .then(data => data.json().then(
            json => appendMelodies(json)
        ))
}

function appendMelodies(data) {
    console.log(data);
    for (let melody of data) {
        newElement(melody.title, melody.melody)
    }
}

function sendMelody(title, melody) {
    fetch(serverUrl + "/melodies", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: title,
            melody: melody
        })
    })
}

function deleteMelody(title) {
    fetch(serverUrl + "/melodies", {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: title
        })
    })
}

downloadMelodies();

