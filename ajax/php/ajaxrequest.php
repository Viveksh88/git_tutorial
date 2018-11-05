<?php
include_once("Con.php");

$page='';
$data = array();
// For Inserting Data into DataBase..

if(isset($_POST['username'])){
    $name = $_POST['username'];
    $email = $_POST['email'];
    $msg = $_POST['message'];
    $date = $_POST['date'];

    $insert_query = mysqli_query($con,"INSERT INTO ajax (name,email,message,date) VALUES('$name','$email','$msg','$date')");     
}
// Data insertion ends here..
// Data extraction starts from here..
if(isset($_GET['page'])){
    $page = $_GET["page"]; 
}else{
    $page = 1;
}
$record_per_page = $_GET["per_page"];
$start_from = ($page - 1)*$record_per_page; 
 
// For Getting Data from DataBase....
$sql_query = mysqli_query($con,"SELECT * FROM ajax ORDER BY Id ASC LIMIT $start_from,$record_per_page");

while($row = mysqli_fetch_array($sql_query)) {
   $id = $row['id'];
   $name = $row['name'];
   $email = $row['email'];
   $msg = $row['message'];
   $date = $row['date'];

   $data[] = array(
       "id" =>$id,
       "name" =>$name,
       "email" =>$email,
       "msg" =>$msg,
       "date" =>$date
    );
}
echo json_encode($data);  
?>