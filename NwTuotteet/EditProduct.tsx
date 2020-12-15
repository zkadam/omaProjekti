import React, { useEffect, useState } from 'react';
import { Text, View,  Image,  ScrollView, Pressable,Platform,TextInput,Switch, TouchableHighlight,} from 'react-native';
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
    const EditProduct = (props:{passProductId:any, closeModal:any, refreshAfterEdit:any})=>{
        let ProductId=props.passProductId;
        const [ProductName, setProductName] = useState('...');
        const [SupplierId, setSupplierId] = useState('0');
        const [CategoryId, setCategoryId] = useState('0');
        const [QuantityPerUnit, setQuantityPerUnit] = useState('');
        const [UnitPrice, setUnitPrice] = useState('0');
        const [UnitsInStock, setUnitsInStock] = useState('0');
        const [UnitsOnOrder, setUnitsOnOrder] = useState('0');
        const [ReorderLevel, setReorderLevel] = useState('0');
        const [Discontinued, setDiscontinued] = useState(false);
        const [ImageLink, setImageLink] = useState('');
        //only if all the data is correct, validatio becomes true - validatio stops db save if data is incorrect
        let validaatio=false;

    useEffect(()=>{
        GetProductData();
        }, [props.passProductId]);  //aina kun product id muuttuu, päivitetään useEffectin

    //Tuotetietojen haku id:llä tietokannasta
    async function GetProductData() {
            let uri = 'https://webapiharjoituskoodi2020.azurewebsites.net/nw/products/'+ ProductId;
            await fetch(uri)
                .then(response => response.json())
                .then((json: INWProductsResponse) => {
                    setProductName(json.productName),
                    setSupplierId(json.supplierId== null ? "":json.supplierId.toString()),
                    setCategoryId(json.categoryId== null ? "":json.categoryId.toString()),
                    setQuantityPerUnit(json.quantityPerUnit== null ? "":json.quantityPerUnit),
                    setUnitPrice(json.unitPrice== null ? "":json.unitPrice.toString()),
                    setUnitsInStock(json.unitsInStock== null ? "":json.unitsInStock.toString()),
                    setUnitsOnOrder(json.unitsOnOrder== null ? "":json.unitsOnOrder.toString()),
                    setReorderLevel(json.reorderLevel== null ? "":json.reorderLevel.toString()),
                    setDiscontinued(json.discontinued),
                    setImageLink(json.imageLink== null ? "":json.imageLink);      
                })
          
    }



    async function editProductOnPress(ProductName: string){
        if(Platform.OS==='web'){
            if(validaatio==false){
                alert('Tuotetta ' + ProductName + ' ei voi tallentaa tietojen puuttellisuuden vuoksi!');
            }else {
                await PutToDB();
                props.refreshAfterEdit(true);
                closeModal();
            }
            
        }
        else{
            if(validaatio==false){
                alert('Tuotetta ' + ProductName + ' ei voi tallentaa tietojen puuttellisuuden vuoksi!');
            }else {
                await PutToDB();
                props.refreshAfterEdit(true);
                closeModal();
            }
        }


    }

    function PutToDB(){
        const product=
        {
            ProductName: ProductName,
            SupplierId: Number(SupplierId)||null,
            CategoryId: Number(CategoryId)||null,
            QuantityPerUnit:Number(QuantityPerUnit)||null,
            UnitPrice:parseFloat(Number(UnitPrice).toFixed(2))||null,
            UnitsInStock: Number(UnitsInStock)||null,
            UnitsOnOrder:Number(UnitsOnOrder)||null,
            ReorderLevel:Number(ReorderLevel)||null,
            Discontinued:Boolean(Discontinued),
            ImageLink:ImageLink||null,

        };

        const prodeditJson=JSON.stringify(product); 

        const apiUrl= 'https://webapiharjoituskoodi2020.azurewebsites.net/nw/products/'+ ProductId;
        fetch(apiUrl, {
            method:"PUT",
            headers:{
                "Accept": "application/json",
                "Content-Type":"application/json; charset=utf-8"
            },
            body:prodeditJson
        })
            .then((response)=>response.json())
            .then((json)=>{
                const success = json;
                
                if(success){
                    console.log(success)
                }
                else{
                    alert('Tuotteen muokkaaminen ei onnistunut')
                    
                    console.log('error updating ' + ProductName)
                }
                if(json.status!==200){alert(json.title)}
                else{
                    alert('Tuotteen muokkaaminen onnistui')

                }
            })

    }

    function priceValidation(price:string,field:string){
        if((price=='')||(price===null)||(price.indexOf(',')>0)){
            validaatio=false;
            return false;
        }else{
            validaatio=true;
            return true;
        }

    }
    function priceValidation2(price:string,field:string){
        
        var newPrice=price;
        var regi=/^\d*\.?\d*$/g;
        var isTrue=regi.test(price)
        if((price=='')||(price===null)){
            validaatio=false;
        }
        else if(!isTrue){
            alert('Invalid input! Only numbers seperated with "." as a decimal seperator are allowed.')
            newPrice=price.slice(0,-1)
        }
    
              
        
        setUnitPrice(newPrice)
    }



    function closeModal(){
        props.closeModal(true);
    }
 

{/* Modal starts here */}

return (
    <View style={styles.inputContainer}>
        <ScrollView>
            <View key={ProductId}>
                <Text style={styles.inputHeaderTitle}>Tuotteen muokkaus:</Text>
                <Text style={styles.inputTitle}>ID:</Text>
                <TextInput style={styles.inputTitle}
                    underlineColorAndroid="transparent"
                    defaultValue={ProductId.toString()||""}
                    autoCapitalize="none"
                    editable={false}
                />

                <Text style={styles.inputTitle}>Nimi:</Text>
                <TextInput style={styles.editInput} 
                    underlineColorAndroid="transparent"
                    onChangeText={val => setProductName(val)}
                    value={ProductName.toString()||""}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    selectTextOnFocus={true}
                    
                />
                { ProductName ? null : ( <Text style={styles.validationError}>Anna tuotteen nimi!</Text> )}  
                {/* { validateString(ProductName) == true ? null : ( <Text style={styles.validationError}>Anna tuotteen nimi!</Text> )} */}
    
                <Text style={styles.inputTitle}>Hinta:</Text>
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => priceValidation2(val,'UnitPrice')}
                    // onChangeText={val => setUnitPrice(val)}

                    value={(UnitPrice.toString() == null ? '0' : UnitPrice.toString())}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    selectTextOnFocus={true}
                />
                { priceValidation(UnitPrice, 'UnitPrice') == true ? null : ( <Text style={styles.validationError}>Anna hinta muodossa n.zz!</Text> )}
                {/* { validatePrice(UnitPrice) == true ? null : ( <Text style={styles.validationError}>Anna hinta muodossa n.zz!</Text> )} */}

                <Text style={styles.inputTitle}>Varastossa:</Text>
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => setUnitsInStock((val))}
                    value={UnitsInStock.toString()||""}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    selectTextOnFocus={true}
                />
                {/* { validateNumeric(UnitsInStock) == true ? null : ( <Text style={styles.validationError}>Anna varastomääräksi numero</Text> )} */}

                <Text style={styles.inputTitle}>Hälytysraja:</Text>
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => setReorderLevel(val)}
                    value={ReorderLevel.toString()||""}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    selectTextOnFocus={true}
                />

                <Text style={styles.inputTitle}>Tilauksessa:</Text>
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => setUnitsOnOrder(val)}
                    value={UnitsOnOrder.toString()||""}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    selectTextOnFocus={true}
                />

                <Text style={styles.inputTitle}>Kategoria:</Text>
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => setCategoryId(val)}
                    value={CategoryId.toString()||""}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    selectTextOnFocus={true}
                />

                <Text style={styles.inputTitle}>Pakkauksen koko:</Text>
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => setQuantityPerUnit(val)}
                    value={QuantityPerUnit.toString()||""}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    selectTextOnFocus={true}
                />

                <Text style={styles.inputTitle}>Tavarantoimittaja:</Text>
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => setSupplierId(val)}
                    value={SupplierId.toString()||""}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    selectTextOnFocus={true}
                />

                <Text style={styles.inputTitle}>Tuote poistunut:</Text>
                <View style={{ flexDirection: 'row', marginLeft: 15, }}>
                    <Text style={{ marginRight: 4, }}>Ei</Text>
                    <Switch
                        value={Discontinued}
                        onValueChange={val => setDiscontinued(val)}
                    />
                    <Text style={{ marginLeft: 4, }}>Kyllä</Text>
                </View>

                <Text style={styles.inputTitle}>Kuvan linkki:</Text>
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => setImageLink(val)}
                    value={(ImageLink == null ? '' : ImageLink.toString())}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    selectTextOnFocus={true}
                />
                 {/* { validateUrl(ImageLink) == true ? null : ( <Text style={styles.validationError}>Tarkista syöttämäsi URI</Text> )} */}


            </View>
        </ScrollView>
        <View style={styles.topSection}>
                    <Pressable onPress={() => editProductOnPress(ProductName)}>
                        <View><Octicons name="check" size={24} color="green" /></View> 
                    </Pressable>
                
                    <Pressable onPress={() => closeModal()}>
                        <View><Octicons name="x" size={24} color="gray" /></View>
                    </Pressable>
        </View>            
    </View>
);
}

export default EditProduct;