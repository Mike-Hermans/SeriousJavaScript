<?php
header('Access-Control-Allow-Origin: *');
include "con.php";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$fragment_id = $request->fragment_id;
$story_text = mysqli_real_escape_string($con, $request->story_text);

if ($story_text == "") {
    echo 1;
} else {
    $q = "UPDATE story_fragments SET text='$story_text' WHERE id='$fragment_id';";
    mysqli_query($con, $q);
    echo 0;
}