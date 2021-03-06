﻿var timerHtml = '<div class="flash-timer-modal"><div>FLASH SALE</div><div id="flash-countdown">Time Left : <div id="flash-timer" class="ml-1"></div></div></div>';
var mobileTimerHtml = '<div class="timer-sec timer-sticky visible-xs"><h1 class="timer" data-minutes-left="10">remaining to checkout  <a href="javascript:void(0);" data-toggle="modal" data-target="#myModal"><i class="fa fa-info" aria-hidden="true"></i></a><div class="jst-hours">00:</div><div class="jst-minutes">10:</div><div class="jst-seconds">00</div><div class="jst-clearDiv"></div></h1></div>';
var modalHtml = '<div class="modal fade info-sec" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><h4>Why am I being timed?</h4><p>TicketsOnSale.com is a live marketplace and tickets can sell quickly. Your tickets are not held but we advise you to check out quickly to get your preferred tickets.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal"> OK, GOT IT</button></div></div></div></div>';
var timesUpModal = '<div class="modal fade in" id="timermodel" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><i class="fa fa-hourglass-o" aria-hidden="true"></i><h3>Time\'s Up</h3><h2>Your cart expired.</h2><p>TicketsOnSale.com is a live marketplace and tickets can sell quickly. Your tickets are not held, but may still be available.</p><a href="javascript:window.location.reload();">Continue Checkout</a></div></div></div></div>';

$(document).ready(function () {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        $('body').after(modalHtml);
		$('body').after(timesUpModal);

        $('#checkoutTab1').prepend(mobileTimerHtml);
        $('#checkoutTab2').prepend(mobileTimerHtml);
        $('#checkoutTab3').prepend(mobileTimerHtml);
        $('#checkoutTab4').prepend(mobileTimerHtml);
    }
    else {
        //$('head').after(timerHtml);
    }

    var flashSaleRemaining = 600;
    var countDownDate = new Date().getTime() + flashSaleRemaining * 1000;
    startFlashTimer(countDownDate);

});

function startFlashTimer(countDownDate) {

    if ($('#flash-timer').length > 0) {
        document.getElementById("flash-timer").innerHTML = "09:59";
    }

    var x = setInterval(function () {

        if ($('.flash-timer-modal').length > 0) {
            document.getElementsByClassName("flash-timer-modal")[0].classList.add('main-mobile-flash-timer');
        }

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for hours, minutes and seconds
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

            $(".jst-minutes").html(minutes + ":");
            $(".jst-seconds").html(seconds);

            if (distance < 0) {
                clearInterval(x);
                $(".jst-minutes").html("00:");
                $(".jst-seconds").html("00");
				$('#timermodel').modal('show');
            }
        }
        else {
			/*
			// Display the result in the element with id="demo"
			document.getElementById("flash-timer").innerHTML = minutes + ":" + seconds;
			document.getElementsByClassName("flash-timer-modal")[0].style.display = "block";
			if ($('#flash-timer-modal-mobile').length > 0) {
				document.getElementById("flash-timer-mobile").innerHTML = minutes + ":" + seconds;
				document.getElementById("flash-timer-modal-mobile").style.display = "block";
			}

			// If the count down is finished, write some text
			if (distance < 0) {
				clearInterval(x);
				document.getElementById("flash-timer").innerHTML = "00:00";
				if ($('#flash-timer-modal-mobile').length > 0) {
					document.getElementById("flash-timer-mobile").innerHTML = "00:00";
				}
			}*/
        }

    }, 1000);
}