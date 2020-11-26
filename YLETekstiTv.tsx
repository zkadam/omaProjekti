import React, {useEffect,useState} from 'react';
import{Text,View,Button,TextInput, ScrollView, Platform,Image,StyleSheet} from 'react-native';
import {API_id, API_key} from './APIKeyZA';
import { FontAwesome5 } from '@expo/vector-icons'; //vector-icons tuodaan näin


export default function YLETekstiTV(){
    
    const [imageUrl, setUrl]=useState<string>();
    const[inputPage, changeInputPage]=React.useState(100);
    var url='https://external.api.yle.fi/v1/teletext/images/' + inputPage + '/1.png?app_id=' + API_id + '&app_key=' + API_key+ "&date="+Date.now.toString();
  useEffect(()=>{
      fetch(url).then(function(response){
          var responseData=response.status;
          if(responseData===404){
              setUrl('https://yle.fi/uutiset/assets/img/share_image_v1.png')
          }
          else{
              setUrl(url)
          }
      });
  })
   function showPage(x:string){
       if(x==='next'){
           changeInputPage(inputPage +1)
       }
       else if(x==='prev'){
           changeInputPage(inputPage -1)
       }
       else{
           changeInputPage(inputPage)
       }
   }
    return(
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewPage}>
                <Text style={styles.title}>Ylen tekstitv -uutiset</Text>

            <View style={styles.separator}/>
            <Text style={{textAlign:'center'}}>{'Sivunumero: ' + inputPage}</Text>
            <View style={{alignItems:'center'}}>
                <TextInput
                    style={{height:40,borderColor:'gray',borderWidth:1,margin:2,width:240}}
                    onChangeText={(text)=>changeInputPage(Number(text))}
                    value={inputPage.toString()}                            
                />

            <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <View style={{margin:6,alignContent:"center", alignSelf:'center'}}>
                        {/* <Button title="<<" onPress={()=>showPage('prev')} > */}
                            <FontAwesome5.Button onPress={()=>showPage('prev')} name={'angle-double-left'} solid />
                         {/* </Button>              */}

                                </View>
                    <View style={{margin:6}}>
                        <Button title="Näytä sivu" onPress={()=>showPage('')}/>
                    </View>
                    <View style={{margin:6,alignContent:"center", alignSelf:'center'}}>
                        <Text style={{alignSelf:'center',textAlign: 'center'}}>

                    <FontAwesome5.Button onPress={()=>showPage('next')}  style={{alignSelf:'center'}} name={'angle-double-right'} solid />

                        </Text>

                    </View>

            </View>
            </View>
            <View style={styles.imageSection}>
                <Image
                    style={styles.yleTextTV}
                    resizeMode={'contain'}
                    source={{
                        uri:imageUrl,
                    }}
                    />
            </View>
            </ScrollView>

        </View>
    );
            
}

//***********************************
//Tyylimäärittelyt
//***********************************
const styles = StyleSheet.create({
 
    searchSection:{
        flex:1
    },
    mainContainer: {
        flex: 1, 
    },
 
    scrollViewPage: {
        justifyContent: 'center',
        paddingTop: 0,
    },
 
    imageSection: {
        flex: 2,
    },
 
    yleTextTV: {
        width: '100%',
        height: Platform.OS === 'android' ? '100%' : 240,
        aspectRatio: 1.5,
        marginTop: 1,
    },
 
    title: {
        fontSize: 26,
        fontWeight: '300',
        letterSpacing: 7,
        textShadowOffset: { width: 1, height: 1 },
        textShadowColor: '#D1D1D1',
        textAlign: 'center',
    },
 
    separator: {
        marginVertical: 5,
        height: 1,
        width: '100%',
        backgroundColor: '#eee',
    },
 
 });
