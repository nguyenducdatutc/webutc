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


///=========Send Email======================
function SendEmail(emailReceiveText, text) 
{
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "nhiennhienbn@gmail.com",
        Password: "3F3C38D0DD6829E0C3003A1B7D2977E7405F",

        To: emailReceiveText,     // Have change
        From: "nhiennhienbn@gmail.com",

        Subject: "Mật khẩu đã lưu.",	// Have change
        Body: text	// Have change
    }).then(function (message) {

        // Notify send email successful
        alert("Email sent successfully")
    });
}

var emailSigUp;
var passSigUp;
var nameSigUp;
function Get_Email() {
    
    var user_ref = my_database.ref('signup_information/');

    user_ref.on('value', function (snapshot) {
        data = snapshot.val();
        emailSigUp = data.email;
        passSigUp = data.password;
        nameSigUp = data.username;
    });
}

Get_Email();

function Email_True(email)
{
    var emailInput = document.getElementById('email').value;
    
    let result = emailInput.localeCompare(email);

    if(result == 0)
    {
        return 1;
    }
}

document.getElementById('content_page-get_again_email').onclick = function () {
    

    if(Email_True(emailSigUp) == 1)
    {
        SendEmail('ducdaty7@gmail.com', 'Tên tài khoản: ' + nameSigUp + ' ---- ' + 'Mật khẩu: ' + passSigUp);
    }
    else
    {
        alert("Email không tồn tại!!");
        alert("Lấy lại mật khẩu thất bại.");
    }
}

var inputSend = document.getElementById("email");
inputSend.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("content_page-get_again_email").click();
  }
});


