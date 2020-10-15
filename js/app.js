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
    text: "\u0427\u0435\u043C \u0431\u043E\u043B\u044C\u0448\u0435 \u0441\u0435\u043C\u044C\u044F, \u0442\u0435\u043C \u0431\u043E\u043B\u044C\u0448\u0435 \u0440\u0430\u0434\u043E\u0441\u0442\u0438. \u0415\u0441\u043B\u0438 \u0443 \u0432\u0430\u0441 \u0431\u043E\u043B\u044C\u0448\u0435 \u0434\u0432\u0443\u0445 \u0434\u0435\u0442\u0435\u0439, \u0438 \u0438\u043F\u043E\u0442\u0435\u0447\u043D\u044B\u0439 \u043A\u0440\u0435\u0434\u0438\u0442 \u0432 \u043B\u044E\u0431\u043E\u043C \u0431\u0430\u043D\u043A\u0435, \u0442\u043E\u0433\u0434\u0430 \u0443\xA0\u043C\u0435\u043D\u044F \u0434\u043B\u044F \u0432\u0430\u0441 \u0435\u0441\u0442\u044C \u0445\u043E\u0440\u043E\u0448\u0438\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438. \u041D\u0435\u0434\u0430\u0432\u043D\u043E \u043C\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0432\u044B\u043F\u043B\u0430\u0442\u0443 \u043F\u043E\xA0\u0433\u043E\u0441\u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0435 \u043D\u0430 \u043F\u043E\u0433\u0430\u0448\u0435\u043D\u0438\u0435 \u043D\u0430\u0448\u0435\u0433\u043E \u0438\u043F\u043E\u0442\u0435\u0447\u043D\u043E\u0433\u043E \u043A\u0440\u0435\u0434\u0438\u0442\u0430. \u0418 \u0432\u044B \u0442\u043E\u0436\u0435 \u0441\u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0434\u043E 450 \u0442\u044B\u0441\u044F\u0447 \u0440\u0443\u0431\u043B\u0435\u0439",
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

  this.vk = function () {
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

  this.ok = function () {
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

  this.fb = function () {
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

  this.instagram = function () {
    var self = this;
    var vkAuthed = false;
    var vkPosted = false;
    var vkApiInited = false;

    window.vkAsyncInit = function () {
      VK.init({
        apiId: 7629067
      });
      vkInited();
    };

    setTimeout(function () {
      var el = document.createElement("script");
      el.type = "text/javascript";
      el.src = "https://vk.com/js/api/openapi.js?168";
      el.async = true;
      document.getElementById("vk_api_transport").appendChild(el);
    }, 0);

    var vkInited = function vkInited() {
      if (window.VK) {
        vkApiInited = true;
      }

      if (vkApiInited && !vkAuthed) {
        vkAuth();
      }
    };

    var vkAuth = function vkAuth() {
      if (!vkAuthed) {
        VK.Auth.login(function (callback) {
          console.log(callback);

          if ((callback === null || callback === void 0 ? void 0 : callback.status) === 'connected') {
            vkAuthed = true;
            vkPost();
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
          v: '5.73'
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