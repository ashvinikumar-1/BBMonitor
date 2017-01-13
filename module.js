function display() {
    var url = window.location.search;
    var params = {};
    var param_array = window.location.href.split('?')[1].split('&');
    for(var i in param_array){
        x = param_array[i].split('=');
        params[x[0]] = x[1];
    }
    $.ajax({
        url: '/rest/monitor/get-registered-modules',
        headers: {
            "username": "inblox",
            "sessionId": params.sessionId,
            "content-type": "application/json"
        },
        method: "GET",
        success:function(data2){
            var x=[];
            for(var i=0;i<8;i++){
                x.push(data2[i].moduleId+' -> '+data2[i].status);
            }
            document.getElementById('demo').innerHTML = x[0];
            document.getElementById('demo1').innerHTML = x[1];
            document.getElementById('demo2').innerHTML = x[2];
            document.getElementById('demo3').innerHTML = x[3];
            document.getElementById('demo4').innerHTML = x[4];
            document.getElementById('demo5').innerHTML = x[5];
            document.getElementById('demo6').innerHTML = x[6];
            document.getElementById('demo7').innerHTML = x[7];
        },
        error:function(data1){
            alert("error");
        }
    });       
}
function displayUserdata()
{
    var url = window.location.search;
    var params = {};
    var param_array = window.location.href.split('?')[1].split('&');
    for(var i in param_array){
        x = param_array[i].split('=');
        params[x[0]] = x[1];
    }
    $.ajax({
        url: '/rest/monitor-redis/get-number-of-users',
        headers: {
            "username": "inblox",
            "sessionId": params.sessionId,
            "content-type": "application/json"
        },
        method: "GET",
        success:function(data2){
            document.getElementById('totalusers').innerHTML = data2.total;
            document.getElementById('activeusers').innerHTML =data2.active;
            document.getElementById('inactiveusers').innerHTML =data2.inactive;
            document.getElementById('totaluser').innerHTML = data2.total;
            document.getElementById('activeuser').innerHTML =data2.active;
            document.getElementById('inactiveuser').innerHTML =data2.inactive;

        },
        error:function(data1){
            alert("error");
        }
    });       
}
function displayUserinfo()
{
    var url = window.location.search;
    var params = {};
    var param_array = window.location.href.split('?')[1].split('&');
    for(var i in param_array){
        x = param_array[i].split('=');
        params[x[0]] = x[1];
    }
    $.ajax({
        url: '/rest/monitor-redis/get-list-of-users',
        headers: {
            "username": "inblox",
            "sessionId": params.sessionId,
            "content-type": "application/json"
        },
        method: "GET",
        success:function(data2){
            var email="";
            for(var i=0;i<data2.userDetail.length;i++)
            {
                email=email+'<a href="#">'+data2.userDetail[i].inbloxUserId+'</a>'+'<br>';
            }
            document.getElementById('justdemo').innerHTML = email;
        },
        error:function(data1){
            alert("error");
        }
    });       
}

function logout() 
{
    window.location.replace("http://localhost:9999/project/login/index.html")
}

