import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import HelloWorldInput from './HelloWorldInput';
import JsonListPressable from './JsonListPressable';
import YLETekstiTv from './YLETekstiTv';


export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.upperx}>
        {/* //kuva sivulle */}
       <View style={{alignItems:'center'}}>
        <Image
          style={styles.logoCareeria}
          source={{
            uri: 'https://careeria.fi/static/careeria/careeria_logo_alpha_230x67_once.gif',
        }} />
       </View>
       
      <Text>Tämä on minun eka react native softa</Text>
      <StatusBar style="auto" />
      </View>
      <View style={styles.centerx}>
        {/* <HelloWorld/> */}
     <JsonListPressable/>
      </View>

      <View style={styles.lowerx}>
      <YLETekstiTv/>

      {/* <HelloWorldInput/> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#adf',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

   lowerx:{
        flex:4,
        color:'blue',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'green',

       
    },
    centerx:{
        flex:1,
        backgroundColor:'yellow',
        color:'blue',
        alignItems:'center',
        justifyContent:'center',
        fontSize:35
    },
    upperx:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        fontSize:35
    },
    logoCareeria:{
      width: 230,
      height:67,
      margin:12,
      padding:20
    }
});
