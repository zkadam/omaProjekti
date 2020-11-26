import React,{useState} from 'react';
import {  Text, TextInput, View, Button, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


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
    setArray(array=>[...array,  name+'\n' ]);
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
            <View style={styles.container2}>
                <Text>Anna Nimi:</Text>
                <TextInput
                    style={{height:40,width:120, borderColor:'gray',backgroundColor:'white',borderWidth:1,margin:2, padding:4}}
                    onChangeText={text=>setName(text)}
                    value={name}
                    />
              <View style={{width:120}}> 
                    <Button
                    title="Tallenna nimi"
                    onPress={()=>showName(name)}
                    />  
                </View>      
                

    <TouchableOpacity style={{marginTop: 1 ,backgroundColor:'gray'}} onPress={()=>setArray([])}>
        <Text style={{height:40, width:120, textAlign:'center',fontSize:18,textAlignVertical:'center', borderWidth:1
                        ,borderColor:'gray'}}>Tyhjennä</Text>
    </TouchableOpacity>
    <ScrollView style={styles.scrollView} fadingEdgeLength={180}>
            <View style={{alignItems:'stretch'}}>
                <Text style={{fontSize:24, textAlign:'center'}}>{array}</Text>

            </View>
    </ScrollView>

            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    container2:{
        width:'100%',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:1,
    },
    container3:{
        width:'100%',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:1
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