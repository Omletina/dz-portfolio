<?php 

	$name = $_POST['name'];
	$data = array();

	if ($name == 'dima') {
		$data['age'] = 25;
		$data['work'] = 'web-developer';
	} 

	header("Content-Type: application/json");
	echo json_encode($data);
	exit;

?>