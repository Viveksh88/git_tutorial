<?php
include_once("Con.php");
if(isset($_POST['id'])){
    $id =  $_POST['id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $msg = $_POST['msg'];
    $date = $_POST['date'];
    $insert_query = mysqli_query($con,"UPDATE ajax SET name= '$name',email= '$email',
    message='$msg',date='$date' WHERE Id='$id'");
}