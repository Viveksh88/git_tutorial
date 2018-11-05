$(document).ready(function(){
    var per_page=5;
    var page;
    var row_id;

    calling_functions();
    

    function calling_functions(){
        getData(page,per_page);
        load_pagination(per_page);      
    } 
    // Getting data per_page user want to see..
    $(".per_page_data").click(function(value){
        per_page = value.currentTarget.innerHTML;  
        calling_functions();     
    });
    
    // Event to Reset Data  after submitting Modal-form
        $('body').on('hidden.bs.modal', '.modal', function () { 
            $(this).find('input[type="text"],input[type="email"],input[type="date"],textarea').each(function(){
              if(this.defaultValue != '' || this.value != this.defaultValue) {
                   this.value = this.defaultValue; 
                } else { 
                  this.value = '';
                }
            }); 
          }); 
        //   Event ends Headers...

        // sending Data Into Database using Ajax...
         
    $("#submit").click(function(value){
        // console.log(value);
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
                    var id = response[i].id;
                    var name = response[i].name;
                    var email = response[i].email;
                    var message = response[i].msg;
                    var Date = response[i].date;

                    var tr_str = '<tr id="'+id+'">'+
                        
                        "<td class='row_data name'>" + name + "</td>" +
                        "<td class='row_data email'>" + email + "</td>" +
                        "<td class='row_data message'>" + message + "</td>" +
                        "<td class='row_data date'>" + Date + "</td>" +
                        "</tr>";
                        $("#userTable").append(tr_str);   
                }
                edit();
                submit_edit_data();
            }
        });   
    } 
        // make div editable > start
    function edit(){
        $(document).on('dblclick', '.row_data', function(event) 
        {
            event.preventDefault(); 
            //make div editable
            $(this).closest('tr').attr('contenteditable', 'true');
            $(this).focus();            
        });
    }
    // make div editable > end

    function submit_edit_data(){
        $(document).on('focusout keyup', 'tr', function(event){
            if(event.keyCode == 13){
               var id = $(this).attr('id'); 
               var name = $(this).find('.name').text();
               var email = $(this).find('.email').text();
               var msg = $(this).find('.message').text();
               var date = $(this).find('.date').text();
               $.ajax({
                    url:'../php/editdata.php',
                    type:'POST',
                    data:{id:id,name:name,email:email,msg:msg,date:date},
                    success:function(){
                        calling_functions();                               
                    },
                    error:function(){
                        alert("Error");
                    }    
                });
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
   }); 
});