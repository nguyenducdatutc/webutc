var nameDevice1 = 'Box1/';
var nameDevice2 = 'Box2/';

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

//============================== Display time system =====================
// ==== Send data time to firebase
function Set_Time_Firebase() 
{
    my_database.ref('Date/').set({
        Hour: hours,
        Minute: minutes,
        Second: seconds,
        Day: days,
        Month: months,
        Year: years
    });
}

let hours, minutes, seconds, days, months, years ;

var countTimeNeed = 0;
function Create_Time_Need() {
    if(countTimeNeed == 0)
    {
        Get_Time_Current();
        countTimeNeed = 1;
    }
    // var result = Extra_Zero_For_Number_Small(hours).toString()
    //             + Extra_Zero_For_Number_Small(minutes-1).toString();

    return (hours.toString() + minutes.toString());
}

var countDateNeed = 0;
function Create_Date_Need() {
    if(countDateNeed == 0)
    {
        Get_Time_Current();
        countDateNeed = 1;
    }

    // var result = Extra_Zero_For_Number_Small(days).toString()
    //             + Extra_Zero_For_Number_Small(months).toString()
    //             + Extra_Zero_For_Number_Small(years % 2000).toString();

    return (days.toString() + months.toString() + (years % 2000).toString());
}

function Date_And_Time_Current() {
    let _time = hours.toString() + ':' + minutes.toString();
    let _date = days.toString() + '/' + months.toString() +'/'+ (years).toString()

    return _time  +' -- '+ _date;
}

function Extra_Zero_For_Number_String_Small(value) {
    var result = 0;

    result =  (value < 10) ? ('0' + value) : value;
    return result.toString();
}

function Extra_Zero_For_Number_Small(value) {
    return (value < 10) ? ('0' + value) : value;
}

function Number_Small(hour, minute, second, day, month){
    hours = Extra_Zero_For_Number_Small(hour);
    minutes = Extra_Zero_For_Number_Small(minute);
    seconds = Extra_Zero_For_Number_Small(second);

    days = Extra_Zero_For_Number_Small(day);
    months =  Extra_Zero_For_Number_Small(month);
}

function Get_Time_Current() {
    const d = new Date();

    hours = d.getHours();
    minutes = d.getMinutes();
    seconds = d.getSeconds();

    days = d.getDate();
    months = d.getMonth() + 1;
    years = d.getFullYear();
}

function Replace_Time_Current() {
    Get_Time_Current();

    Set_Time_Firebase();

    // if(hours>11)
    // {
    //     document.getElementById("timeCurrent-AMPM").innerHTML = 'PM';
    // }
    // else
    // {
    //     document.getElementById("timeCurrent-AMPM").innerHTML = 'AM';
    // }

    // hours%=12;
    Number_Small(hours, minutes, seconds, days, months);

    document.getElementById("timeCurrent-hour").innerHTML = hours;
    document.getElementById("timeCurrent-minute").innerHTML = minutes;
    document.getElementById("timeCurrent-second").innerHTML = seconds;

    document.getElementById("timeCurrent-day").innerHTML = days;
    document.getElementById("timeCurrent-month").innerHTML = months;
    document.getElementById("timeCurrent-year").innerHTML = years;
}

//======================Display table number===========================
var valueGetCo1;
var valueGetGas1;
var valueGetBui1;

var time_New;

function Get_Value_Display1() {
    let time = Create_Time_Need();
    let date = Create_Date_Need();

    time_New = Create_Time_Need();

    let path = nameDevice1 + date + '/' + time + '/';

    let user_ref = my_database.ref(path);
    user_ref.on('value', function (snapshot) 
    {
        data1 = snapshot.val();

        if(data1.Co !== 'null')
        {
            valueGetCo1 = data1.Co;
        }

        if(data1.Gas !== 'null')
        {
            valueGetGas1 = data1.Gas;
        }
        
        if(data1.Bui !== 'null')
        {
            valueGetBui1 = data1.Bui;
        }

        document.getElementById("valueGetCo1").innerHTML = valueGetCo1;
        document.getElementById("valueGetGas1").innerHTML = valueGetGas1;
        document.getElementById("valueGetBui1").innerHTML = valueGetBui1;

        
    });

    // console.log();
}

var valueGetCo2;
var valueGetGas2;
var valueGetBui2;

