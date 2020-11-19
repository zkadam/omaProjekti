import React,{useState} from 'react';
import {  Text, TextInput, View, Button, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';


export default function HelloWorldInput() {
    //HOOKS MUUTTUJA
  const [counter,setCounter] =useState(0);
  const [name,setName] =useState('');
  const[outputName,changeOutputName]=useState('');

  //esitellään array,johon nimet tallennetan
  const [array, setArray]=useState<string[]>([]);
//funktio jota button kutsuu
const showName=(name:string)=>{
    changeOutputName(name);
    setArray(array=>[...array, '\n' + name]);
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
                    style={{height:40, borderColor:'gray',backgroundColor:'white',borderWidth:1,margin:2, padding:4}}
                    onChangeText={text=>setName(text)}
                    value={name}
                    />
                <Button
                    title="Tallenna nimi"
                    onPress={()=>showName(name)}
                    />
    <ScrollView style={styles.scrollView} fadingEdgeLength={180}>
            <View style={{alignItems:'stretch'}}>
                <Text style={{fontSize:24}}>{array}</Text>

            </View>
    </ScrollView>

            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    container2:{
        alignItems:'center',
        justifyContent:'center',
        paddingTop:40
    },
    bigCentered:{
        color:'blue',
        alignItems:'center',
        justifyContent:'center',
        fontSize:10
    },
    scrollView:{
    width:'100%',
    marginVertical:10,
    
   
    },

})