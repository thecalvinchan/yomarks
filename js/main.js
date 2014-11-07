var settings = new Store("settings");
var username = settings.get('username');

if (username) {
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
} else {
    document.getElementById("message").innerHTML = "It seems like you haven't set your YO username yet. Please configure YOMarq with your YO username under the Chrome Extensions settings.";
}
