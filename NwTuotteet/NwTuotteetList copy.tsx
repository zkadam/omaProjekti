import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TextInput, Image, Pressable, Modal, TouchableHighlight,TouchableOpacity, } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; //iconit käyttöön!
import styles from '../styles/styles';



export default function NwTuotteetList() {

    const[inventoryItems,setInventoryItems]=useState<any>([]);
    const[inventoryItemsCount,setInventoryItemsCount]=useState(0);
    const[productId,setProductId]=useState(0);
    const[productDetailsModal,setProductDetailModal]=useState(false);


    interface INWProductsResponse {
        //Typescript -interface käytetään inventoryItems -muuttujassa json
        productId: number;
        productName: string;
        supplierId: number;
        categoryId: number;
        quantityPerUnit: string;
        unitPrice: number;
        unitsInStock: number;
        unitsOnOrder: number;
        reorderLevel: number;
        discontinued: boolean;
        imageLink: string;
        category: string;
        supplier: string;
        checked: any;
    }

    function GetProducts() {
        let uri = 'https://webapivscareeria.azurewebsites.net/nw/products/';
        fetch(uri)
            .then(response => response.json())
            .then((json: INWProductsResponse) => {
                setInventoryItems(json); //Tuotteet kirjoitetaan inventoryItems -array muuttujaan.
                const fetchCount = Object.keys(json).length; //Lasketaan montako tuotenimikettä on yhteensä.
                setInventoryItemsCount(fetchCount); //Kirjoitetaan tuotenimikkeiden määrä inventoryItemsCount -muuttujaan.
            })
    }

    //Jokaiselle komponentille random-key, palautetaan string -tyyppisenä
    function idGenerator() {
        var rnds = function () {
            return (((1 + Math.random()) * 0x10) | 0).toString(16).substring(1);
        };
        return (rnds() + rnds() + "-" + rnds() + "-" + rnds() + "-" + rnds() + "-" + rnds() + rnds() + rnds());
    }
    


   
  return (
      <View style={{flex:1, backgroundColor:'#f6f6f6'}}>
          <View style={[styles.topSection]}>
              <FontAwesome5 name="boxes" size={25} color='#000' />
          </View>
          <View style={[styles.centerSection,{height:50, width:50}]}>
                <Text style={{fontSize:18, color:'#000'}}>Tuotteet</Text>
                <Text style={{fontSize:10, color:'#000'}}>{'Tuotteita yhteensä: '+ inventoryItemsCount}</Text>

          </View>



          <ScrollView>
            {inventoryItems.map((item: INWProductsResponse)=>(
                <Pressable onPress={()=>{/*this.props.navigation.navigate('ProductDetails',{productDetails:item})*/}}
                style={({pressed})=>[{backgroundColor:pressed? 'rgba()49,179,192,0.5':'white'}]}
                onLongPress={()=>{
                    setProductDetailModal(true);
                }}
                >
                <View key={item.productId.toString()} style={styles.productsContainer}>
                    <Image source={item.imageLink ? {uri:item.imageLink}:{uri:'https://www.tibs.org.tw/images/default.jpg'}}
                    style={[styles.centerSection,{height:60,width:60,backgroundColor:'#eeeeee',margin:6,}]}/>
                    <View style={{flexGrow:1,flexShrink:1,alignSelf:'center'}}>
                        <Text numberOfLines={1} style={{fontSize:15}}>{item.productName}</Text>
                        <Text numberOfLines={1} style={{color:'#8f8f8f'}}>{item.category ? 'Variation: '+ item.category:''}</Text>
                        <Text numberOfLines={1} style={{color:'#333333', marginBottom:10}}>{'\u00E1 ' + (item.unitPrice == null ? 'unitprice ismissing ':item.unitPrice.toFixed(2))+ '\u20AC'}</Text>


                    </View>
                </View>
                

                </Pressable>
            ))}
          </ScrollView>
      </View>
      
      
  );














  }
