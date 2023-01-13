var nameDevice1 = 'Box1/';

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


let hours, minutes, seconds, days, months, years ;
//========================= Thời gian=======================================
function Set_Time_Firebase() {
    my_database.ref('Date/').set({
        Hour: hours,
        Minute: minutes,
        Second: seconds,
        Day: days,
        Month: months,
        Year: years
    });
}

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

    // if(hours>11)
    // {
    //     document.getElementById("timeCurrent-AMPM").innerHTML = 'PM';
    // }
    // else
    // {
    //     document.getElementById("timeCurrent-AMPM").innerHTML = 'AM';
    // }
    //hours%=12;

    number_small(hours, minutes, seconds, days, months);

    document.getElementById("timeCurrent-hour").innerHTML = hours;
    document.getElementById("timeCurrent-minute").innerHTML = minutes;
    document.getElementById("timeCurrent-second").innerHTML = seconds;

    document.getElementById("timeCurrent-day").innerHTML = days;
    document.getElementById("timeCurrent-month").innerHTML = months;
    document.getElementById("timeCurrent-year").innerHTML = years;

}

//==========================Dữ liệu hiển thị================================
//===========set
function Set_Value_Display_Debug()
{
    getTimeCurrent();
    number_small(hours, minutes, seconds, days, months);

    let time = hours.toString() + minutes.toString();
    let date = days.toString() + months.toString() + (years % 2000).toString();

    let path = nameDevice1 + date + '/' + time + '/';
    // console.log(path);

    let user_ref = my_database.ref(path);
    user_ref.set({
        Co: 102,
        Gas: 90,
        Bui: 360
    });
}

//===========get
var valueGetCo;
var valueGetGas;
var valueGetBui;
var valueGetTemp;

function Get_Value_Display() {
    getTimeCurrent();
    number_small(hours, minutes, seconds, days, months);

    let time = hours.toString() + (minutes).toString();
    let date = days.toString() + months.toString() + (years % 2000).toString();

    let path = nameDevice1 + date + '/' + time + '/';
    // console.log(path);


    let user_ref = my_database.ref(path);
    user_ref.on('value', function (snapshot) 
    {
        data = snapshot.val();

        valueGetCo = data.Co;
        valueGetGas = data.Gas;
        valueGetBui = data.Bui;
        valueGetTemp = data.Temp;

        document.getElementById("valueGetCo").innerHTML = valueGetCo;
        document.getElementById("valueGetGas").innerHTML = valueGetGas;
        document.getElementById("valueGetBui").innerHTML = valueGetBui;
        document.getElementById("valueGetTemp").innerHTML = valueGetTemp;
    });
}

//============================ Value set ===================================
//============set
//co
function Check_Set_Value_Co() {

    var value = document.getElementById("inputValueCo").value;

    var number_set = Number.parseInt(value);

    var update = {
        co: number_set
    }

    my_database.ref(nameDevice1 + '/value_set').update(update)
}

document.getElementById("subValueCo").onclick = function () {
    Check_Set_Value_Co();

    document.getElementById("inputValueCo").value = '';
}

var inputCo = document.getElementById("inputValueCo");
inputCo.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("subValueCo").click();
  }
});

//gas
function Check_Set_Value_Gas() {

    var value = document.getElementById("inputValueGas").value;

    var number_set = Number.parseInt(value);

    var update = {
        gas: number_set
    }

    my_database.ref(nameDevice1 + '/value_set').update(update)
}

document.getElementById("subValueGas").onclick = function () {
    Check_Set_Value_Gas();

    document.getElementById("inputValueGas").value = '';
}

var inputGas = document.getElementById("inputValueGas");
inputGas.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("subValueGas").click();
  }
});

//bụi
function Check_Set_Value_Bui() {

    var value = document.getElementById("inputValueBui").value;

    var number_set = Number.parseInt(value);

    var update = {
        bui: number_set
    }

    my_database.ref(nameDevice1 + '/value_set').update(update);
}

document.getElementById("subValueBui").onclick = function () {
    Check_Set_Value_Bui();

    document.getElementById("inputValueBui").value = '';
}

var inputBui = document.getElementById("inputValueBui");
inputBui.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("subValueBui").click();
  }
});
//================get value cài đặt
var valueSetCo;
var valueSetGas;
var valueSetBui;

function Get_Value_Set() 
{
    var user_ref = my_database.ref(nameDevice1 + 'value_set/');
  

    user_ref.on('value', function (snapshot) 
    {
        data = snapshot.val();

        valueSetCo = data.co;
        valueSetGas = data.gas;
        valueSetBui = data.bui;
    });

    document.getElementById("valueSetCo").innerHTML = valueSetCo;
    document.getElementById("valueSetGas").innerHTML = valueSetGas;
    document.getElementById("valueSetBui").innerHTML = valueSetBui;
}

