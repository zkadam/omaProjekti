import React, { useEffect, useState } from 'react';
import { Text, View,  Image,  ScrollView, Pressable,Platform,TextInput,Switch, TouchableHighlight,  } from 'react-native';
import {  Octicons } from '@expo/vector-icons'; //iconit käyttöön!

import styles from '../styles/styles';


interface INWProductsResponse {
    //Typescript -interface käytetään productItems -muuttujassa json
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
    const ProductDetails = (props:{passProductId:any, closeModal:any, refreshAfterEdit:any})=>{
        const [ProductName, setProductName] = useState('...');
        const [SupplierId, setSupplierId] = useState('0');
        const [CategoryId, setCategoryId] = useState('0');
        const [QuantityPerUnit, setQuantityPerUnit] = useState('');
        const [UnitPrice, setUnitPrice] = useState('0');
        const [UnitsInStock, setUnitsInStock] = useState('0');
        const [UnitsOnOrder, setUnitsOnOrder] = useState('0');
        const [ReorderLevel, setReorderLevel] = useState('0');
        const [Discontinued, setDiscontinued] = useState(false);
        const [ImageLink, setImageLink] = useState('...');
    useEffect(()=>{
        GetProductData();
        }, [props.passProductId]);  //aina kun product id muuttuu, päivitetään useEffectin

    //Tuotetietojen haku id:llä tietokannasta
    function GetProductData() {
            let uri = 'https://webapivscareeria.azurewebsites.net/nw/products/' + ProductId;
            fetch(uri)
                .then(response => response.json())
                .then((json: INWProductsResponse) => {
                    setProduct(json); //Tuotteet kirjoitetaan productItems -array muuttujaan.
                })
        }
          


    function closeModal(){
        props.closeModal(true);
    }
 

{/* Modal starts here */}

    return(
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Tuotteen tiedot- Edit</Text>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Product Id: '}</Text>
                    <Text style={styles.modalText}>{product.productId}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Product Name: '}</Text>
                    <Text style={styles.modalText}>{product.productName}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Supplier Id: '}</Text>
                    <Text style={styles.modalText}>{product.supplierId}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Category Id: '}</Text>
                    <Text style={styles.modalText}>{product.categoryId}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Quantity Per Unit: '}</Text>
                    <Text style={styles.modalText}>{product.quantityPerUnit}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Unit Price: '}</Text>
                    <Text style={styles.modalText}>{product.unitPrice}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Units In Stock: '}</Text>
                    <Text style={styles.modalText}>{product.unitsInStock}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Units On Order: '}</Text>
                    <Text style={styles.modalText}>{product.unitsOnOrder}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Reorder Level: '}</Text>
                    <Text style={styles.modalText}>{product.reorderLevel}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Discontinued: '}</Text>
                    <Text style={styles.modalText}>{product.discontinued ? product.discontinued.toString() : 'false'}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Image: '}</Text>
                </View>
                <Image source={product.imageLink ? { uri: product.imageLink } : { uri: 'https://www.tibs.org.tw/images/default.jpg' }} style={[styles.centerElement, { height: 60, width: 60, backgroundColor: '#eee', margin: 6, alignSelf: 'center' }]} />


                <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                        closeModal(); //HOX
                        // setProductDetailsModal(!productDetailsModal);
                    }}
                >
                    <Text style={styles.textStyle}>Sulje</Text>
                </TouchableHighlight>
            </View>
        </View>
        
        )
        {/* Modal ends here */}

}
export default  ProductDetails;