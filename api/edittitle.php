<?php
header('Access-Control-Allow-Origin: *');
include "con.php";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$fragment_id = $request->fragment_id;
$story_title = mysqli_real_escape_string($con, $request->story_title);

if ($story_title == "") {
    echo 1;
} else {
    // First, get the story id
    $q = "SELECT story_id FROM story_fragments WHERE id = $fragment_id";
    $result = mysqli_query($con, $q);
    $story_id = 0;
    while ($row = mysqli_fetch_array($result)) {
        $story_id = $row['story_id'];
    }

// Then edit the title and description
    $q = "UPDATE story SET title='$story_title' WHERE id='$story_id';";
    mysqli_query($con, $q);
}