//============================Vị trí=========================================
//=============get
function Get_Location() {
    var user_ref = my_database.ref(nameDevice1);

    user_ref.on('value', function (snapshot) 
    {
        data = snapshot.val();
        
        document.getElementById("location_display").innerHTML = data.location;
    });
}

//=============set
function Set_Location() {
    var value_location = document.getElementById("location_current").value;
    
    var update = {
        location: value_location
    }

    my_database.ref(nameDevice1).update(update)

    // console.log(value_location);    
}

document.getElementById("subTinh").onclick = function () {
    Set_Location();
}

var inputCo = document.getElementById("location_current");
inputCo.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("subTinh").click();
  }
});

//================cấu hình khi mới chạy=====
function Init_Location() {
    var user_ref = my_database.ref(nameDevice1);

    user_ref.on('value', function (snapshot) 
    {
        data = snapshot.val();
        
        document.getElementById("location_current").value = data.location;
    });
}

Init_Location();

//===========================Bảo hành========================================
//==============get

//========================trạng thái an toàn/ nguy hiểm=================
var countCo = 0;
var countGas  = 0;
var countBui = 0;
var countAll = 0;
function Set_State_Current() {
    
    if(valueGetCo >= valueSetCo)
    {
        countCo = 1;
        countAll = 1;

        document.getElementById("status_current").innerHTML = 'Nguy hiểm';
        document.getElementById("status_current").style.color = "red";

        document.getElementById("logoCo").style.color = "red";
        document.getElementById("logoCo").style.fontWeight = "900";

        document.getElementById("valueGetCo").style.color = "red";
        document.getElementById("valueGetCo").style.fontWeight = "900";

        document.getElementById("donVi_Co").style.color = "red";
        document.getElementById("donVi_Co").style.fontWeight = "900";
    }
    
    if((valueGetCo < valueSetCo) && ( countCo == 1))
    {
        countCo = 0;

        document.getElementById("logoCo").style.color = "black";
        document.getElementById("logoCo").style.fontWeight = "500";

        document.getElementById("valueGetCo").style.color = "black";
        document.getElementById("valueGetCo").style.fontWeight = "500";

        document.getElementById("donVi_Co").style.color = "black";
        document.getElementById("donVi_Co").style.fontWeight = "500";
    }

    if(valueGetGas >= valueSetGas)
    {
        countGas = 1;
        countAll = 1;

        document.getElementById("status_current").innerHTML = 'Nguy hiểm';
        document.getElementById("status_current").style.color = "red";

        document.getElementById("logoGas").style.color = "red";
        document.getElementById("logoGas").style.fontWeight = "900";

        document.getElementById("valueGetGas").style.color = "red";
        document.getElementById("valueGetGas").style.fontWeight = "900";

        document.getElementById("donVi_Gas").style.color = "red";
        document.getElementById("donVi_Gas").style.fontWeight = "900";
    }

    if((valueGetGas < valueSetGas) && (countGas == 1))
    {
        countGas = 0;

        document.getElementById("logoGas").style.color = "black";
        document.getElementById("logoGas").style.fontWeight = "500";

        document.getElementById("valueGetGas").style.color = "black";
        document.getElementById("valueGetGas").style.fontWeight = "500";

        document.getElementById("donVi_Gas").style.color = "black";
        document.getElementById("donVi_Gas").style.fontWeight = "500";
    }

    if(valueGetBui >= valueSetBui)
    {
        countBui = 1;
        countAll = 1;

        document.getElementById("status_current").innerHTML = 'Nguy hiểm';
        document.getElementById("status_current").style.color = "red";

        document.getElementById("logoBui").style.color = "red";
        document.getElementById("logoBui").style.fontWeight = "900";

        document.getElementById("valueGetBui").style.color = "red";
        document.getElementById("valueGetBui").style.fontWeight = "900";

        document.getElementById("donVi_Bui").style.color = "red";
        document.getElementById("donVi_Bui").style.fontWeight = "900";
    }

    if((valueGetBui < valueSetBui) && (countBui == 1))
    {
        countBui = 0;

        document.getElementById("logoBui").style.color = "black";
        document.getElementById("logoBui").style.fontWeight = "500";

        document.getElementById("valueGetBui").style.color = "black";
        document.getElementById("valueGetBui").style.fontWeight = "500";

        document.getElementById("donVi_Bui").style.color = "black";
        document.getElementById("donVi_Bui").style.fontWeight = "500";
    }

    if((valueGetCo < valueSetCo)
    && (valueGetGas < valueSetGas)
    && (valueGetBui < valueSetBui) 
    && (countAll == 1))
    {
        countAll = 0;
        document.getElementById("status_current").innerHTML = 'An toàn';
        document.getElementById("status_current").style.color = "green";
    }
}

//======================== Automatic run after 500ms===================
function Run_Automation() {
    replaceTimeCurrent();

    Get_Location();

    Get_Value_Set();

    Get_Value_Display();

    Set_State_Current();
}

setInterval(Run_Automation, 400);
