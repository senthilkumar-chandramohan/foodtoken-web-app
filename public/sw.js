self.addEventListener('push', function(event) {
    if (event.data) {
      // Retrieve the push notification payload as a JSON object
      const payload = event.data.json();
  
      // Extract the relevant data from the payload
      const title = payload.title;
      const body = payload.body;
      const icon = payload.icon;
  
      // Display the notification to the user
      event.waitUntil(self.registration.showNotification(title, {
        body: body,
        icon: icon
      }));

      window.speechSynthesis.speak(new SpeechSynthesisUtterance(title));
    }
  });
  