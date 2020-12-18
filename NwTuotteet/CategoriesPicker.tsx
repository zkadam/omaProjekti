import React, { useEffect, useState } from 'react';
import {Picker} from '@react-native-picker/picker';
//filter interface
interface INWCategories {
    //Typescript -interface käytetään productItems -muuttujassa json
     categoryId: number;
    categoryName:string;
    }
export default function CategoriesPicker(props:{selectedValue:any,refreshAfterPick:any,haeCategoriat:boolean, sender:string}) {
    //picker
    const[categories, setCategories]=useState<any>([]);

    useEffect(() => {
        GetCategories();
    },[props.selectedValue]);
// --------------------------------------------------------------HAETAAN KATEGORIAT PICKERIIN---------------------
    async function GetCategories() {
        let uri = 'https://webapiharjoituskoodi2020.azurewebsites.net/nw/categories/';
        await fetch(uri)
            .then(response => response.json())
            .then((json: INWCategories) => {
                setCategories(json); //Tuotteet kirjoitetaan productItems -array muuttujaan.
                 })
    }
        //ekstra kentät index view all ja create without category varten

    const zeroCategory=(<Picker.Item label="Hae kaikki tuoteryhmät" value={0}/>)
    const zeroCreateCategory=(<Picker.Item label="---Ei määritelty tuoteryhmän" value={undefined}/>)
       
    //viedään kaikki categoryt pickeritemiin
    const categoriesList= categories.map((cat:INWCategories,index:any)=>{
        return(<Picker.Item label={cat.categoryId.toString()+': '+cat.categoryName} value={cat.categoryId} key={index}/>)
    });
    return (

                <Picker                
                    selectedValue={props.selectedValue}
                    style={{height:50,width:250}}
                        prompt='Valitse tuoteryhmä'
                        onValueChange={(value) =>{props.refreshAfterPick(value)}}
                >
                    {/* if it is the supplier list we add a null category which selects all suppliers */}
                    {props.sender==='list'? zeroCategory:null}   
                    {/* if its create, we set value to undifined so it wont save 0 to database if no selection was made */}
                     {props.sender==='create'||props.sender==='edit'? zeroCreateCategory:null}                
          
                    {categoriesList}
                </Picker>

    );
}