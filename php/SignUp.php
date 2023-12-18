<?php 
try{
include('opendb.php');
$param=file_get_contents('php://input');
$decodeddata= json_decode($param,true);    

$email= $decodeddata['email'];
$name= $decodeddata['name'];
$password= $decodeddata['password'];
$phone= $decodeddata['phone'];
$address= $decodeddata['address'];


$query = "Insert into customer values (:p1,:p2,:p3,:p4,:p5)";
$stmt = $conn->prepare($query);

$stmt->bindParam(':p1',$email);
$stmt->bindParam(':p2',$name);
$stmt->bindParam(':p3',$password);
$stmt->bindParam(':p4',$phone);
$stmt->bindParam(':p5',$address);

$stmt->execute();

echo json_encode("User Succesfully Sign Up");
}
catch(PDOException $e)
{
echo $e -> getMessage();
} 
?>