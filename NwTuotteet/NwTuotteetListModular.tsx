import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, Pressable, Modal,  ActivityIndicator, TouchableOpacity } from 'react-native';
import { FontAwesome5, Octicons } from '@expo/vector-icons'; //iconit käyttöön!
import styles from '../styles/styles';
import ProductDetails from './ProductDetails';
import EditProduct from './EditProduct';
import CreateProduct from './CreateProduct';
import {Picker} from '@react-native-picker/picker';



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

export default function NWTuotteetListModular() {
    const [product, setProduct] = useState<Partial<INWProductsResponse>>({});
    const [productItems, setproductItems] = useState<any>([]);
    const [productItemsCount, setproductItemsCount] = useState(0);


    //CRUD modaalien näyttämiseen hooks boolean
    const [productDetailsModal, setProductDetailsModal] = useState(false);
    const [productEditModal, setProductEditModal]=useState(false);
    const [productCreateModal, setProductCreateModal]=useState(false);


    {/*Tuotelistan päivityksen muuttujat*/ }
    const [refreshProducts, setRefreshProducts] = useState(false);
    const [refreshIndicator, setRefreshIndicator] = useState(false);

    //picker
    const[dropdownCategory, setDropdownCategory]=useState('All')

    useEffect(() => {
        GetProducts();
    }, [refreshProducts]);

    async function GetProducts() {
        let uri = 'https://webapiharjoituskoodi2020.azurewebsites.net/nw/products/';
        await fetch(uri)
            .then(response => response.json())
            .then((json: INWProductsResponse) => {
                setproductItems(json); //Tuotteet kirjoitetaan productItems -array muuttujaan.
                const fetchCount = Object.keys(json).length; //Lasketaan montako tuotenimikettä on yhteensä.
                setproductItemsCount(fetchCount); //Kirjoitetaan tuotenimikkeiden määrä productItemsCount -muuttujaan.
            })
        setRefreshIndicator(false);
    }

    function refreshJsonData() {
        setRefreshProducts(!refreshProducts);
        setRefreshIndicator(true);
    }

    //Modaali-ikkunan sulkeminen
    function closeDetailsModal() {
        setProductDetailsModal(!productDetailsModal);
    }

       //Modaali-ikkunan sulkeminen
       function closeEditModal() {
        setProductEditModal(!productEditModal);
    }

      //Modaali-ikkunan sulkeminen
      function closeCreateModal() {
        setProductCreateModal(!productCreateModal);
    }

    //TUOTTEEN EDITOINTI IKKUNAN KUTSU
    function editProductFunc(item: INWProductsResponse){
        setProduct(item);
        setProductEditModal(true);
    }
    //TUOTTEEN LUONNIN IKKUNAN KUTSU
    function createProductFunc(){
        
        setProductCreateModal(true);
    }

    //picker
    function filterItems(category:string){
        if(category==='All'){
            setDropdownCategory('All');
            setRefreshProducts(!refreshProducts)
        }
        else if(category==='cat1'){
            setDropdownCategory('cat1');
            setRefreshProducts(!refreshProducts)
        }
    }

    return (
        <View style={[styles.mainWrapper]}>
                
            <View style={[styles.topSection]}>
                <View>
                    <FontAwesome5 name="boxes" size={25} color="#000" />
                </View>
                <Text style={{ fontSize: 18, color: '#000' }}>{'Tuotteita yhteensä: ' + productItemsCount}</Text>
                <Pressable onPress={() => refreshJsonData()} style={({ pressed }) => [{ backgroundColor: pressed ? 'lightgray' : 'white' }]}>
                    <View>
                        <Octicons name="sync" size={24} color="black" />
                    </View>
                </Pressable>
                <ActivityIndicator size="small" color="#0000ff" animating={refreshIndicator} />
            </View>

                <Picker
                    selectedValue={dropdownCategory}
                    style={{height:50,width:250}}
                        prompt='Valitse tuoteryhmä'
                        onValueChange={(itemValue, itemIndex) =>
                        filterItems(itemValue.toString())
                    }>
                    <Picker.Item label="Hae kaikki tuoteryhmät" value="All"/>
                    <Picker.Item label="Juomat" value="cat1"/>
                </Picker>
            <ScrollView>
                {productItems.map((item: INWProductsResponse) => (

                    <Pressable
                        key={item.productId}
                        onPress={() => {

                            setProduct(item);
                            setProductDetailsModal(true);

                        }}
                        style={({ pressed }) => [{ backgroundColor: pressed ? 'rgba(49, 179, 192, 0.5)' : 'white' }]}
                    >
                        <View style={styles.productsContainer}>
                            {/*Mikäli item.imageLink on undefined -> näytetään default -kuva, muuten item.imageLink*/}
                            <Image source={item.imageLink ? { uri: item.imageLink } : { uri: 'https://www.tibs.org.tw/images/default.jpg' }}
                                style={[styles.centerSection, { height: 60, width: 60, backgroundColor: '#eeeeee', margin: 6, }]} />
                            <View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
                                <Text style={{ fontSize: 15 }}>{item.productName}</Text>
                                <Text style={{ color: '#8f8f8f' }}>{item.category ? 'Variation: ' + item.category : ''}</Text>
                            {/*Euro -merkki tulee '\u20AC' käyttämällä...*/}
                            {/*á -merkki tulee '\u00E1' käyttämällä...*/}
                                <Text style={{ color: '#333333', marginBottom: 10 }}>{'\u00E1 ' + (item.unitPrice == null ? 'unitprice is missing ' : item.unitPrice.toFixed(2)) + '\u20AC'}</Text>
                            </View>

            {/*----------------------------------------- EDITING ICON -------------------------------------*/}
                            <View style={{padding:2, marginRight:10, marginTop: 30}}>
                                    <TouchableOpacity style={[{width:32, height:32}]} onPress={()=>editProductFunc(item)}>
                                        <Octicons name="pencil" size={24} color="black"/>                                    
                                    </TouchableOpacity>

                            </View>
                        </View>
                    </Pressable>
                ))}


                {/* ------------------------------Details modal komponentin kutsu */}
                {productDetailsModal ? (
                    <Modal
                        style={[styles.modalContainer]}
                        animationType="slide"
                        transparent={true}
                        visible={true}
                    >
                        <ProductDetails closeModal={closeDetailsModal} passProductId={product.productId}></ProductDetails>
                    </Modal>
                ) : null}

                {/*------------------------------ Edit modal komponentin kutsu */}
                {productEditModal ? (
                    <Modal
                        style={[styles.modalContainer]}
                        animationType="slide"
                        transparent={true}
                        visible={true}
                    >
                        <EditProduct closeModal={closeEditModal} refreshAfterEdit={refreshJsonData} passProductId={product.productId}/>
                    </Modal>
                ) : null}

                {/*------------------------------ Edit modal komponentin kutsu */}
                {productCreateModal ? (
                    <Modal
                        style={[styles.modalContainer]}
                        animationType="slide"
                        transparent={true}
                        visible={true}
                    >
                        <CreateProduct closeModal={closeCreateModal} refreshAfterEdit={refreshJsonData} />
                    </Modal>
                ) : null}

            </ScrollView>
            {/* <View> */}
                <Pressable onPress={() => createProductFunc()} style={[styles.btnAdd]}>
                        <View>
                            <Octicons name="plus" size={55} color="white" style={{}} />
                        </View>
                    </Pressable>
            {/* </View> */}
        </View>
    );
}