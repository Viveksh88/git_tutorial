$(document).ready(function(){
    // Timer inbuilt Function Call Every 5 seconds...
    setInterval(function(){
            getData();
        },5000);

        $('body').on('hidden.bs.modal', '.modal', function () { 
            $(this).find('input[type="text"],input[type="email"],input[type="date"],textarea').each(function(){
              if (this.defaultValue != '' || this.value != this.defaultValue) {
                   this.value = this.defaultValue; 
              } else { 
                  this.value = '';
              }
            }); 
          }); 
        
        // sending Data Into Database using Ajax...
         
    $("#submit").click(function(){
        var reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        var name = $('#inputName').val();
        var email = $('#inputEmail').val();
        var message = $('#inputMessage').val();
        var date = $('#inputDate').val();
        if(name.trim() == '' ){
            alert('Please enter your name.');
            $('#inputName').focus();
            return false;
        }else if(email.trim() == ''){
            alert('Please enter your email.');
            $('#inputEmail').focus();
            return false;
        }else if(email.trim() != '' && !reg.test(email)){
            alert('Please enter a valid email address.');
            $('#inputEmail').focus();
            return false;
        }else if(message.trim() == '' ){
            alert('Please enter your message.');
            $('#inputMessage').focus();
            return false;
        }
        else if(date.trim() == '' ){
            alert('Please enter Valid Date.');
            $('#inputDate').focus();
            return false;
        }else{
            $.ajax({
                url:'../php/ajaxrequest.php',
                type:'post',
                data:$('form.user_data').serialize(),
                success:function(){
                    alert("Your form has been Submitted successfully");
                    $("#myModal").modal('hide');
                    getData();                
                },
                error:function(){
                    alert("Error");
                }    
            });
        }
    });
    
    //    Getting Data From Database using Ajax in Json SVGFEColorMatrixElement..
    function getData(){     
        $.ajax({
            url: '../php/ajaxrequest.php',
            type: 'get',
            dataType: 'JSON',
            success: function(response){
                var len = response.length;
                $("#userTable").html("");
                for(var i=0; i<len; i++){
                    var name = response[i].name;
                    var email = response[i].email;
                    var message = response[i].msg;
                    var Date = response[i].date;

                    var tr_str = "<tr>" +
                        
                        "<td>" + name + "</td>" +
                        "<td>" + email + "</td>" +
                        "<td>" + message + "</td>" +
                        "<td>" + Date + "</td>" +
                        "</tr>";
                        $("#userTable").append(tr_str);   
                }
            }
        });
    }
});