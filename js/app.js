"use strict";

document.addEventListener("DOMContentLoaded", function () {
  init();
});

function init() {
  var buttons = document.querySelectorAll('.js-share-button');
  buttons.forEach(function (item) {
    item.addEventListener('click', buttonClicked);
  });
  var SHARE_DATA = {
    title: 'Это поле title',
    text: "\u0427\u0435\u043C \u0431\u043E\u043B\u044C\u0448\u0435 \u0441\u0435\u043C\u044C\u044F, \u0442\u0435\u043C \u0431\u043E\u043B\u044C\u0448\u0435 \u0440\u0430\u0434\u043E\u0441\u0442\u0438. \u0415\u0441\u043B\u0438 \u0443 \u0432\u0430\u0441 \u0431\u043E\u043B\u044C\u0448\u0435 \u0434\u0432\u0443\u0445 \u0434\u0435\u0442\u0435\u0439, \u0438 \u0438\u043F\u043E\u0442\u0435\u0447\u043D\u044B\u0439 \u043A\u0440\u0435\u0434\u0438\u0442 \u0432 \u043B\u044E\u0431\u043E\u043C \u0431\u0430\u043D\u043A\u0435.",
    //imgUrl: window.location + 'images/share-cover.jpg'
    img: 'https://xn--h1alcedd.xn--d1aqf.xn--p1ai/wp-content/uploads/2019/03/GettyImages-870761572.jpg',
    url: 'https://спроси.дом.рф'
  };

  function buttonClicked(e) {
    var shareType = e.target.dataset.shareType;
    var share = new Share(SHARE_DATA.url, SHARE_DATA.title, SHARE_DATA.img, SHARE_DATA.text);
    share[shareType]();
  }
}

function Share(purl, ptitle, pimg, text) {
  this.purl = purl;
  this.ptitle = ptitle;
  this.pimg = pimg;
  this.text = text;
  /*
      url Ссылка на страницу, которая будет публиковаться.
      title   Заголовок публикации. Если не указан, то будет браться со страницы публикации.
      description Описание публикации. Если не указано, то будет браться со страницы публикации.
      image   Ссылка на иллюстрацию к публикации. Если не указана, то будет браться со страницы публикации.
  */

  this.vkOLD = function () {
    var url = 'http://vk.com/share.php?';

    if (this.purl) {
      url += 'url=' + this.purl;
    }

    if (this.ptitle) {
      url += '&title=' + encodeURIComponent(this.ptitle);
    }

    if (this.text) {
      url += '&description=' + encodeURIComponent(this.text);
    }

    if (this.pimg) {
      url += '&image=' + encodeURIComponent(this.pimg);
    }

    url += '&noparse=true';
    this.popup(url);
  };

  this.okOLD = function () {
    var url = 'https://connect.ok.ru/offer?';

    if (this.purl) {
      url += 'url=' + encodeURIComponent(this.purl);
    }

    if (this.ptitle) {
      url += '&title=' + encodeURIComponent(this.ptitle);
    }

    if (this.pimg) {
      url += '&imageUrl=' + encodeURIComponent(this.pimg);
    }

    this.popup(url);
  };

  this.ok = function () {
    var clientId = '512000487922';
    var url = "https://connect.ok.ru/oauth/authorize?client_id=".concat(clientId, "&scope=VALUABLE_ACCESS&response_type=code&redirect_uri=").concat(window.location, "&layout=a");
    this.popup(url);
  };

  this.fb = function () {
    var self = this;
    var fbApiInited = false;

    window.fbAsyncInit = function () {
      FB.init({
        appId: 1255939541450273,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v8.0'
      });
      fbInited();
      FB.AppEvents.logPageView();
    };

    if (!fbApiInited) {
      (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];

        if (d.getElementById(id)) {
          return;
        }

        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    }

    var fbInited = function fbInited() {
      FB.login(function (response) {
        console.log(response);

        if (response.status === 'connected') {
          var body = self.text;
          FB.api('/me/feed', 'post', {
            message: body
          }, function (response) {
            if (!response || response.error) {
              alert('Error occured');
              console.error(response.error.message);
            } else {
              alert('Post ID: ' + response.id);
            }
          });
        } else {// The person is not logged into your webpage or we are unable to tell. 
        }
      }, {
        scope: 'user_posts'
      });
    };
  };

  this.fbOLD = function () {
    var url = 'https://www.facebook.com/dialog/feed?';
    url += 'app_id=1255939541450273';
    url += '&display=popup';

    if (this.purl) {
      url += '&link=' + encodeURIComponent(this.purl);
    }

    if (this.text) {
      url += '&quote=' + encodeURIComponent(this.text);
    }

    if (this.pimg) {// url += '&media='+ encodeURIComponent('[') + this.pimg + encodeURIComponent(']');
    }

    this.popup(url);
  };

  this.vk = function () {
    var self = this;
    var vkAuthed = false;
    var vkPosted = false;
    var vkApiInited = false;
    var VKToken;
    ;

    window.vkAsyncInit = function () {
      VK.init({
        apiId: 7629067
      });
      vkInited();
      VK.Observer.subscribe('auth.login', vkPost);
    };

    if (!vkApiInited) {
      setTimeout(function () {
        var el = document.createElement("script");
        el.type = "text/javascript";
        el.src = "https://vk.com/js/api/openapi.js?168";
        el.async = true;
        document.getElementById("vk_api_transport").appendChild(el);
      }, 0);
    }

    var vkInited = function vkInited() {
      if (window.VK) {
        vkApiInited = true;
      }

      if (vkApiInited && !vkAuthed) {
        vkAuth();
      }

      if (vkApiInited && vkAuthed) {
        vkPost();
      }
    };

    var vkAuth = function vkAuth() {
      if (!vkAuthed) {
        VK.Auth.login(function (callback) {
          console.log(callback);

          if ((callback === null || callback === void 0 ? void 0 : callback.status) === 'connected') {
            vkAuthed = true;
            VKToken = callback.session.sid;
          } else {
            vkAuthed = false;
          }
        }, 8192);
      }
    };

    var vkPost = function vkPost() {
      if (vkAuthed && !vkPosted) {
        console.log(self.text);
        VK.Api.call('wall.post', {
          message: self.text,
          v: '5.124'
        }, function (response) {
          console.log(response);
          vkPosted = true;
        });
      }
    };
  };

  this.popup = function (url) {
    window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
  };
}