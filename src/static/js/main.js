/*
-----------------------------------------------
Theme: ConfCentre - Landing Page HTML Template
Version 1.0
Author: EXSYthemes
-----------------------------------------------
// ========== TABLE OF CONTENTS ============ //
	1. Modal
	2. Hamburger
	3. Counter
-----------------------------------------------*/

'use strict';

$(document).ready(function () {
  AOS.init();

  /*  1. Modal */
  function showModal() {
    $('html').toggleClass('no-scroll');
    $('.overlay').toggleClass('s-show');
    $('.modal').toggleClass('s-show');
  }
  /*  1. END Modal */

  /*  2. Hamburger */
  $('.hamburger').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('is-active');
    $('.h-nav').toggleClass('h-nav--active');
  });
  /*  2. END  Hamburger */

  $('.h-nav li a').on('click', function () {
    $('.hamburger').removeClass('is-active');
    $('.h-nav').removeClass('h-nav--active');
  });

  $('.h-nav ul li a[href*="#"]').on('click', function (e) {
    e.preventDefault();

    $('html, body').animate(
      {
        scrollTop: $($(this).attr('href')).offset().top,
      },
      500,
      'linear'
    );

    $(this).addClass('hl--active');
    $('.h-nav ul li a').not(this).removeClass('hl--active');
  });

  $('.sh-modal').on('click', function (e) {
    e.preventDefault();
    showModal();
  });

  $('.m-close').on('click', function (e) {
    e.preventDefault();
    showModal();
  });

  $('.overlay').on('click', function (e) {
    e.preventDefault();
    showModal();
  });

  $('#dataGoScan').on('click', function (e) {
    window.open(
      'https://hecoinfo.com/address/0x052bb54150313c685aac197cd971a862c09edeef'
    );
  });

  $('#homeGoAPP').on('click', function (e) {
    window.open('https://app.coiner.chat');
  });

  $('#homeGoWhitePaper').on('click', function (e) {
    window.open('./static/file/CoinerChat白皮书.pdf');
  });

  /*  3. Counter */
  $('.counter').counterUp({
    delay: 10,
    time: 1000,
  });
  /* END 3. Counter */

  $('.cities-list li button[data-select="DB"]').addClass('active-city');
  $('.events-block .DB').addClass('events-list--active');

  $('.cities-list li button').on('click', function (e) {
    e.preventDefault();

    let dataSelected = $(this).attr('data-select');

    $('.cities-list li button').not(this).removeClass('active-city');
    $(this).addClass('active-city');
    $('.events-list').removeClass('events-list--active');
    $('.events-block ' + '.' + dataSelected).addClass('events-list--active');
  });

  $('.wpcf7-submit').on('click', function (e) {
    if ($('input[type="checkbox"]').prop('checked')) {
      true;
    } else {
      e.preventDefault();

      $('input').addClass('brd');
      $('.i-mask').addClass('brd');
      setTimeout(function () {
        $('input').removeClass('brd');
        $('.i-mask').removeClass('brd');
      }, 2000);
    }
  });
  const web3 = new Web3('https://http-mainnet-node.huobichain.com');
  const CoinerChatContract = new web3.eth.Contract(
    CoinerChatContractABI,
    CoinerChatContractAddress
  );
  setPersonsNumber();
  setGroupsNumber();
  setMessagesNumber();

  async function setPersonsNumber() {
    const personAddrs = await autoTry(CoinerChatContract.methods.personAddrs,[],true);
    $('#personsNumber').html(personAddrs.length);
  }

  async function setGroupsNumber() {
    const groupAddrs = await autoTry(CoinerChatContract.methods.groupAddrs,[],true);
    $('#groupsNumber').html(groupAddrs.length);
  }

  async function setMessagesNumber() {
    const messagesLength = await autoTry(CoinerChatContract.methods
      .messagesLength,[],true);
    $('#messagesNumber').html(messagesLength);
  }

  async function autoTry(fun, args,isCall) {
    return new Promise(async (resolve, reject) => {
      let err;
      let time = 30;
      let _time= new Date().getTime();
      for (let i = 0; i < time; i++) {
        try {
          let res;
          if (isCall) {
            res = await fun(...args).call();
          } else {
            res = await fun(...args);
          }
          resolve(res);
          break;
        } catch (error) {
          err = error;
          if (i === time - 1) {
            console.log('autoTry', i, err, new Date().getTime() - _time);
            reject(err);
            break;
          }
          await sleep(100);
          console.log('autoTry', i, err, new Date().getTime() - _time);
          _time = new Date().getTime();
          continue;
        }
      }
    });
  }

  async function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
});
