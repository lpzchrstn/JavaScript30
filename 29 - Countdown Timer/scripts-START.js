const buttonTimers = document.querySelectorAll( "button" );
const customTimer = document.querySelector("form#custom");
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
let timer;

function countdownTimer( timeInSeconds ) {
    clearInterval( timer );
    const then = Date.now() + (timeInSeconds * 1000);
    timeInSeconds = (then - Date.now()) / 1000;

    displayRemainingTime( timeInSeconds );
    endTime.innerText = getEndTime( timeInSeconds );

    timer = setInterval( () => {
        timeInSeconds--;
        displayRemainingTime( timeInSeconds );

        if( timeInSeconds == 0) {
            clearInterval( timer );
        }
    }, 1000);
}

function displayRemainingTime( timeInSeconds ) {
    timerDisplay.innerText = formatTimeFromSeconds( timeInSeconds );
    document.title = timerDisplay.innerText;
}

function startTimer() {
    const timeInSeconds = parseInt( this.dataset.time );
    countdownTimer( timeInSeconds );
}

function startCustomTimer( e ) {
    e.preventDefault();
    const timeInSeconds = parseInt( this.children.minutes.value ) * 60;
    countdownTimer( timeInSeconds );
    document.querySelector( "#custom input[name=minutes]" ).value = "";
}

function formatTimeFromSeconds( timeInSeconds ) {
    const hour = Math.floor( timeInSeconds / 3600 ).toString();
    const minute = Math.floor( timeInSeconds % 3600 / 60 ).toString();
    const second = Math.floor( timeInSeconds % 3600 % 60 ).toString();

    return hour > 0 ? 
        `${hour.padStart( 2, 0 )}:${minute.padStart( 2, 0 )}:${second.padStart( 2, 0 )}` :
        `${minute.padStart( 2, 0 )}:${second.padStart( 2, 0 )}`;
} 

function getEndTime( timeInSeconds ) {
    let time = new Date();
    time.setSeconds( time.getSeconds() + timeInSeconds );
    time = time.toLocaleTimeString( navigator.language, {hour: '2-digit', minute:'2-digit'});
    return `Be back at ${time}`;
}

buttonTimers.forEach( button => button.addEventListener( "click", startTimer ));
customTimer.addEventListener( "submit", startCustomTimer );