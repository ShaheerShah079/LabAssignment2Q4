<?php 
try{
include('opendb.php');
$param=file_get_contents('php://input');
$decodeddata= json_decode($param,true);    
$pId= $decodeddata['productsID'];

$query = "Select * from products where ProductID=:p1";
$stmt = $conn->prepare($query);

$stmt->bindParam(':p1',$pId);
$stmt->execute();
$resultJSON = json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

echo $resultJSON;


}
catch(PDOException $e)
{
echo $e -> getMessage();
} 
?>