import React from 'react';
import {  Text, View } from 'react-native';
import { StyleSheet } from 'react-native';


export default function HelloWorld() {
  const [counter,setCounter] =React.useState(0);
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