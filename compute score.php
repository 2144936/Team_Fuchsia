<?php

include('database.php');

session_start();

$sql = 'select correct_answer from multiple_choices';
$res = $db->query($sql);

$answers = array();
$correct_answers = array();
$score = 0;
$index = 0;

if($res->num_rows > 0) {
	for($i = 0; $i < count($_SESSION['correct_answer']); $i++) {
		$correct_answers[$i] = $_SESSION['correct_answer'][$i];
		$answers[$i] = isset($_POST['q'.$i]) ? $_POST['q'.$i] : 'wrong';
		if($answers[$i] == $_SESSION['correct_answer'][$i]) { $score++; }
		

	}
	
	$username = $_SESSION['username'];
	
	if($score > 0 ){
		$score_check = 'select * from leaderboard where username = "'.$username.'" and type = "tof" limit 1';
		$res_one = $db->query($score_check);
		$row = $res_one->fetch_assoc();
		
		if($row['score'] < $score) {
			$date = date('Y-m-d H:i:s');
			$query = 'insert into leaderboard(username, score, date, type) values("'.$username.'", '.$score.', CAST("'. $date .'" AS DATE), "multiple choices")';
			$db->query($query);
		}
	}
	
	echo $score;
} else {
	echo 'An error occured.';
}

?>