<?php
$name = $_POST["name"];
$type = $_POST["type"];
$slug = $_POST["slug"];
$start = $_POST["start"];
$end = $_POST["end"];
$date = 20200515;
$act = $_POST["act"];
$conn = new mysqli("localhost", "root","", "editionschedule");
if($conn->errno){
    echo "database error";
}
if($act == "INSERT") {
    $sql = "SELECT * FROM `".$date."` WHERE `Name` = '" . $name . "' AND `Type` = '" . $type . "' AND `Slug` = '" . $slug . "' AND `StartTime` = '" . $start . "' AND `EndTime` = '" . $end . "'";
    echo $sql;
    $res = mysqli_query($conn, $sql);
    $count = mysqli_num_rows($res);

    if ($count == 0) {
        $sql = "INSERT INTO `".$date."`(`Name`, `Type`, `Slug`, `StartTime`, `EndTime`) VALUES ('" . $name . "', '" . $type . "','" . $slug . "', '" . $start . "','" . $end . "')";
        echo $sql;
        $conn->query($sql);
    }
}
else if($act == "DELETE"){
    $sql = "DELETE FROM `".$date."` WHERE `Name` = '" . $name . "' AND `Type` = '" . $type . "' AND `Slug` = '" . $slug . "' AND `StartTime` = '" . $start . "' AND `EndTime` = '" . $end . "'";
    $conn->query($sql);
    echo $sql;
}
//CREATE TABLE `editionschedule`.`".$date."` ( `Name` TEXT NOT NULL , `Type` TEXT NOT NULL , `Slug` TEXT NOT NULL , `StartTime` TEXT NOT NULL , `EndTime` TEXT NOT NULL ) ENGINE = InnoDB;
