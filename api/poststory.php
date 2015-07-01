<?php
header('Access-Control-Allow-Origin: *');
include "con.php";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$title = mysqli_real_escape_string($con, $request->title);
$description = mysqli_real_escape_string($con, $request->description);
$first_fragment_content = mysqli_real_escape_string($con, $request->first_fragment);

if ($title == "" || $description == "" || $first_fragment_content == "") {
    echo 1;
} else {
    // Add the new story to Story
    $q = "INSERT INTO story (title, description) VALUES ('$title', '$description');";
    mysqli_query($con, $q);
// Save the story ID
    $story_id = mysqli_insert_id($con);

// Create a new fragment and link it to the new story
    $q = "INSERT INTO story_fragments (story_id, text) VALUES ('$story_id', '$first_fragment_content');";
    mysqli_query($con, $q);
    echo $first_fragment_content;
// Get the fragment id
    $fragment_id = mysqli_insert_id($con);

// Link story to fragment
    $q = "UPDATE story SET first_fragment='$fragment_id' WHERE id='$story_id';";

    mysqli_query($con, $q);
}