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

function set() {
    var email = "nhiennhienbn1@gmail.com";
    var password = 1234567;

    // var username = document.getElementById('username').value
    // var username = "ducdat";
    var username = 'dung';

    my_database.ref('infor_login/' + username).set({
        email: email,
        password: password
    });
}

function get() {
    var username = '';
    var data;
    var user_ref = my_database.ref('infor_login/' + username);

    user_ref.on('value', function (snapshot) {
        data = snapshot.val();
        console.log(data.email);
        console.log(data.password);
    });
}

function update() {
    var username = '';
    var gmail = 'ducdatn7@gmail.com';
    var password = 'iloveyou1';

    var update = {
        email: gmail,
        password: password
    }

    my_database.ref('infor_login/' + username).update(update)

    console.log('mail ' + gmail);
    console.log('password ' + password);

}

function remove() {
    var username = '';
    my_database.ref('infor_login/' + username).remove()
    console.log("deleted");
}
//==============================================================================================================
function set_data(path, username, gmail, password) {
    my_database.ref(path).set({
        username: username,
        email: gmail,
        password: password
    })
}
//==========================///=============================///===========================///=========
function Login_Pass() {
    window.location.href = "./../../source/Home/index.html";
    alert("Login successfully.");
}

function Login_Fail() {
    window.location.href = "#";
    alert("Login failed. Check again username and password!");
}

function Check_Information(username, password) {

    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;

    if(pass.length < 8)
    {
        return 0;
    }

    if(user.localeCompare(username))
    {
        return 0;
    }

    if(pass.localeCompare(password))
    {
        return 0;
    }

    return 1;
}

function Submit_Login(check_information) {
    if(check_information == 0)
    {
        Login_Fail();
        return;
    }

    Login_Pass();
}

function Get_Data_From_Firebase(path)
{
    var user_ref = my_database.ref(path);

    user_ref.on('value', function (snapshot) {
        data = snapshot.val();

        // console.log(data.email);
        // console.log(data.password);
        // console.log(data.username);

        var result = Check_Information(data.username, data.password);

        Submit_Login(result);    
    });
}

// ================================ Run Program ========================================
document.getElementById("submit_login").onclick = function () {
    Get_Data_From_Firebase('signup_information');
}
