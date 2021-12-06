$(document).ready(function () {
  console.log("notification js");
  //display success and error notification notifications on home page
  function sendNotification(message, notificationType) {
    new Noty({
      theme: "relax",
      text: message,
      type: notificationType,
      layout: "topCenter",
      timeout: 2000,
    }).show();
  }

  if (document.getElementById("Snotification")) {
    sendNotification(
      document.getElementById("Snotification").innerText,
      "success"
    );
  }

  if (document.getElementById("errorNotification")) {
    sendNotification(
      document.getElementById("errorNotification").innerText,
      "warning"
    );
  }
});
