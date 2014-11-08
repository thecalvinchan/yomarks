var settings = new Store("settings");
var username = settings.get('username');

if (username) {
    document.getElementById('sendLink').addEventListener('click', sendLink);
    document.getElementById('sendClip').addEventListener('click', sendClip);
} else {
    document.getElementById("message").innerHTML = "It seems like you haven't set your YO username yet. Please configure YOMarq with your YO username under the Chrome Extensions settings.";
}

function sendLink() {
    chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tab) {
            if (tab.length > 0) {
                $.post('http://localhost:1337/yo', {
                    username: settings.get('username'),
                    link: tab[0].url
                }, function(data) {
                    console.log(data);
                    if (data.result === "OK") {
                        document.getElementById("message").innerHTML = "Your link has been sent to "+settings.get('username') ;
                    }
                });
            } else {
                document.getElementById("message").innerHTML = "An Error occured.";
            }
        }
    );
}

function sendClip() {
    var clip = '',
        input = $('#clip').val('').select();
    if(document.execCommand('paste')) {
        clip = input.val();
    }
    input.val('');
    $.post('http://localhost:1337/yo/clip', {
        username: settings.get('username'),
        clip: clip
    }, function(data) {
        console.log(data);
        if (data.result === "OK") {
            document.getElementById("message").innerHTML = "Your clipboard has been sent to "+settings.get('username') ;
        }
    });
}
