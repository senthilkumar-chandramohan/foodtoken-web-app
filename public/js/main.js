// Get a reference to the "Allow Notifications" button
const allowNotificationsBtn = document.getElementById('allow-notifications-btn');

// Add a click event listener to the button
allowNotificationsBtn.addEventListener('click', () => {
    allowNotificationsBtn.style.display="none";
    Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
            console.log('Push notifications are allowed');
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker.register("/sw.js").then(async (registration) => {
                    const SERVER_URL = "https://foodtoken-server-app-755765b3520f.herokuapp.com";
                    console.log("SW Registered!");
                    console.log(registration);
        
                    let sw = await navigator.serviceWorker.ready;
                    console.log("sw", sw);

                    const accountID = window.localStorage.getItem('accountID');
                    const response = await fetch(`${SERVER_URL}/get-app-server-key?accountID=${accountID}`);
                    const data = await response.json();
                    const { publicKey } = data;
                    console.log(publicKey);

                    let sub = await sw.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: publicKey,
                    });
                    console.log("sub", sub);
        
                    fetch(`${SERVER_URL}/add-subscription?accountID=${accountID}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(sub.toJSON()),
                    }).then((response) => {
                        console.log(response);
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch(error => {
                    console.log("SW registration failed!!!!");
                    console.log(error);
                })
            } else {
                console.log("Please upgrade browser!");
            }
        } else {
          console.log('Push notifications are not allowed');
        }
    });
});