function Get_Value_Display2() {
    let time = Create_Time_Need();
    let date = Create_Date_Need();

    let path = nameDevice2 + date + '/' + time + '/';

    let user_ref = my_database.ref(path);
    user_ref.on('value', function (snapshot) 
    {
        data2 = snapshot.val();

        if(data2.Co !== 'null')
        {
            valueGetCo2 = data2.Co;
        }

        if(data2.Gas !== 'null')
        {
            valueGetGas2 = data2.Gas;
        }
        
        if(data2.Bui !== 'null')
        {
            valueGetBui2 = data2.Bui;
        }

        document.getElementById("valueGetCo2").innerHTML = valueGetCo2;
        document.getElementById("valueGetGas2").innerHTML =  valueGetGas2;
        document.getElementById("valueGetBui2").innerHTML = valueGetBui2;
    });

    // console.log();
}

//================get value cài đặt
var valueSetCo1;
var valueSetGas1;
var valueSetBui1;

var valueSetCo2;
var valueSetGas2;
var valueSetBui2;

function Get_Value_Set1() 
{
    var user_ref = my_database.ref(nameDevice1 + 'value_set/');
  
    user_ref.on('value', function (snapshot) 
    {
        data = snapshot.val();

        valueSetCo1 = data.co;
        valueSetGas1 = data.gas;
        valueSetBui1 = data.bui;
    });
}

function Get_Value_Set2() 
{
    var user_ref = my_database.ref(nameDevice2 + 'value_set/');
  

    user_ref.on('value', function (snapshot) 
    {
        data = snapshot.val();

        valueSetCo2 = data.co;
        valueSetGas2 = data.gas;
        valueSetBui2 = data.bui;
    });
}
//========================trạng thái an toàn/ nguy hiểm=================
var countCo1 = 0;
var countGas1 = 0;
var countBui1 = 0;
var countAll1 = 0;

function Set_State_Current1() {
    
    if(valueGetCo1 >= valueSetCo1)
    {
        countCo1 = 1;
        countAll1 = 1;

        document.getElementById("status_current1").innerHTML = 'Nguy hiểm';
        document.getElementById("status_current1").style.color = "red";

        document.getElementById("logoCo1").style.color = "red";
        document.getElementById("logoCo1").style.fontWeight = "900";

        document.getElementById("valueGetCo1").style.color = "red";
        document.getElementById("valueGetCo1").style.fontWeight = "900";

        document.getElementById("donVi_Co1").style.color = "red";
        document.getElementById("donVi_Co1").style.fontWeight = "900";
    }
    
    if((valueGetCo1 < valueSetCo1) && ( countCo1 == 1))
    {
        countCo1 = 0;

        document.getElementById("logoCo1").style.color = "black";
        document.getElementById("logoCo1").style.fontWeight = "500";

        document.getElementById("valueGetCo1").style.color = "black";
        document.getElementById("valueGetCo1").style.fontWeight = "500";

        document.getElementById("donVi_Co1").style.color = "black";
        document.getElementById("donVi_Co1").style.fontWeight = "500";
    }

    if(valueGetGas1 >= valueSetGas1)
    {
        countGas1 = 1;
        countAll1 = 1;

        document.getElementById("status_current1").innerHTML = 'Nguy hiểm';
        document.getElementById("status_current1").style.color = "red";

        document.getElementById("logoGas1").style.color = "red";
        document.getElementById("logoGas1").style.fontWeight = "900";

        document.getElementById("valueGetGas1").style.color = "red";
        document.getElementById("valueGetGas1").style.fontWeight = "900";

        document.getElementById("donVi_Gas1").style.color = "red";
        document.getElementById("donVi_Gas1").style.fontWeight = "900";
    }

    if((valueGetGas1 < valueSetGas1) && (countGas1 == 1))
    {
        countGas1 = 0;

        document.getElementById("logoGas1").style.color = "black";
        document.getElementById("logoGas1").style.fontWeight = "500";

        document.getElementById("valueGetGas1").style.color = "black";
        document.getElementById("valueGetGas1").style.fontWeight = "500";

        document.getElementById("donVi_Gas1").style.color = "black";
        document.getElementById("donVi_Gas1").style.fontWeight = "500";
    }

    if(valueGetBui1 >= valueSetBui1)
    {
        countBui1 = 1;
        countAll1 = 1;

        document.getElementById("status_current1").innerHTML = 'Nguy hiểm';
        document.getElementById("status_current1").style.color = "red";

        document.getElementById("logoBui1").style.color = "red";
        document.getElementById("logoBui1").style.fontWeight = "900";

        document.getElementById("valueGetBui1").style.color = "red";
        document.getElementById("valueGetBui1").style.fontWeight = "900";

        document.getElementById("donVi_Bui1").style.color = "red";
        document.getElementById("donVi_Bui1").style.fontWeight = "900";
    }

    if((valueGetBui1 < valueSetBui1) && (countBui1 == 1))
    {
        countBui1 = 0;

        document.getElementById("logoBui1").style.color = "black";
        document.getElementById("logoBui1").style.fontWeight = "500";

        document.getElementById("valueGetBui1").style.color = "black";
        document.getElementById("valueGetBui1").style.fontWeight = "500";

        document.getElementById("donVi_Bui1").style.color = "black";
        document.getElementById("donVi_Bui1").style.fontWeight = "500";
    }

    if((valueGetCo1 < valueSetCo1)
    && (valueGetGas1 < valueSetGas1)
    && (valueGetBui1 < valueSetBui1) 
    && (countAll1 == 1))
    {
        countAll1 = 0;
        document.getElementById("status_current1").innerHTML = 'An toàn';
        document.getElementById("status_current1").style.color = "green";
    }
}

