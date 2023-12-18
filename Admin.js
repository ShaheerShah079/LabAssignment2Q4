import React,{useState} from 'react'
import {Button,View,Text,TextInput} from 'react-native'
import { ipAdrr } from './App'
export default function Admin({navigation}) {
     async function AddProduct(){
      try{
      const response=await fetch('http://'+ipAdrr+'//AddProduct.php',{
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'name':name,
          'description':description,
          'category':category,
          'price':price
        })
        }  
      )
      const res=await response.json()
      console.log(res)
      

    }
    catch(e){
      console.log('error')
    }
    }
    const [name,setName]=useState('');
    const [description,setdescription]=useState('');
    const [category,setcategory]=useState('');
    const [price,setprice]=useState('');    
    return (
      <View>
      <TextInput title='Name' onChangeText={setName}/>
      <TextInput title='Description' onChangeText={setdescription}/>
      
      <TextInput title='Category' onChangeText={setcategory}/>
      <TextInput title='Price' onChangeText={setprice}/>

    <Button title="Add Product" onPress={()=>AddProduct()}/>
    <Button title="Check UnOrder Orders" onPress={()=>navigation.navigate('ReviewOrders')}/>
   
    </View>
    )
    
  }
  