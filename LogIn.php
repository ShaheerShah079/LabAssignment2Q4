<?php 
try{
include('opendb.php');
$param=file_get_contents('php://input');
$decodeddata= json_decode($param,true);    

$email= $decodeddata['email'];
$password= $decodeddata['password'];


$query = "Select * from customer where EmailId=:p1 and password=:p2";
$stmt = $conn->prepare($query);

$stmt->bindParam(':p1',$email);
$stmt->bindParam(':p2',$password);

$stmt->execute();
$resultJSON = json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

echo $resultJSON;
}
catch(PDOException $e)
{
echo $e -> getMessage();
} 
?>