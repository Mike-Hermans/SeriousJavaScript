<?php
header("Access-Control-Allow-Origin: *");
include "con.php";
if (isset($_GET['id'])) {
    $option_id = $_GET['id'];

    // Remove option
    $q= "DELETE FROM story_options WHERE id = $option_id";
    mysqli_query($con, $q);
}