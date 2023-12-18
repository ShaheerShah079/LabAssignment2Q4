<?php 
try{
include('opendb.php');
$param=file_get_contents('php://input');
$decodeddata= json_decode($param,true);    

$customerId= $decodeddata['customerId'];
$TotalPrice= $decodeddata['TotalPrice'];
$ShipingAdrress= $decodeddata['ShipingAdrress'];
$bankCard= $decodeddata['bankCard'];
$CustomerComments= $decodeddata['CustomerComments'];
$OrderDate= $decodeddata['OrderDate'];

$query = "Insert into orders(OrderDate,TotalPrice,ShipingAdrress,BankCard,CustomerComments,EmailID) values (:p1,:p2,:p3,:p4,:p5,:p6)";
$stmt = $conn->prepare($query);

$stmt->bindParam(':p1',$OrderDate);
$stmt->bindParam(':p2',$TotalPrice);
$stmt->bindParam(':p3',$ShipingAdrress);
$stmt->bindParam(':p4',$bankCard);
$stmt->bindParam(':p5',$CustomerComments);
$stmt->bindParam(':p6',$customerId);

$stmt->execute();

$stmt2 =$conn->prepare("select orderid from orders ORDER BY orderid desc limit 1");
 $stmt2->execute();

 echo json_encode($stmt2->fetch()[0]);
}
catch(PDOException $e)
{
echo $e -> getMessage();
} 
?>