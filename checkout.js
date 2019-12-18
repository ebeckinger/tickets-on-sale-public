var timerHtml = '<div class="flash-timer-modal"><div>FLASH SALE</div><div id="flash-countdown">Time Left : <div id="flash-timer" class="ml-1"></div></div></div>';

$(document).ready(function () {

    //Inject modal
    //
    $('head').after(timerHtml);

    var flashSaleCookie = getCookie('tickets-on-sale-fs');

    if (flashSaleCookie != "") {

        console.log('flashSaleCookie detected!');

        var flashSaleCookieParsed = JSON.parse(flashSaleCookie);
        var currentDate = Date().getTime();
        var flashSaleCreatedTime = Date.parse(flashSaleCookieParsed.FlashSaleTotalMinutes);

        console.log('flashSaleCreatedTime: ' + flashSaleCreatedTime);

        if (flashSaleCreatedTime) {

            var diffMs = (currentDate - flashSaleCreatedTime);
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

            console.log('diffMins: ' + diffMins);

            if (diffMins > 0) {

                var flashSaleRemaining = diffMins - 15;
                var countDownDate = new Date().getTime() + flashSaleRemaining * 60 * 1000;
                startFlashTimer(countDownDate);
            }
        }
    }
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function startFlashTimer(countDownDate) {
    document.getElementById("flash-timer").innerHTML = "14:59";
    if ($('#flash-timer-modal-mobile').length > 0) {
        document.getElementById("flash-timer-mobile").innerHTML = "14:59";
    }
    //document.getElementById("flash-countdown").innerHTML = "15:00";
    var x = setInterval(function () {
        // Check if event map exists...
        if ($('.event-name-map.clearfix').length > 0) {
            if ($('#flash-timer-modal-mobile').length < 1) {
                //add flash timer to map object
                $flashMobileTimer = $('<div id="flash-timer-modal-mobile"><div>FLASH SALE</div><div id="flash-countdown">Time Left : <div id="flash-timer-mobile" class="ml-1"></div></div></div >');
                $flashMobileTimer.appendTo($('.event-name-map.clearfix')[0]);
            }
        }
        //Check if we're not on ticket page by searching for #ticket-display
        if ($('#ticket-display').length < 1) {
            //We're not on the ticket page!!!
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
        }
    }, 1000);
}