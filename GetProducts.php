<?php 
try{
include('opendb.php');

$query = "select * from orders where orderStatus=0";
$stmt = $conn->prepare($query);

$stmt->execute();
$resultJSON = json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

echo $resultJSON;
}
catch(PDOException $e)
{
echo $e -> getMessage();
} 
?>