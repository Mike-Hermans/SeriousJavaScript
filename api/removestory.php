<?php
header("Access-Control-Allow-Origin: *");
include "con.php";
if (isset($_GET['id'])) {
    $fragment_id = $_GET['id'];
    $fragments = Array();
    $options = Array();
    $story_id = 0;

    // First, get the story id
    $q = "SELECT story_id FROM story_fragments WHERE id = $fragment_id";
    $result = mysqli_query($con, $q);
    while ($row = mysqli_fetch_array($result)) {
        $story_id = $row['story_id'];
    }

    // Now, get all fragments belonging to story
    $q = "SELECT id FROM story_fragments WHERE story_id = $story_id";
    $result = mysqli_query($con, $q);
    while($row = mysqli_fetch_array($result)) {
        array_push($fragments, $row['id']);
    }

    // For each fragment, remove the options
    // First turn fragments array into a string
    $fragments_string = implode(",", $fragments);
    $q = "DELETE FROM story_options WHERE fragment_id IN ($fragments_string)";
    mysqli_query($con, $q);

    // Now that options are removed, remove the fragments
    $q = "DELETE FROM story_fragments WHERE story_id = $story_id";
    $result = mysqli_query($con, $q);

    // Now that all data is removed, we can delete the story itself.
    $q= "DELETE FROM story WHERE id = $story_id";
    mysqli_query($con, $q);
}