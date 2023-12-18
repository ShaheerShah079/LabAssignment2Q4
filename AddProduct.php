<?php 
try{
include('opendb.php');
$param=file_get_contents('php://input');
$decodeddata= json_decode($param,true);    

$name= $decodeddata['name'];
$description= $decodeddata['description'];
$category= $decodeddata['category'];
$price= $decodeddata['price'];


$query = "Insert into products(ProductName ,ProductDescription,ProductCategory,ProductPrice) values (:p1,:p2,:p3,:p4)";
$stmt = $conn->prepare($query);

$stmt->bindParam(':p1',$name);
$stmt->bindParam(':p2',$description);
$stmt->bindParam(':p3',$category);
$stmt->bindParam(':p4',$price);

$stmt->execute();

echo json_encode("Product Added");
}
catch(PDOException $e)
{
echo $e -> getMessage();
} 
?>