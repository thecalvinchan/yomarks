var settings = new Store("settings");
var username = settings.get('username');

if (username) {
    document.getElementById('sendLink').addEventListener('click', sendLink);
    document.getElementById('sendClip').addEventListener('click', sendClip);
} else {
    document.getElementById("message").innerHTML = "It seems like you haven't set your Yo username yet. Please configure YoClip with your Yo username under Chrome Extensions settings.";
}

function sendLink() {
    chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tab) {
            if (tab.length > 0) {
                $.post('http://yoclip.herokuapp.com/yo', {
                    username: settings.get('username'),
                    link: tab[0].url
                }, function(data) {
                    data = JSON.parse(data);
                    if (data.result === "OK") {
                        console.log("suckacock");
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
        console.log(input.val());
        clip = input.val();
    }
    console.log(clip);
    clip = getClipboard();
    //input.val('');
    $.post('http://yoclip.herokuapp.com/yo/clip', {
        username: settings.get('username'),
        clip: clip
    }, function(data) {
        data = JSON.parse(data);
        if (data.result === "OK") {
            document.getElementById("message").innerHTML = "Your clipboard has been sent to "+settings.get('username') ;
        }
    });
}

function getClipboard() {
    var pasteTarget = document.createElement("div");
    pasteTarget.contentEditable = true;
    var actElem = document.activeElement.appendChild(pasteTarget).parentNode;
    pasteTarget.focus();
    document.execCommand("Paste", null, null);
    var paste = pasteTarget.innerText;
    actElem.removeChild(pasteTarget);
    return paste;
};