var countCo2 = 0;
var countGas2 = 0;
var countBui2 = 0;
var countAll2 = 0;

function Set_State_Current2() {
    
    if(valueGetCo2 >= valueSetCo2)
    {
        countCo2 = 1;
        countAll2 = 1;

        document.getElementById("status_current2").innerHTML = 'Nguy hiểm';
        document.getElementById("status_current2").style.color = "red";

        document.getElementById("logoCo2").style.color = "red";
        document.getElementById("logoCo2").style.fontWeight = "900";

        document.getElementById("valueGetCo2").style.color = "red";
        document.getElementById("valueGetCo2").style.fontWeight = "900";

        document.getElementById("donVi_Co2").style.color = "red";
        document.getElementById("donVi_Co2").style.fontWeight = "900";
    }
    
    if((valueGetCo2 < valueSetCo2) && ( countCo2 == 1))
    {
        countCo2 = 0;

        document.getElementById("logoCo2").style.color = "black";
        document.getElementById("logoCo2").style.fontWeight = "500";

        document.getElementById("valueGetCo2").style.color = "black";
        document.getElementById("valueGetCo2").style.fontWeight = "500";

        document.getElementById("donVi_Co2").style.color = "black";
        document.getElementById("donVi_Co2").style.fontWeight = "500";
    }

    if(valueGetGas2 >= valueSetGas2)
    {
        countGas2 = 1;
        countAll1 = 1;

        document.getElementById("status_current2").innerHTML = 'Nguy hiểm';
        document.getElementById("status_current2").style.color = "red";

        document.getElementById("logoGas2").style.color = "red";
        document.getElementById("logoGas2").style.fontWeight = "900";

        document.getElementById("valueGetGas2").style.color = "red";
        document.getElementById("valueGetGas2").style.fontWeight = "900";

        document.getElementById("donVi_Gas2").style.color = "red";
        document.getElementById("donVi_Gas2").style.fontWeight = "900";
    }

    if((valueGetGas2 < valueSetGas2) && (countGas2 == 1))
    {
        countGas2 = 0;

        document.getElementById("logoGas2").style.color = "black";
        document.getElementById("logoGas2").style.fontWeight = "500";

        document.getElementById("valueGetGas2").style.color = "black";
        document.getElementById("valueGetGas2").style.fontWeight = "500";

        document.getElementById("donVi_Gas2").style.color = "black";
        document.getElementById("donVi_Gas2").style.fontWeight = "500";
    }

    if(valueGetBui2 >= valueSetBui2)
    {
        countBui2 = 1;
        countAll2 = 1;

        document.getElementById("status_current2").innerHTML = 'Nguy hiểm';
        document.getElementById("status_current2").style.color = "red";

        document.getElementById("logoBui2").style.color = "red";
        document.getElementById("logoBui2").style.fontWeight = "900";

        document.getElementById("valueGetBui2").style.color = "red";
        document.getElementById("valueGetBui2").style.fontWeight = "900";

        document.getElementById("donVi_Bui2").style.color = "red";
        document.getElementById("donVi_Bui2").style.fontWeight = "900";
    }

    if((valueGetBui2 < valueSetBui2) && (countBui2 == 1))
    {
        countBui2 = 0;

        document.getElementById("logoBui2").style.color = "black";
        document.getElementById("logoBui2").style.fontWeight = "500";

        document.getElementById("valueGetBui2").style.color = "black";
        document.getElementById("valueGetBui2").style.fontWeight = "500";

        document.getElementById("donVi_Bui2").style.color = "black";
        document.getElementById("donVi_Bui2").style.fontWeight = "500";
    }

    if((valueGetCo2 < valueSetCo2)
    && (valueGetGas2 < valueSetGas2)
    && (valueGetBui2 < valueSetBui2) 
    && (countAll2 == 1))
    {
        countAll2 = 0;
        document.getElementById("status_current2").innerHTML = 'An toàn';
        document.getElementById("status_current2").style.color = "green";
    }
}


