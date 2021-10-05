<?php

$type = @$_POST['type'];
$val = @$_POST['val'];

if ($type == 'tel') {

	$t = getToken();
	pushContact($t, 'phone', $val);

}

if ($type == 'mail') {

	$t = getToken();
	pushContact($t, 'email', $val);
	pushSendinblueEmail($val);

}

function getToken() {

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_POST, 0);
	curl_setopt($ch, CURLOPT_URL, "https://portal.freeforyou.cz/api/v1/ffy/login?username=WEB&password=123456789");
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 20);
	curl_setopt($ch, CURLOPT_TIMEOUT, 120);
	$r = curl_exec($ch);
	$j = json_decode($r);
	curl_close($ch);

	if (!$t = $j->data->access_token) {
		header('HTTP/1.1 500 Internal Server Error');
		exit('Error 1');
	}
	return $t;

}

function pushContact($tkn, $type, $val) {

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json', "Authorization: Bearer $tkn"]);
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
		'contact' => $val,
		'type' => $type,
		'webpage' => 'ffy_landing'
	]));

	curl_setopt($ch, CURLOPT_URL, "https://portal.freeforyou.cz/api/v1/ffy/lead");
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 20);
	curl_setopt($ch, CURLOPT_TIMEOUT, 120);
	$r = curl_exec($ch);
	$j = json_decode($r);
	curl_close($ch);

	if (!$j->success && $j->errors->lead != 'lead_exists') {
		header('HTTP/1.1 500 Internal Server Error');
		echo $r;
		exit('Error 2');
	}

}

function pushSendinblueEmail($val) {

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, [
		'Content-Type: application/json', 
		'api-key: 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']);
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
		'listIds' => [5],
		'email' => $val,
	]));

	curl_setopt($ch, CURLOPT_URL, "https://api.sendinblue.com/v3/contacts");
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 20);
	curl_setopt($ch, CURLOPT_TIMEOUT, 120);
	$r = curl_exec($ch);
	$res = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);

	// echo $res;
	// echo $r;

}