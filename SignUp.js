import React,{useState} from 'react'
import {Button,View,Text,TextInput} from 'react-native'
import { ipAdrr } from './App'
export default function SignUp() {
     async function SignUp(){
      try{
        console.log('1')
      const response=await fetch('http://'+ipAdrr+'//SignUp.php',{
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'email':email,
          'name':name,
          'password':password,
          'phone':phone,
          'address':address
        })
        }  
      )
      console.log('2')
      const res=await response.json()
      console.log(res)
      

    }
    catch(e){
      console.log('error')
    }
    }
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [phone,setPhone]=useState('');
    const [address,setAddress]=useState('');    
    return (
      <View>
      <TextInput onChangeText={setEmail}/>
      <TextInput onChangeText={setName}/>
      <TextInput onChangeText={setPassword}/>
      
      <TextInput onChangeText={setPhone}/>
      <TextInput onChangeText={setAddress}/>

    <Button title="Sign UP" onPress={()=>SignUp()}/>
    </View>
    )
    
  }
  