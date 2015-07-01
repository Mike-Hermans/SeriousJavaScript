<?php
header("Access-Control-Allow-Origin: *");
include "con.php";
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $q = "SELECT * FROM story_fragments WHERE id = $id";
    $result = mysqli_query($con, $q);

    $json = null;
    // Get story data
    while ($row = mysqli_fetch_array($result)) {
        $json = Array(
            "id" => $row['id'],
            "title" => "",
            "text" => $row['text'],
            "options" => Array()
        );
    }

    // Get all options
    $q = "SELECT * FROM story_options WHERE fragment_id = $id";
    $result = mysqli_query($con, $q);

    while($row = mysqli_fetch_array($result)) {
        array_push($json['options'], Array(
                "id" => $row['id'],
                "text" => $row['text'],
                "linkto" => $row['linkto']
            )
        );
    }

    // Add story id to story data, first get the id
    $q = "SELECT story_id FROM story_fragments WHERE id = $id";
    $result = mysqli_query($con, $q);

    $story_id = 0;
    while($row = mysqli_fetch_array($result)) {
        $story_id = $row['story_id'];
    }

    // The get the title
    $q = "SELECT title FROM story WHERE id = $story_id";
    $result = mysqli_query($con, $q);
    while($row = mysqli_fetch_array($result)) {
        $json['title'] = $row['title'];
    }

    echo json_encode($json);
}
else {
    $q = "SELECT * FROM story";
    $result = mysqli_query($con, $q);

    $json = Array();
    while ($row = mysqli_fetch_array($result)) {
        array_push($json, Array(
                "id" => $row['id'],
                "title" => $row['title'],
                "description" => $row['description'],
                "first_fragment" => $row['first_fragment']
            )
        );
    }
    echo json_encode($json);
}