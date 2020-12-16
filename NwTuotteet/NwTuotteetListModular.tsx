import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, Pressable, Modal,  ActivityIndicator, TouchableOpacity } from 'react-native';
import { FontAwesome5, Octicons } from '@expo/vector-icons'; //iconit käyttöön!
import styles from '../styles/styles';
import ProductDetails from './ProductDetails';
import EditProduct from './EditProduct';
import CreateProduct from './CreateProduct';
import DeleteProduct from './DeleteProduct';
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
//filter interface
interface INWCategories {
    //Typescript -interface käytetään productItems -muuttujassa json
 
    categoryId: number;
    categoryName:string;
    description:string;
    picture:string
   
}


export default function NWTuotteetListModular() {
    const [product, setProduct] = useState<Partial<INWProductsResponse>>({});
    const [productItems, setproductItems] = useState<any>([]);
    const [productItemsCount, setproductItemsCount] = useState(0);
    //CRUD modaalien näyttämiseen hooks boolean
    const [crudModal, setCrudModal]=useState('none');
    {/*Tuotelistan päivityksen muuttujat*/ }
    const [refreshProducts, setRefreshProducts] = useState(false);
    const [refreshIndicator, setRefreshIndicator] = useState(false);
    //picker
    const[dropdownCategory, setDropdownCategory]=useState('All');
    const[categories, setCategories]=useState<any>([]);
    const[selectedCat, setSelectedCat]=useState<any>('All');


    useEffect(() => {
        GetCategories();
        GetProducts();
    }, [refreshProducts]);


    async function GetCategories() {
        let uri = 'https://webapiharjoituskoodi2020.azurewebsites.net/nw/categories/';
        await fetch(uri)
            .then(response => response.json())
            .then((json: INWCategories) => {
                setCategories(json); //Tuotteet kirjoitetaan productItems -array muuttujaan.
                 })
        setRefreshIndicator(false);
    }


    async function GetProducts() {
        let uri = 'https://webapiharjoituskoodi2020.azurewebsites.net/nw/products/';
        await fetch(uri)
            .then(response => response.json())
            .then((json: INWProductsResponse[]) => {
                if(selectedCat==="All"){
                    setproductItems(json); //Tuotteet kirjoitetaan productItems -array muuttujaan.
                }
                else{
                    const filtered=json.filter(x=>x.categoryId===parseInt(selectedCat));
                    setproductItems(filtered);
                }
                const fetchCount = Object.keys(json).length; //Lasketaan montako tuotenimikettä on yhteensä.
                setproductItemsCount(fetchCount); //Kirjoitetaan tuotenimikkeiden määrä productItemsCount -muuttujaan.
            })
        setRefreshIndicator(false);
    }



    // async function GetProducts() {
    //     let uri = 'https://webapiharjoituskoodi2020.azurewebsites.net/nw/products/';
    //     await fetch(uri)
    //         .then(response => response.json())
    //         .then((json: INWProductsResponse) => {
    //             setproductItems(json); //Tuotteet kirjoitetaan productItems -array muuttujaan.
    //             const fetchCount = Object.keys(json).length; //Lasketaan montako tuotenimikettä on yhteensä.
    //             setproductItemsCount(fetchCount); //Kirjoitetaan tuotenimikkeiden määrä productItemsCount -muuttujaan.
    //         })
    //     setRefreshIndicator(false);
    // }




    function refreshJsonData() {
        setRefreshProducts(!refreshProducts);
        setRefreshIndicator(true);
    }

    function closeCrudModal() {
        setCrudModal('none');
    }
  
    //picker
   

    const categoriesList= categories.map((cat:INWCategories,index:any)=>{
        return(<Picker.Item label={cat.categoryId.toString()+'. : '+cat.categoryName} value={cat.categoryId} key={index}/>)
    });

    function fetchFiltered(value:any){
        setSelectedCat(value);
        setRefreshProducts(!refreshProducts)
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
{/* --------------------------------------------------PICKER */}
                <Picker
                    selectedValue={selectedCat}
                    style={{height:50,width:250}}
                        prompt='Valitse tuoteryhmä'
                        onValueChange={(value) =>fetchFiltered(value)}
                        >
                    <Picker.Item label="Hae kaikki tuoteryhmät" value="All"/>
                    {categoriesList}
                </Picker>
            <ScrollView>
                {productItems.map((item: INWProductsResponse) => (

                    <View key={item.productId}    >
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

  {/*----------------------------------------- DETAILS ICON -------------------------------------*/}

                <View style={{padding:2, marginRight:5, marginTop: 5,}}>
                                    <TouchableOpacity style={[{width:32, height:32}]} onPress={()=>{setProduct(item);setCrudModal('details');}}>
                                        <Octicons name="clippy" size={30} color="#FEB53C"/>                                    
                                    </TouchableOpacity>


            {/*----------------------------------------- EDITING ICON -------------------------------------*/}
                                    <TouchableOpacity style={[{width:32, height:32}]} onPress={()=>{setProduct(item);setCrudModal('edit');}}>
                                        <Octicons name="pencil" size={30} color="#2485D5"/>                                    
                                    </TouchableOpacity>

            {/*----------------------------------------- Deleting ICON -------------------------------------*/}

                                    <TouchableOpacity style={[{width:32, height:32}]} onPress={()=>{setProduct(item);setCrudModal('delete');}}>
                                        <Octicons name="trashcan" size={30} color="red"/>                                    
                                    </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                ))}


                {/* ------------------------------ modal komponentin kutsu */}
                    <Modal
                        style={[styles.modalContainer]}
                        animationType="slide"
                        transparent={true}
                        visible={crudModal!=='none'}
                        >
                        {/* -------------------CHOOSING WICH MODAL TO RENDER BASED ON CRUD MODAL STRING MUUTTUJA------------------- */}
                     
                {crudModal==='details'?<ProductDetails closeModal={closeCrudModal} passProductId={product.productId}/>:null}
                {crudModal==='edit'? <EditProduct closeModal={closeCrudModal} refreshAfterEdit={refreshJsonData} passProductId={product.productId}/> :null}
                {crudModal==='delete'?<DeleteProduct closeModal={closeCrudModal} passProductId={product.productId} refreshAfterEdit={refreshJsonData}/>:null}
                {crudModal==='create'? <CreateProduct closeModal={closeCrudModal} refreshAfterEdit={refreshJsonData} /> :null}
                            
                    </Modal>
                     

            </ScrollView>
            {/* <View> */}
                <Pressable onPress={() => setCrudModal('create')} style={[styles.btnAdd]}>
                        <View>
                            <Octicons name="plus" size={55} color="white" style={{}} />
                        </View>
                    </Pressable>
            {/* </View> */}
        </View>
    );
}