// ======================================  Draw chart ==============================
var chart_hour = [];
var chart_minute = [];
var chartTimeCurrent = [];

var timeCurrent = [];

function Chart_Hour_Current() {
    var result = 0;

    for(let i = 0; i < 24; i++)
    {
        result = Extra_Zero_For_Number_String_Small(i);
        chart_hour[i] = result;
    }
}

function Chart_Minute_Current() {
    var result = 0;

    for(let i = 0; i < 60; i++)
    {
        result = Extra_Zero_For_Number_String_Small(i);
        chart_minute[i] = result;
    }
}

function Extra_Time()
{
    Chart_Hour_Current();

    Chart_Minute_Current();

    var count = 0;

    for(let i = 0; i < 24; i++)
    {
        for(let j = 0; j < 60; j++)
        {
            chartTimeCurrent[count] = chart_hour[i] + chart_minute[j];
            count++;
        }
    }
}

Extra_Time();

var dataCo;
var dataGas;
var dataBui;
var data_get_chart;
var data_get_chart2;

function Get_Data_Sensor_When_StartUp() 
{    
    var date_need = Create_Date_Need();

    //1
    let path = nameDevice1 + date_need + '/';
    let user_ref = my_database.ref(path);
    user_ref.on('value', function (snapshot) 
    {
        data = snapshot.val();
        data_get_chart = data;
    });

    //2
    let path2 = nameDevice2 + date_need + '/';
    let user_ref2 = my_database.ref(path2);
    user_ref2.on('value', function (snapshot) 
    {
        data22 = snapshot.val();
        data_get_chart2 = data22;
    });
}


let myChart = Highcharts.chart('home_page__chart--display', {

    chart: {
            //Cho phép phóng to thu nhỏ
        zoomType: 'x',
        // Làm bo tròn đồ thị (không còn là đường thẳng nối với nhau)
        type: 'line' 
    },

    // tên biểu đồ
    title: {
        text:  'Biểu đồ đường thời gian thực thiết bị 1',
        style: {
            color: '#FF00FF',
            fontWeight: 'bold'
        },
        align: 'center'
    },

    subtitle: {
        text: 'Source: <a href="#" target="_blank"> Duc Dat Nguyen  </a>',
        align: 'left'
    },

    // trục ngang
    xAxis: {
        categories: 
            ['00:00'],
        title: 
        {
            text: 'Thời gian (phút)'
        },
    },

    // Trục dọc
    yAxis: {
        title: {
            text: 'Giá trị (ppm)'
        },
        min: 0
    },

    tooltip: {
        shared: true,
        useHTML: true,

        headerFormat: '<table><tr><th colspan="2">Thời gian: {point.key}</th></tr>',

        pointFormat: '<tr><td style="color: {series.color}">{series.name} </td>' +
            '<td style="text-align: right"><b>{point.y} ppm</b></td></tr>',

        footerFormat: '</table>',
        
        valueDecimals: 0
    },

    //Làm gì với điểm trên đồ thị
    plotOptions: {
        area: {
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        },

        series: {
            cursor: 'pointer',
            marker: {
                enabled: true,
                radius: 5,
            },

            events: {
                click: function () {
                    alert('Thời gian hiện tại:' + '\n\n' + timeCurrent);
                }
            }
        }
    },

    // Lable line value
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    rangeSelector: {
        selected: 1
    },

    // Line value
    series: [
    {
        name: 'Nồng độ Co',
        color: 'red',

        data: [{y: 0, lable: "00:00"}]
    },

    {
        name: 'Nồng độ Gas',
        color: 'black',
        data: [{y: 10, lable: "00:00"}]
    },

    {
        name: 'Nồng độ Bụi',
        color: 'blue',
        data: [{y: 20, lable: "00:00"}]
    }
    ]
});

