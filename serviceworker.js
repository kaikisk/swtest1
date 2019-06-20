var ORIGIN = location.protocol + '//' + location.hostname + '/hhswa';
var STATIC_CACHE_NAME = 'static_v1';
console.log('ORIGIN : ' + ORIGIN);
var STATIC_FILES = [
    ORIGIN + '/',
    ORIGIN + '/appointment.html',
    ORIGIN + '/checkAppointment.html',
    ORIGIN + '/checkResult.html',
    ORIGIN + '/clinicalData.html',
    ORIGIN + '/editMyData.html',
    ORIGIN + '/menu.html',
    ORIGIN + '/myData.html',
    ORIGIN + '/newlogin.html',
    ORIGIN + '/result.html',
    ORIGIN + '/index.html',
    ORIGIN + '/ratchet.min.css',
    ORIGIN + '/main.css',
    ORIGIN + '/temp.txt',
    ORIGIN + '/Image/shikkan1.png',
    ORIGIN + '/Image/sikkan2.png',
    ORIGIN + '/Image/shikkan3.png',
    ORIGIN + '/javaScript/appointment.js',
    ORIGIN + '/javaScript/checkAppointment.js',
    ORIGIN + '/javaScript/checkResult.js',
    ORIGIN + '/javaScript/editmydata.js',
    ORIGIN + '/javaScript/notification.js',
//    ORIGIN + '/javaScript/confirmDate.js',
    ORIGIN + '/javaScript/login.js',
    ORIGIN + '/javaScript/myData.js',
    ORIGIN + '/javaScript/newlogin.js',
    ORIGIN + '/javaScript/result.js',
    ORIGIN + '/jquery-2.2.4.min.js',
];

var STATIC_FILE_URL_HASH = {};
STATIC_FILES.forEach(function(x) {STATIC_FILE_URL_HASH[x] = true});

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
        .then(function(cache){
            console.log('Install cache');
            return cache.addAll(STATIC_FILES);
        })
    )
})
/*
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
                return response || fetch(event.request)
        })
    );
});

self.addEventListener('fetch', function(event){});
*/

self.addEventListener('fetch', function(event) {
  //ブラウザが回線に接続しているかをboolで返してくれる
  var online = navigator.onLine;

  //回線が使えるときの処理
  if(online){
    event.respondWith(
      caches.match(event.request)
        .then(
        function (response) {
          if (response) {
            return response;
          }
          //ローカルにキャッシュがあればすぐ返して終わりですが、
          //無かった場合はここで新しく取得します
          return fetch(event.request)
            .then(function(response){
              // 取得できたリソースは表示にも使うが、キャッシュにも追加しておきます
              // ただし、Responseはストリームなのでキャッシュのために使用してしまうと、ブラウザの表示で不具合が起こる(っぽい)ので、複製しましょう
              cloneResponse = response.clone();
              if(response){
                //ここ&&に修正するかもです
                if(response || response.status == 200){
                  //現行のキャッシュに追加
                  caches.open(STATIC_CACHE_NAME)
                    .then(function(cache)
                    {
                      cache.put(event.request, cloneResponse)
                      .then(function(){
                        //正常にキャッシュ追加できたときの処理(必要であれば)
                      });
                    });
                }else{
                  //正常に取得できなかったときにハンドリングしてもよい
                  return response;
                }
                return response;
              }
            }).catch(function(error) {
              //デバッグ用
              return console.log(error);
            });
        })
    );
  }else{
    //オフラインのときの制御
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // キャッシュがあったのでそのレスポンスを返す
          if (response) {
            return response;
          }
          //オフラインでキャッシュもなかったパターン
          return caches.match("offline.html")
              .then(function(responseNodata)
              {
                //適当な変数にオフラインのときに渡すリソースを入れて返却
                //今回はoffline.htmlを返しています
                return responseNodata;
              });
        }
      )
    );
  }
});

const STATIC_CACHE_NAMES = [
    STATIC_CACHE_NAME
];

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
            .then(function(keys) {
                return Promise.all(
                    keys.filter(function(key) {
                        return !STATIC_CACHE_NAMES.includes(key);
                    }).map(function(key) {
                        return caches.delete(key);
                    })
                );
            })
    );
});

self.addEventListener("push", function(event) {
  console.log("Push Notification Recieved", event);
  if (Notification.permission == "granted") {
    event.waitUntil(
      self.registration
        .showNotification("受信しました", {
          body: "1日前です。",
          icon: "revealweb-144.png"
        })
        .then(
          function(showEvent) {},
          function(error) {
            console.log(error);
          }
        )
    );
  }
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("https://kaikisk.github.io/hhswa/checkAppointment.html")
  );
});

var today = new Date();

setInterval(function(){
    var appointmentsString = localStorage.getItem('appointments');
    var appointments = JSON.parse(appointmentsString);
    console.log('年:' + today.getFullYear() + ', 月：'+ (today.getMonth()+1) + ', 日：' + today.getDate());
    
    for(var i = 0; i < appointments.length; i++){
        var date = appointments[i].dateClient.split('-');
        console.log('分割' +date.join(' & '));
        if(today.getFullYear() == date[0] && (today.getMonth()+1) == date[1] 
            && today.getDate() == date[2]){
                navigator.serviceWorker.ready.then(function(registration){
                    registration.showNotification('1日前だよ');
                });
                //下の書き方はなぜかスマホに対応してない
               //var n = new Notification('1日前です',appointments[i].dateClient);
               //setTimeout(n.close.bind(n), 20000); 
        }
    }
}, 10000);
//86400000mm = 1日
