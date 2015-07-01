<?php
header('Access-Control-Allow-Origin: *');
include "con.php";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$fragment_id = $request->fragmentId;
$title = mysqli_real_escape_string($con, $request->title);
$content = mysqli_real_escape_string($con, $request->content);

if ($title == "" || $content == "") {
    echo 1;
} else {
    // First, get the story id belonging to the fragment id
    $q = "SELECT story_id FROM story_fragments WHERE id = $fragment_id";
    $result = mysqli_query($con, $q);

    $story_id = 0;
    while ($row = mysqli_fetch_array($result)) {
        $story_id = $row['story_id'];
    }

// Create a new option, link it to fragment
    $q = "INSERT INTO story_options (fragment_id, text) VALUES ('$fragment_id', '$title');";
    mysqli_query($con, $q);
// Get the option id for later
    $option_id = mysqli_insert_id($con);

// Create a new fragment, link it to the story id
    $q = "INSERT INTO story_fragments (text, story_id) VALUES ('$content', '$story_id');";
    mysqli_query($con, $q);
// Get the id from the new fragment
    $fragment_id = mysqli_insert_id($con);

// Link the new fragment with the option
    $q = "UPDATE story_options SET linkto='$fragment_id' WHERE id='$option_id';";
    mysqli_query($con, $q);
}