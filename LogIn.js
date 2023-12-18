import Reatc,{useState} from 'react'
import {Button,View,Text,TextInput} from 'react-native'
import { ipAdrr } from './App'

export default function LogIn({navigation}){
    async function LogIn(){
        try{
          if(email=='admin'&& password=="123"){
            console.log('done')
            navigation.navigate('Admin')
          }
          else{
        const response=await fetch('http://'+ipAdrr+'//LogIn.php',{
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'email':email,
            'password':password,
          })
          }  
        )
        const res=await response.json()
        if(res.length==0){
            alert('Incorrect Email and Password')
        }
        else{
            navigation.navigate('ViewProducts',{"customerId":res[0].EmailID})
        }
      }
      }
      catch(e){
        console.log('error')
      }
      }
      const [email,setEmail]=useState('');
      const [password,setPassword]=useState('');   
      return (
        <View>
        <TextInput placeholder='Email Address' onChangeText={setEmail}/>
        <TextInput placeholder='Password' onChangeText={setPassword}/>
  
      <Button title="Log In" onPress={()=>LogIn()}/>
      <Button title="Sign Up" onPress={()=>navigation.navigate('SignUp')}/>

      
      </View>
      )
      
    }
    
