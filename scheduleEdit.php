<?php

$conn = new mysqli("localhost", "root", "", "editionSchedule");
if ($conn->connect_errno) {
    echo "database issue";
}
//if($_GET["date"]){
//    $date = $_GET["date"];
//}
//else{
//    $date = getdate();
//}
$dateArr = getdate();

//echo $conn->query("Select *");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content=""width="device-width, initial-scale =1.0">
    <title>EventList</title>
    <link rel=" stylesheet" href="./scheduleEdit.css"/>
    <script src="https://kit.fontawesome.com/257e5b644b.js" crossorigin="anonymous"></script>
</head>
<body>
<header>
    <h1>Events for  <?php  echo date("l, F d, Y", mktime($dateArr["hours"]-6, 0, 0, $dateArr["mon"], $dateArr["mday"], $dateArr["year"]));?></h1>
<!--    <form>-->
<!--    <select class ="eventDateInput" required>-->
<!--        --><?php
//        $conn = new mysqli("localhost", "root","", "editionschedule");
//        $sql = "show tables";
//        $result = mysqli_fetch_all($conn->query($sql));
//        echo "<h1>"."testing"."</h1>";
//      foreach ($result as $table){
//
//          $date = date("l, F d, Y", mktime(0, 0, 0, $table[0][4].$table[0][5], $table[0][6].$table[0][7], $table[0][0].$table[0][1].$table[0][2].$table[0][3]));
//          echo "<option value = '".$table[0]."'>".$date."</option>";
//
//      }
//        ?>
<!--    </select>-->
<!--        <button class = "eventSubmit" type = "submit" required>-->
<!--            <i class ="fas fa-search"></i>-->
<!--        </button>-->
<!--    </form>-->
</header>

<form>
    <input type = "text" class ="eventNameInput" placeholder="Event Name" required>

    <select class ="eventTypeInput" placeholder="Event Type" required>
        <option value = "Class">Class</option>
        <option value = "Event">Event</option>
        <option value = "Optional">Optional</option>
        <div class = "eventTypeInputWrapper">
        </div>
    </select>

    <input type = "text" class ="eventSlugInput" placeholder="Event Slug" required>
    <input type = "time" class ="eventStartInput" required>
    <input type = "time" class ="eventEndInput" required>
    <button class = "eventSubmit" type = "submit" required>
        <i class ="fas fa-plus-square"></i>
    </button>
</form>
<div class ="eventContainer">
    <ul class = "eventList">
    </ul>
</div>
<script src="./scheduleEdit.js"></script>

</body>
</html>



