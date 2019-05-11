<?php
require "conn.php";

if(isset($_POST['name'])){//前端ajax传输过来的额
	$username=$_POST['name'];
	$tel=$_POST['tel'];
}else{
	exit('非法操作');
}

$query="select * from validate where username='$username' and tel='$tel'";
$result=mysql_query($query);

if(mysql_fetch_array($result)){
	echo true;
}else{
	echo false;
}






	
	
