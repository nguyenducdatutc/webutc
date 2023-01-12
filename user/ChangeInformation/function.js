var nameDevice1 = '/Box1/';
var nameDevice2 = '/Box2/';

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

function Update_User() {
    var mail = document.getElementById("gmailNew").value;
    var user = document.getElementById("userName").value;
    var pass = document.getElementById("userPass").value;

    var update = {
        email: mail,
        password: pass,
        username: user
    }

    my_database.ref('/signup_information').update(update)

    console.log('Thành công');
}

document.getElementById("updateUser").onclick = function () {
    Update_User();
}


function Update_Device_1() {
    var name = document.getElementById("NameWifiNew1").value;
    var pass = document.getElementById("PassWifiNew1").value;

    var update = {
        pass: pass,
        ssid: name
    }

    my_database.ref(nameDevice1+'router_wifi').update(update)

    console.log('Thành công');
}

document.getElementById("updateWifi1").onclick = function () {
    Update_Device_1();
}


function Update_Device_2() {
    var name = document.getElementById("NameWifiNew2").value;
    var pass = document.getElementById("PassWifiNew2").value;

    var update = {
        pass: pass,
        ssid: name
    }

    my_database.ref(nameDevice2 + 'router_wifi').update(update)

    console.log('Thành công');
}

document.getElementById("updateWifi2").onclick = function () {
    Update_Device_2();
}

function Delete_Change() {
    window.location.href = "./../../source/Home/index.html";
    alert("Huỷ thay đổi.");
}

document.getElementById("DeleteUpdate").onclick = function () {
    Delete_Change();
}




