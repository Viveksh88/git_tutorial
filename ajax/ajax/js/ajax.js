$(document).ready(function(){
    var per_page=5;
    var Time;
    var page;

    calling_functions();

    function calling_functions(){
        interval();
        getData(page,per_page);
        load_pagination(per_page);
    } 
    // Getting data per_page user want to see..
    $(".per_page_data").click(function(value){
        per_page = value.currentTarget.innerHTML;  
        calling_functions();    
    });
    // Page refresh function Every 5sec.
    function interval(){
        Time = setInterval(function(){
            getData(page,per_page),load_pagination(per_page);
        },5000);
    } 
    // Refresh function Ends here..
    
    // Event to Reset Data  after submitting Modal-form
        $('body').on('hidden.bs.modal', '.modal', function () { 
            $(this).find('input[type="text"],input[type="email"],input[type="date"],textarea').each(function(){
              if (this.defaultValue != '' || this.value != this.defaultValue) {
                   this.value = this.defaultValue; 
              } else { 
                  this.value = '';
              }
            }); 
          }); 
        //   Event ends Headers...

        
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
                    calling_functions();     
                    if(page>1){
                        clearInterval(Time); 
                    }  
                },
                error:function(){
                    alert("Error");
                }    
            });
        }
    });
    // Sending data Ends....
    
    //    Getting Data From Database using Ajax in Json formate..
    function getData(page,per_page){     
        $.ajax({
            url: "../php/ajaxrequest.php",
            type: "get",
            data:{page:page,per_page:per_page},
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
    // Getting Data function Ends Here...

    // Pagination function....
    function load_pagination(per_page)  
    {  
        $.ajax({  
            url:"../php/pagination.php",  
            method:"GET",  
            data: {per_page:per_page},
                success:function(data){  
                    $('#pagination_data').html(data);  
                }  
        }); 
    }
    // Pagination function Ends here...
    
    // Pagination-Link click Event to change page as we click on next link...
    $(document).on('click', '.page-link', function(){  
        var page = $(this).attr("id"); 
        getData(page,per_page); 
        if(page==1){
            interval();
        }else{
            clearInterval(Time); 
        }
   }); 
});