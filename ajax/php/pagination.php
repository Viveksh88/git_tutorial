<?php
include_once("Con.php");

$record_per_page = $_GET["per_page"];
$output='';
$query = mysqli_query($con,"SELECT * FROM ajax");
$total_records = mysqli_num_rows($query);  
 $total_pages = Ceil($total_records/$record_per_page);  
 for($i=1; $i<=$total_pages; $i++) {  
      $output = "<li class='page-item'><a class='page-link' href='#'id='".$i."'>".$i."</a></li>";  
      echo $output;    
    }   
?>