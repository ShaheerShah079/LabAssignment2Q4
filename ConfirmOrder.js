import React,{useState} from 'react'
import {Button,View,Text,TextInput} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ipAdrr } from './App';
export default function ConfirmOrder({navigation,route}){
    async function PlaceInOrderTable(){
      var orderId;
        const totalPrice=await AsyncStorage.getItem('TotalPrice')
        console.log(route.params?.customerId)
        try{
           // console.log(new Date());
          const response=await fetch('http:/'+ipAdrr+'//PlaceInOrderTable.php',{
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'customerId':route.params?.customerId,
            'TotalPrice':totalPrice,
            'ShipingAdrress':address,
            'bankCard':bankCard,
            'CustomerComments':comments,
            'OrderDate':new Date()            
          })
          }  
        )
        const res=await response.json()
        console.log(res)
        orderId=res;
        
        const JsonProducts=await AsyncStorage.getItem('Orders');
        const products=JSON.parse(JsonProducts)
        const jsonPrice=await AsyncStorage.getItem('TotalPrice')
        const price=JSON.parse(jsonPrice)
        console.log(products)
        console.log(price)
        for(let i=0;i<products.length;i++){
                    console.log({
                      'productsID':products[i].productId,
                      'Items':products[i].itemNum,
                      'orderId':orderId
                      })
                    const response1=await fetch('http:/'+ipAdrr+'//insertInOrderDetail.php',{
                    method: 'POST',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      'productsID':products[i].productId,
                      'Items':products[i].itemNum,
                      'orderId':orderId
                      })
                    });
                const res1=await response1.json()
                console.log(res1)
                await AsyncStorage.removeItem('Orders');
                await AsyncStorage.removeItem('TotalPrice');
                  
        }
      }
      catch(e){
        console.log('error')
      }
      }
      const [bankCard,setBankCard]=useState('');
      const [address,setAddress]=useState('');
      const [comments,setComments]=useState('');   
      return (
        <View>
        <TextInput placeholder='Input bank Card'onChangeText={setBankCard}/>
        <TextInput placeholder='Shipping Address' onChangeText={setAddress}/>
        <TextInput placeholder='Any comments about order' onChangeText={setComments}/>
  
      <Button title="Confirm Order" onPress={()=>PlaceInOrderTable()}/>
      
      </View>
      )
      
    }
    
