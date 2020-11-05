import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HelloWorld from './HelloWorld';
import HelloWorldInput from './HelloWorldInput';
import HelloWorldInpiut from './HelloWorldInput';


export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.upperx}>
      <Text>Tämä on minun eka react native softa</Text>
      <StatusBar style="auto" />
      </View>
      <View style={styles.centerx}>
      <HelloWorldInput/>
     
      </View>
      <View style={styles.lowerx}>
        <HelloWorld/>
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
        flex:3,
        color:'blue',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'green',

       
    },
    centerx:{
        flex:2,
        backgroundColor:'yellow',
        color:'blue',
        alignItems:'center',
        justifyContent:'center',
        fontSize:25
    },
    upperx:{
        flex:1,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        fontSize:25
    }
});
