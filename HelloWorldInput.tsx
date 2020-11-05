import React,{useState} from 'react';
import {  Text, TextInput, View, Button } from 'react-native';
import { StyleSheet } from 'react-native';


export default function HelloWorldInput() {
    //HOOKS MUUTTUJA
  const [counter,setCounter] =useState(0);
  const [name,setName] =useState('');
  const[outputName,changeOutputName]=useState('');
//funktio jota button kutsuu
const showName=(name:string)=>{
    changeOutputName(name);
}

  setTimeout(
      ()=>setCounter(counter +1),
      1000
  )  
  return (
    <View style={styles.container2}>
        <View > 
        <Text>Terve Porvoo!</Text>
        </View>
        <View >
            <Text style={styles.bigCentered}>{counter}</Text>
        </View>
        <View>
            <Text>Anna Nimi:</Text>
            <TextInput
                style={{height:40, borderColor:'gray',borderWidth:1,margin:2}}
                onChangeText={text=>setName(text)}
                value={name}
            />
            <Button
                title="Tallenna nimi"
                onPress={()=>showName(name)}
            />
            <Text>{outputName}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container2:{
        alignItems:'center',
        justifyContent:'center'
    },
    bigCentered:{
        color:'blue',
        alignItems:'center',
        justifyContent:'center',
        fontSize:25
    },
  

})