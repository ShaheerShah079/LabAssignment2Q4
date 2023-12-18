<?php 
try{
    include('opendb.php');
    $param=file_get_contents('php://input');
    $decodeddata= json_decode($param,true);        
    
    $pid= $decodeddata['productsID'];
    $item= $decodeddata['Items'];
    $orderid= $decodeddata['orderId'];
    
    $query = "Insert into orderdetail(ProductID,OrderID,TotalItem) values (:p1,:p2,:p3)";
    $stmt = $conn->prepare($query);
    
    $stmt->bindParam(':p1',$pid);
    $stmt->bindParam(':p2',$orderid);
    $stmt->bindParam(':p3',$item);
    
    $stmt->execute();
    echo json_encode("order place is order table");
    
    }
catch(PDOException $e)
{
echo $e -> getMessage();
} 
?>