function systemHealth()
{
    var url = window.location.search;
    var params = {};
    var param_array = window.location.href.split('?')[1].split('&');
    for(var i in param_array){
        x = param_array[i].split('=');
        params[x[0]] = x[1];
    }
    $.ajax({
        url: '/rest/monitor/get-registered-modules',
        headers: {
            "username": "inblox",
            "sessionId": params.sessionId,
            "content-type": "application/json"
        },
        method: "GET",
        success:function(data2){
            var x=[];
            console.log(data2);
            var j=0;
            for(var i=0;i<(data2.length)*4;i=i+4){
                $("#add_svg").append("<div class='system-health__content__header'>"+data2[j].moduleName+"</div><div class='graph-wrapper'><div class='fleft graph'>CPU INFO<div id='cont"+i+"' data-pct='100'><svg id='svg"+i+"' width='200' height='200' viewPort='0 0 100 100'><circle r='90' cx='100' cy='100' fill='transparent' stroke-dasharray='565.j8' stroke-dashoffset='0'></circle><circle id='bar"+i+"' r='90' cx='100' cy='100' fill='transparent' stroke-dasharray='565.48' stroke-dashoffset='0'></circle></svg></div><div>USED:"+ Math.floor(data2[j].sysInfo.cpuInfo.idleTimeUsedPercent)+"</div><div>REMAINING:"+(100-  Math.floor(data2[j].sysInfo.cpuInfo.idleTimeUsedPercent))+"</div></div><div class='fleft graph'>Memory<div id='cont"+(i+1)+"' data-pct='100'><svg id='svg"+(i+1)+"' width='200' height='200' viewPort='0 0 100 100'><circle r='90' cx='100' cy='100' fill='transparent' stroke-dasharray='565.48' stroke-dashoffset='0'></circle><circle id='bar"+(i+1)+"' r='90' cx='100' cy='100' fill='transparent' stroke-dasharray='565.48' stroke-dashoffset='0'></circle></svg></div><div>USED:"+(100-Math.floor(data2[j].sysInfo.memoryInfo.usedPercentage))+"</div><div>REMAINING:"+Math.floor(data2[j].sysInfo.memoryInfo.usedPercentage)+"</div></div><div class='fleft graph'>FILESYSTEM-1 INFO<div id='cont"+(i+2)+"' data-pct='100'><svg id='svg"+(i+2)+"' width='200' height='200' viewPort='0 0 100 100'><circle r='90' cx='100' cy='100' fill='transparent' stroke-dasharray='565.48' stroke-dashoffset='0'></circle><circle id='bar"+(i+2)+"' r='90' cx='100' cy='100' fill='transparent' stroke-dasharray='565.48' stroke-dashoffset='0'></circle></svg></div><div>USED:"+Math.floor(((data2[j].sysInfo.filesystemInfo[0].diskInfo.usedSizeKilobytes)*0.0000009537))+"GB</div><div>REMAINING:"+Math.floor(((data2[j].sysInfo.filesystemInfo[0].diskInfo.totalSizeKilobytes)*0.0000009537))+"GB</div></div><div class='fleft graph'>FILESYSTEM-2 INFO<div id='cont"+(i+3)+"' data-pct='100'><svg id='svg"+(i+3)+"' width='200' height='200' viewPort='0 0 100 100'><circle r='90' cx='100' cy='100' fill='transparent' stroke-dasharray='565.48' stroke-dashoffset='0'></circle><circle id='bar"+(i+3)+"' r='90' cx='100' cy='100' fill='transparent' stroke-dasharray='565.48' stroke-dashoffset='0'></circle></svg></div><div>USED:"+Math.floor(((data2[j].sysInfo.filesystemInfo[1].diskInfo.usedSizeKilobytes)))+"KB</div><div>REMAINING:"+Math.floor(((data2[j].sysInfo.filesystemInfo[1].diskInfo.totalSizeKilobytes)*0.0000009537))+"GB</div></div></div>");

                j=j+1;
                var $circle = $('#svg'+i+' #bar'+i+'');
                var $circle1 = $('#svg'+(i+1)+' #bar'+(i+1)+''); 
                var $circle2 = $('#svg'+(i+2)+' #bar'+(i+2)+''); 
                 var $circle3 = $('#svg'+(i+3)+' #bar'+(i+3)+''); 
                var val=70;   
                var val1=50;
                var val2=40;
                var val3=30;
                if (isNaN(val)) {
                    val = 100; 
                }
                else{
                    var r = $circle.attr('r'); 
                    var r1 = $circle1.attr('r'); 
                    var r2 = $circle2.attr('r'); 
                    var r3 = $circle3.attr('r');
                    var c = Math.PI*(r*2); 
                    var c1 = Math.PI*(r1*2);
                    var c2 = Math.PI*(r2*2);
                    var c3 = Math.PI*(r3*2);
                    if (val < 0) { val = 0;} if (val1 < 0) { val1 = 0;} if (val2 < 0) { val2 = 0;} if (val3 < 0) { val3 = 0;}
                    if (val > 100) { val = 100;}  if (val1 > 100) { val1 = 100;}  if (val2 > 100) { val2 = 100;} 
                    if (val3 > 100) { val3 = 100;}

                    var pct = ((100-val)/100)*c; 
                    var pct1 = ((100-val1)/100)*c1;
                    var pct2 = ((100-val2)/100)*c2;
                    var pct3 = ((100-val3)/100)*c3;

                    $circle.css({ strokeDashoffset: pct});
                    $circle1.css({ strokeDashoffset: pct1});
                    $circle2.css({ strokeDashoffset: pct2});
                    $circle3.css({ strokeDashoffset: pct3});

                    $('#cont'+i+'').attr('data-pct',val);
                    $('#cont'+(i+1)+'').attr('data-pct',val1);
                      $('#cont'+(i+2)+'').attr('data-pct',val2);
                      $('#cont'+(i+3)+'').attr('data-pct',val3);
                }

            }
        },
        error:function(data1){
            alert("error");
        }
    });       

}
display();
displayUserdata();
displayUserinfo();
systemHealth();



