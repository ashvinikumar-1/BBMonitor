function display(form){
    var inpObj = form.username.value;
    var inpObj2 = form.password.value;
   
    if (inpObj == "") {
       alert("username should not be empty");
    }
    else if(inpObj2 == ""){
        alert("password should not be empty");
    }
    else {
    var auth = {};
    auth.userName=form.username.value;
    auth.password=form.password.value; 
    $.ajax({
    url: '/rest/monitor/authenticate',
    data:JSON.stringify(auth),
    headers: {
    "content-type": "application/json"
    },
    method: 'POST',
     success:function(data2){
        alert("invalid user name and password");
         console.log(data2);
     },
         error:function(data1){
          console.log(data1);
             userName=form.username.value;
             var sessionId=data1.responseText; 
             if(data1.statusText == "Bad Gateway"){alert("check your network connection");}
             else{
            location='/newAPIproject/dash.html?sessionId='+ sessionId+'&userName='+userName;
             }
        }
  });   
}
}
