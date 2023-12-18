<?php 
try{
include('opendb.php');

$query = "Select * from orders where orderstatus=0";
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