<?php 
try{
include('opendb.php');
$param=file_get_contents('php://input');
$decodeddata= json_decode($param,true);    

$orderId= $decodeddata['orderId'];


$query = "update orders set Orderstatus=1 where orderid=:p1";
$stmt = $conn->prepare($query);

$stmt->bindParam(':p1',$orderId);

$stmt->execute();

echo json_encode("Updated order");
}
catch(PDOException $e)
{
echo $e -> getMessage();
} 
?>