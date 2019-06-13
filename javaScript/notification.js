Notification.requestPermission(function(result) {
  if(result === 'granted') {
    console.log("通知が許可されています");
  }
  );
}