let myChart2 = Highcharts.chart('home_page__chart--display2', {

    chart: {
            //Cho phép phóng to thu nhỏ
        zoomType: 'x',
        // Làm bo tròn đồ thị (không còn là đường thẳng nối với nhau)
        type: 'line' 
    },

    // tên biểu đồ
    title: {
        text:  'Biểu đồ đường thời gian thực thiết bị 2',
        style: {
            color: '#FF00FF',
            fontWeight: 'bold'
        },
        align: 'center'
    },

    subtitle: {
        text: 'Source: <a href="#" target="_blank"> Duc Dat Nguyen  </a>',
        align: 'left'
    },

    // trục ngang
    xAxis: {
        categories: 
            ['00:00'],
        title: 
        {
            text: 'Thời gian (phút)'
        },
    },

    // Trục dọc
    yAxis: {
        title: {
            text: 'Giá trị (ppm)'
        },
        min: 0
    },

    tooltip: {
        shared: true,
        useHTML: true,

        headerFormat: '<table><tr><th colspan="2">Thời gian: {point.key}</th></tr>',

        pointFormat: '<tr><td style="color: {series.color}">{series.name} </td>' +
            '<td style="text-align: right"><b>{point.y} ppm</b></td></tr>',

        footerFormat: '</table>',
        
        valueDecimals: 0
    },

    //Làm gì với điểm trên đồ thị
    plotOptions: {
        area: {
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        },

        series: {
            cursor: 'pointer',
            marker: {
                enabled: true,
                radius: 5,
            },

            events: {
                click: function () {
                    alert('Thời gian hiện tại:' + '\n\n' + timeCurrent);
                }
            }
        }
    },

    // Lable line value
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    rangeSelector: {
        selected: 1
    },

    // Line value
    series: [
    {
        name: 'Nồng độ Co',
        color: 'red',

        data: [{y: 0, lable: "00:00"}]
    },

    {
        name: 'Nồng độ Gas',
        color: 'black',
        data: [{y: 10, lable: "00:00"}]
    },

    {
        name: 'Nồng độ Bụi',
        color: 'blue',
        data: [{y: 20, lable: "00:00"}]
    }
    ]
});

let myChart3 = Highcharts.chart('home_page__chart--display3', {

    chart: {
            //Cho phép phóng to thu nhỏ
        zoomType: 'x',
        // Làm bo tròn đồ thị (không còn là đường thẳng nối với nhau)
        type: 'line' 
    },

    // tên biểu đồ
    title: {
        text:  'Biểu đồ đường thời gian thực',
        style: {
            color: '#FF00FF',
            fontWeight: 'bold'
        },
        align: 'center'
    },

    subtitle: {
        text: 'Source: <a href="#" target="_blank">Dang Thi Nhien</a>',
        align: 'left'
    },

    // trục ngang
    xAxis: {
        categories: 
            ['00:00', '00:01'],
        title: 
        {
            text: 'Thời gian (phút)'
        },
    },

    // Trục dọc
    yAxis: {
        title: {
            text: 'Giá trị (ppm)'
        },
        min: 0
    },

    tooltip: {
        shared: true,
        useHTML: true,

        headerFormat: '<table><tr><th colspan="2">Thời gian: {point.key}</th></tr>',

        pointFormat: '<tr><td style="color: {series.color}">{series.name} </td>' +
            '<td style="text-align: right"><b>{point.y} ppm</b></td></tr>',

        footerFormat: '</table>',
        
        valueDecimals: 0
    },

    //Làm gì với điểm trên đồ thị
    plotOptions: {
        area: {
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        },

        series: {
            cursor: 'pointer',
            marker: {
                enabled: true,
                radius: 5,
            },

            events: {
                click: function () {
                    alert('Thời gian hiện tại:' + '\n\n' + timeCurrent);
                }
            }
        }
    },

    // Lable line value
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    rangeSelector: {
        selected: 1
    },

    // Line value
    series: [
    {
        name: 'Nồng độ Co',
        color: 'red',

        data: [{y: 0, lable: "00:00"}]
    },

    {
        name: 'Nồng độ Gas',
        color: 'black',
        data: [{y: 10, lable: "00:00"}]
    },

    {
        name: 'Nồng độ Bụi',
        color: 'blue',
        data: [{y: 20, lable: "00:00"}]
    }
    ]
});


