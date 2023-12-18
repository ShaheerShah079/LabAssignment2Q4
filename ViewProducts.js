import Reatc,{useState,useEffect} from 'react'
import {Button,View,Text,TextInput,ScrollView,FlatList} from 'react-native'
import { ipAdrr } from './App';
export default function ViewProducts({navigation,route}){
    async function getProduct(){
        try{
            const response=await fetch('http:/'+ipAdrr+'//GetProducts.php');
            const res=await response.json()
            if(res.length==0){
                alert('No Products Available')
            }
            else{
                console.log(res)
                setProduct(res)
            }
          }
          catch(e){
            console.log('error')
          }   
    }
    useEffect(
        ()=>{
            getProduct()
        },[]
    ) 
    const [product,setProduct]=useState([]); 
    return (
        <ScrollView>
            <FlatList
                data={product} 
                renderItem={({item})=>(<Button 
                title={"Item Name : "+item.ProductName +" Item Price : "+item.ProductPrice}
                onPress={()=>navigation.navigate('ProductDetail',{'id':item.ProductID,'name':item.ProductName,
                'description':item.ProductDescription,'price':item.ProductPrice,"category":item.ProductCategory})}/>)}
            />

            <Button title='Place Order' onPress={()=>navigation.navigate('PlaceOrders',
            {'customerId':route.params?.customerId})}/>
        </ScrollView>
      )
      
    }
    
