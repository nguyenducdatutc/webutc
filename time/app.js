// Your web app's Firebase configuration
const firebaseConfig1 = {
    apiKey: "AIzaSyCeFg0Vnj6TXU-j4VvL-BhwVFkj8negsLE",
    authDomain: "tt-iot-utc.firebaseapp.com",
    databaseURL: "https://tt-iot-utc-default-rtdb.firebaseio.com",
    projectId: "tt-iot-utc",
    storageBucket: "tt-iot-utc.appspot.com",
    messagingSenderId: "457897367163",
    appId: "1:457897367163:web:0ba514c3f54782499fb4de"
};

firebase.initializeApp(firebaseConfig1);
firebase.analytics();

var my_database = firebase.database();

// Gửi dữ liệu thời gian đến firebase
function Set_Time_Firebase() {
    my_database.ref('Date/').set({
        Hour: hours,
        Minute: minutes,
        Second: seconds,
        Day: days,
        Month: months,
        year: years
    });
}

let hours, minutes, seconds, days, months, years ;

function extra_zero_for_number_small(value) {
    return (value < 10) ? ('0' + value) : value;
}

function number_small(hour, minute, second, day, month){
    hours = extra_zero_for_number_small(hour);
    minutes = extra_zero_for_number_small(minute);
    seconds = extra_zero_for_number_small(second);

    days = extra_zero_for_number_small(day);
    months =  extra_zero_for_number_small(month);
}

function getTimeCurrent() {
    const d = new Date();

    hours = d.getHours();
    minutes = d.getMinutes();
    seconds = d.getSeconds();

    days = d.getDate();
    months = d.getMonth() + 1;
    years = d.getFullYear();
}

function replaceTimeCurrent() {
    getTimeCurrent();

    Set_Time_Firebase();

    if(hours>11)
    {
        document.getElementById("timeCurrent-AMPM").innerHTML = 'PM';
    }
    else
    {
        document.getElementById("timeCurrent-AMPM").innerHTML = 'AM';
    }

    hours%=12;
    number_small(hours, minutes, seconds, days, months);

    document.getElementById("timeCurrent-hour").innerHTML = hours;
    document.getElementById("timeCurrent-minute").innerHTML = minutes;
    document.getElementById("timeCurrent-second").innerHTML = seconds;

    document.getElementById("timeCurrent-day").innerHTML = days;
    document.getElementById("timeCurrent-month").innerHTML = months;
    document.getElementById("timeCurrent-year").innerHTML = years;
}

setInterval(replaceTimeCurrent, 500);



