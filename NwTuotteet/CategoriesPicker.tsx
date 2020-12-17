import React, { useEffect, useState } from 'react';
import {Picker} from '@react-native-picker/picker';
//filter interface
interface INWCategories {
    //Typescript -interface käytetään productItems -muuttujassa json
 
    categoryId: number;
    categoryName:string;
    description:string;
    picture:string
   
}
export default function NWTuotteetListModular(props:{selectedValue:any,refreshAfterPick:any,haeCategoriat:boolean, sender:string}) {
    //picker
    const[categories, setCategories]=useState<any>([]);
    useEffect(() => {
        GetCategories();
    }, [props.haeCategoriat]);
// --------------------------------------------------------------HAETAAN KATEGORIAT PICKERIIN---------------------
    async function GetCategories() {
        let uri = 'https://webapiharjoituskoodi2020.azurewebsites.net/nw/categories/';
        await fetch(uri)
            .then(response => response.json())
            .then((json: INWCategories) => {
                setCategories(json); //Tuotteet kirjoitetaan productItems -array muuttujaan.
                 })
    }
    const zeroCategory=(<Picker.Item label="Hae kaikki tuoteryhmät" value={0}/>)
    const categoriesList= categories.map((cat:INWCategories,index:any)=>{
        return(<Picker.Item label={cat.categoryId.toString()+': '+cat.categoryName} value={cat.categoryId} key={index}/>)
    });
    return (
                <Picker                
                    selectedValue={props.selectedValue}
                    style={{height:50,width:250}}
                        prompt='Valitse tuoteryhmä'
                        onValueChange={(value) =>props.refreshAfterPick(value)}
                        >
                    {props.sender==='list'? zeroCategory:null}                
                    {categoriesList}
                </Picker>

    );
}