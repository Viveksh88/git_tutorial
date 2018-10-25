<?php
include_once("Con.php");
$data = array();
// For Inserting Data into DataBase..

if(isset($_POST['username'])){
    $name = $_POST['username'];
    $email = $_POST['email'];
    $msg = $_POST['message'];
    $date = $_POST['date'];

    $insert_query = mysqli_query($con,"INSERT INTO ajax(name,email,message,date) VALUES('$name','$email','$msg','$date')");     
}

// For Getting Data from DataBase....
$sql_query = mysqli_query($con,"SELECT * FROM ajax ORDER BY Id DESC LIMIT 5");

while($row = mysqli_fetch_array($sql_query)) 
{
   $name = $row['name'];
   $email = $row['email'];
   $msg = $row['message'];
   $date = $row['date'];

   $data[] = array(
       "name" =>$name,
       "email" =>$email,
       "msg" =>$msg,
       "date" =>$date
    );
}
echo json_encode($data);
?>