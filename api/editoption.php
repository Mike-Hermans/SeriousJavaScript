<?php
header('Access-Control-Allow-Origin: *');
include "con.php";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$option_id= $request->option_id;
$option_text = mysqli_real_escape_string($con, $request->option_text);

if ($option_text == "") {
    echo 1;
} else {
    $q = "UPDATE story_options SET text='$option_text' WHERE id='$option_id';";
    mysqli_query($con, $q);
    echo 0;
}