//=============================== Automatic run after 500ms=====================
function Run_Automation_Fast()
{
    Get_Time_Current();
    Replace_Time_Current();
}
setInterval(Run_Automation_Fast, 1200);


var count_one_slow = 0;
function Run_Automation_Slow()
{
    timeCurrent = Date_And_Time_Current();

    count_one_slow++;
    if(count_one_slow == 20)
    {
        count_one_slow = 0;

        Get_Value_Set1();
        Get_Value_Set2();
    }
    
    Set_State_Current1();
    Get_Value_Display1();

    Set_State_Current2();
    Get_Value_Display2();
}
setInterval(Run_Automation_Slow, 15000);


var dataCo_News = [];
var dataGas_News = [];
var dataBui_News = [];
var lable_News = [];

var dataCo_News2 = [];
var dataGas_News2 = [];
var dataBui_News2 = [];

function Run_Automation_Minutes()
{
    time_New = Create_Time_Need();
    var _time_New = ['00:00'];
    _time_New = time_New.substring(0, 2) + ':' + time_New.substring(2);
    lable_News.push(_time_New);

    //1
    dataCo_News.push(valueGetCo1);
    myChart.series[0].setData(dataCo_News);

    myChart.xAxis[0].update({
        categories: lable_News
    });

    dataGas_News.push(valueGetGas1);
    myChart.series[1].setData(dataGas_News);

    dataBui_News.push(valueGetBui1);
    myChart.series[2].setData(dataBui_News);

    //2
    dataCo_News2.push(valueGetCo2);
    myChart2.series[0].setData(dataCo_News2);

    myChart2.xAxis[0].update({
        categories: lable_News
    });

    dataGas_News2.push(valueGetGas2);
    myChart2.series[1].setData(dataGas_News2);

    dataBui_News2.push(valueGetBui2);
    myChart2.series[2].setData(dataBui_News2);
}
setInterval(Run_Automation_Minutes, 25000);

function Run_One_Time() {
    Get_Value_Set1();
    Get_Value_Set2();

    Set_State_Current1();
    Get_Value_Display1();

    Set_State_Current2();
    Get_Value_Display2();
}

var coutRun_StartUp = 0;
function Run_StartUp()
{
    if(coutRun_StartUp == 0)
    {
        Get_Data_Sensor_When_StartUp();

        Run_One_Time();

        if((typeof data_get_chart)  !== "undefined") 
        {
            coutRun_StartUp = 1;
        }
    }

    if(coutRun_StartUp == 1)
    {
        var _i = 0;

        for(_i = 0; _i < (60*24); _i++)
        {
            if((typeof data_get_chart[chartTimeCurrent[_i]]) !== 'undefined')
            {
                var _time_temp = chartTimeCurrent[_i];
                _time_temp = _time_temp.substring(0, 2) + ':' + _time_temp.substring(2);
                lable_News.push(_time_temp);

                dataCo_News.push(data_get_chart[chartTimeCurrent[_i]].Co);
                dataGas_News.push(data_get_chart[chartTimeCurrent[_i]].Gas);
                dataBui_News.push(data_get_chart[chartTimeCurrent[_i]].Bui);
            }

            if((typeof data_get_chart2[chartTimeCurrent[_i]]) !== 'undefined')
            {
                dataCo_News2.push(data_get_chart2[chartTimeCurrent[_i]].Co);
                dataGas_News2.push(data_get_chart2[chartTimeCurrent[_i]].Gas);
                dataBui_News2.push(data_get_chart2[chartTimeCurrent[_i]].Bui);
            }
        }

        //1
        myChart.series[0].setData(dataCo_News);
        myChart.series[1].setData(dataGas_News);
        myChart.series[2].setData(dataBui_News);

        myChart.xAxis[0].update({
            categories: lable_News
        });

        //2
        myChart2.series[0].setData(dataCo_News2);
        myChart2.series[1].setData(dataGas_News2);
        myChart2.series[2].setData(dataBui_News2);

        myChart2.xAxis[0].update({
            categories: lable_News
        });
        
        coutRun_StartUp = 2;
    }
}
setInterval(Run_StartUp, 300);


