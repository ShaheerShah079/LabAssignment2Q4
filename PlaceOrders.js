import Reatc,{useState,useEffect} from 'react'
import {Button,View,Text,TextInput,ScrollView,FlatList} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { ipAdrr } from './App';
export default function PlaceOrders({navigation,route}){
    async function getOrderProduct(){
        const JsonProducts=await AsyncStorage.getItem('Orders');
        const products=JSON.parse(JsonProducts)
        const jsonPrice=await AsyncStorage.getItem('TotalPrice')
        const price=JSON.parse(jsonPrice)
        setTotalPrice(price)
        var tempProduct=[];
        for(let i=0;i<products.length;i++){
            try{
                    const response=await fetch('http:/'+ipAdrr+'//GetOrders.php',{
                    method: 'POST',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      'productsID':products[i].productId,
                      })
                    });
                const res=await response.json()
                if(res.length!=0){
                    //console.log(res)
                    tempProduct.push("Product Name : "+res[0].ProductName+" Product Category : "+res[0].ProductCategory+" Purchased Item : "+products[i].itemNum+" price : "+(products[i].itemNum*parseFloat(res[0].ProductPrice)))
                    console.log(tempProduct)
                }
                
              }
              catch(e){
                console.log('error')
              }
        }
        setProduct(tempProduct)
           
    }
    useEffect(
        ()=>{
            getOrderProduct()
        },[]
    ) 
    const [product,setProduct]=useState([]); 
    const [TotalPrice,setTotalPrice]=useState([]); 
    return (
        <View>
            <FlatList
                data={product} 
                renderItem={({item})=>(<Text>{item}</Text>)}
            />
             <Text>Total Price : {TotalPrice}</Text>   
             <Button title="Confirm Order " onPress={()=>navigation.navigate('ConfirmOrder',{'customerId':route.params?.customerId})}/>
        </View>
      )
      
    }
    
