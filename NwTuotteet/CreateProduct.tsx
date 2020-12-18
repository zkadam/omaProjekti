import React, { useEffect, useState } from 'react';
import { Text, View,  Image,  ScrollView, Pressable,Platform,TextInput,Switch, TouchableHighlight,} from 'react-native';
import {  Octicons } from '@expo/vector-icons'; //iconit käyttöön!
import styles from '../styles/styles';
import CategoriesPicker from './CategoriesPicker';
import SuppliersPicker from './SuppliersPicker'



    const CreateProduct = (props:{closeModal:any, refreshAfterEdit:any})=>{
        const [ProductName, setProductName] = useState('...');
        const [SupplierId, setSupplierId] = useState<string | null>(null);
        const [CategoryId, setCategoryId] = useState<string | null>(null);
        const [QuantityPerUnit, setQuantityPerUnit] = useState<string | null>(null);
        const [UnitPrice, setUnitPrice] = useState<string | null>(null);
        const [UnitsInStock, setUnitsInStock] = useState<string | null>(null);
        const [UnitsOnOrder, setUnitsOnOrder] = useState<string | null>(null);
        const [ReorderLevel, setReorderLevel] = useState<string | null>(null);
        const [Discontinued, setDiscontinued] = useState(false);
        const [ImageLink, setImageLink] = useState<string | null>(null);
        //only if all the data is correct, validatio becomes true - validatio stops db save if data is incorrect
        let validaatio=false;
//tuotteen lisäys
     function CreateProductOnPress(ProductName: string){
        if(Platform.OS==='web'){
            if(validaatio==false){
                alert('Tuotetta ' + ProductName + ' ei voi tallentaa tietojen puuttellisuuden vuoksi!');
            }else {
                PostToDB();
                props.refreshAfterEdit(true);
                closeModal();
            }
            
        }
        else{
            if(validaatio==false){
                alert('Tuotetta ' + ProductName + ' ei voi tallentaa tietojen puuttellisuuden vuoksi!');
            }else {
               PostToDB();
            //    alert('Tuote ' + ProductName + ' lisätty onnistuneesti');
               props.refreshAfterEdit(true);
               closeModal();
            }
        }


    }
//HUOM ---- SOME NULLABLE FIELDS ARE NOT SAVING NULL BECAUSE OF SQL DATABASE DEFAULT VALUE (0)
    async function PostToDB(){
        const product=
        { 
            ProductName: ProductName,
            SupplierId: Number(SupplierId)||null,
            CategoryId: Number(CategoryId)||null,
            QuantityPerUnit:QuantityPerUnit||null,
            UnitPrice:parseFloat(Number(UnitPrice).toFixed(2))||null,
            UnitsInStock: Number(UnitsInStock)||null,
            UnitsOnOrder:Number(UnitsOnOrder)||null,
            ReorderLevel:Number(ReorderLevel)||null,
            Discontinued:Boolean(Discontinued),
            ImageLink:ImageLink||null,

        };

       
        const prodCreateJson=JSON.stringify(product); 
alert(prodCreateJson)
        const apiUrl= 'https://webapiharjoituskoodi2020.azurewebsites.net/nw/products/';
        await fetch(apiUrl, {
            method:"POST",
            headers:{
                "Accept": "application/json",
                "Content-Type":"application/json; charset=utf-8"
            },
            body:prodCreateJson
        })
            .then((response)=>response.json())
            .then((json)=>{
                  if(json.status!==200){alert(JSON.stringify(json))}
                else{
                    alert('Tuotteen lisäys onnistui')

                }
            })

    }

    function priceValidation(price:string,field:string){
        if((price.indexOf(',')>0)){
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
     if(!isTrue){
            alert('Invalid input! Only numbers seperated with "." as a decimal seperator are allowed.')
            newPrice=price.slice(0,-1)
        }
    
              
        
        setUnitPrice(newPrice)
    }

    function shortIntValidation(val:string){
        var regi=/^\d*\.?\d*$/g;

        if((regi.test(val)&&0<parseInt(val)&&parseInt(val)<32767)||val==="")
        {return true}
        else{
            alert('Invalid input! Only numbers seperated with "." as a decimal seperator are allowed.');
            return false;
        }
    }


    function closeModal(){
        props.closeModal(true);
    }
 

{/* Modal starts here */}

return (
    <View style={styles.inputContainer}>
        <ScrollView>
            <View>
             
                <Text style={styles.inputHeaderTitle}>Tuotteen liäys:</Text>
                
                <Text style={styles.inputTitle}>Nimi:</Text>
                <TextInput style={styles.editInput} 
                    underlineColorAndroid="transparent"
                    onChangeText={val => setProductName(val)}
                  
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
                   
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    selectTextOnFocus={true}
                />
                { priceValidation(UnitPrice||'', 'UnitPrice') == true ? null : ( <Text style={styles.validationError}>Anna hinta muodossa n.zz!</Text> )}
                {/* { validatePrice(UnitPrice) == true ? null : ( <Text style={styles.validationError}>Anna hinta muodossa n.zz!</Text> )} */}

                <Text style={styles.inputTitle}>Varastossa:</Text>
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => {shortIntValidation(val)==true ? setUnitsInStock(val):null}}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    selectTextOnFocus={true}
                />
                {/* { validateNumeric(UnitsInStock) == true ? null : ( <Text style={styles.validationError}>Anna varastomääräksi numero</Text> )} */}

                <Text style={styles.inputTitle}>Hälytysraja:</Text>
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => {shortIntValidation(val)==true ? setReorderLevel(val):null}}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    selectTextOnFocus={true}
                />

                <Text style={styles.inputTitle}>Tilauksessa:</Text>
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => {shortIntValidation(val)==true ? setUnitsOnOrder(val):null}}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    selectTextOnFocus={true}
                />

                <Text style={styles.inputTitle}>Kategoria:</Text>
               {/* -------------------------------------------------------picker */}
               <CategoriesPicker selectedValue={null} refreshAfterPick={setCategoryId} haeCategoriat={false} sender={'create'}/>


                <Text style={styles.inputTitle}>Pakkauksen koko:</Text>
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => setQuantityPerUnit(val)}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    selectTextOnFocus={true}
                />

                <Text style={styles.inputTitle}>Tavarantoimittaja:</Text>
                <SuppliersPicker selectedValue={null} refreshAfterPick={setSupplierId} haeSupplierit={false} sender={'create'}/>

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
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    selectTextOnFocus={true}
                />
                 {/* { validateUrl(ImageLink) == true ? null : ( <Text style={styles.validationError}>Tarkista syöttämäsi URI</Text> )} */}

            </View>
        </ScrollView>
        <View style={styles.topSection}>
                    <Pressable style={{ padding:20}} onPress={() => CreateProductOnPress(ProductName)}>
                        <View><Octicons name="check" size={30} color="green" /></View> 
                    </Pressable>
                
                    <Pressable style={{padding:20}} onPress={() => closeModal()}>
                        <View><Octicons name="x" size={30} color="gray" /></View>
                    </Pressable>
        </View>            
    </View>
);
}

export default CreateProduct;