//========================= Choose day to display==================================

var daySearch = 0, monthSearch = 0, yearSearch = 0, nameDeviceSearch = 0;

function Input_Data_Need_Search() {
    daySearch = document.getElementById("days_display").value;
    monthSearch = document.getElementById("months_display").value;
    yearSearch = document.getElementById("years_display").value;
    nameDeviceSearch = document.getElementById("device_display").value;

    daySearch = parseInt(daySearch);
    monthSearch = parseInt(monthSearch);
    yearSearch = parseInt(yearSearch);
    nameDeviceSearch = parseInt(nameDeviceSearch);

    //fix lỗi
    // daySearch = 26;
    // monthSearch = 12;
    // yearSearch = 2022;
    // nameDeviceSearch = 5;
}

function Delete_Input_Search() {
    document.getElementById("days_display").value = '1';
    document.getElementById("months_display").value = '12';
    document.getElementById("years_display").value = '2022';
    document.getElementById("device_display").value = '5';
}

var dataCo_News3 = [];
var dataGas_News3 = [];
var dataBui_News3 = [];
var lable_News3 = [];
var data_333;

var countOK = 0;

function Get_Data_In_Day_Want() 
{    
    if(countOK !== 0)
    {
        return 0;
    }

    daySearch = Extra_Zero_For_Number_Small(daySearch);
    monthSearch = Extra_Zero_For_Number_Small(monthSearch);

    var date_need = (daySearch.toString() + monthSearch.toString() + (yearSearch % 2000).toString());

    let path = 'Box' + nameDeviceSearch + '/' + date_need + '/';

    let user_ref = my_database.ref(path);
    user_ref.on('value', function (snapshot) 
    {
        data_333 = snapshot.val();
        //data_333 = data_1;
    });

    if(data_333 === null)
    {
        return 10;
    }
    else if(typeof data_333 === 'undefined')
    {
        return 1;
    }
    else
    {
        countOK = 1;
    }

    for(_i = 0; _i < (60*24); _i++)
    {
        if((typeof data_333[chartTimeCurrent[_i]]) !== 'undefined')
        {
            var _time_temp = chartTimeCurrent[_i];
            _time_temp = _time_temp.substring(0, 2) + ':' + _time_temp.substring(2);
            lable_News3.push(_time_temp);

            dataCo_News3.push(data_333[chartTimeCurrent[_i]].Co);
            dataGas_News3.push(data_333[chartTimeCurrent[_i]].Gas);
            dataBui_News3.push(data_333[chartTimeCurrent[_i]].Bui);  
        }
    } 

    myChart3.series[0].setData(dataCo_News3);
    myChart3.series[1].setData(dataGas_News3);
    myChart3.series[2].setData(dataBui_News3);

    myChart3.xAxis[0].update({
        categories: lable_News3
    });

    return 6;
}

function Clear_All_Data_Search()
{
    var _len =  dataCo_News3.length;

    for(var i=0; i < _len; i++)
    {
        dataCo_News3.pop();
        dataGas_News3.pop();
        dataBui_News3.pop();
        lable_News3.pop();
    }
}

document.getElementById("display_chart_new").onclick = function () {
    Input_Data_Need_Search();

    var result = Get_Data_In_Day_Want();
    Get_Data_In_Day_Want();

    if(result == 10)
    {
        Clear_All_Data_Search();
        countOK = 0;

        alert('Thời gian không tồn tại hoặc thiết bị không tồn tại. \nXin kiểm tra lại.');
    }
    if(result == 1)
    {
        Clear_All_Data_Search();
        countOK = 0;
        //alert("Nhấn thêm lần nữa.");
    }
    else  if(result == 6)
    {
        document.getElementById("home_page__chart--display3").style.height = "400px"; 
        document.getElementById("home_page__chart--display3").style.marginTop = "30px";
    }
}


document.getElementById("clears_input").onclick = function () 
{
    countOK = 0;
    
    Clear_All_Data_Search();
    Clear_All_Data_Search();
    Clear_All_Data_Search();

    Delete_Input_Search();

    document.getElementById("home_page__chart--display3").style.height = "0px";
    document.getElementById("home_page__chart--display3").style.marginTop = "0px";  
}
