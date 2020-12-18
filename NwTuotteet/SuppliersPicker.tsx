import React, { useEffect, useState } from 'react';
import {Picker} from '@react-native-picker/picker';
//filter interface
interface INWSuppliers {
    //Typescript -interface käytetään productItems -muuttujassa json
     supplierId: number;
    companyName:string;
    }
export default function SuppliersPicker(props:{selectedValue:any,refreshAfterPick:any,haeSupplierit:boolean, sender:string}) {
    //picker
    const[suppliers, setSuppliers]=useState<any>([]);
    useEffect(() => {
        GetSuppliers();
    }, [props.haeSupplierit]);
// --------------------------------------------------------------HAETAAN KATEGORIAT PICKERIIN---------------------
    async function GetSuppliers() {
        let uri = 'https://webapiharjoituskoodi2020.azurewebsites.net/nw/suppliers/';
        await fetch(uri)
            .then(response => response.json())
            .then((json: INWSuppliers) => {
                setSuppliers(json); //Tuotteet kirjoitetaan productItems -array muuttujaan.
                 })
    }
    //ekstra kentät index view all ja create without supplierin varten
    const zeroSupplier=(<Picker.Item label="Hae kaikki toimittajat" value={0}/>)
    const zeroCreateSupplier=(<Picker.Item label="---Ei määritelty toimittja" value={undefined}/>)
    //viedään kaikki supplierit pickeritemiin
    const suppliersList= suppliers.map((supp:INWSuppliers,index:any)=>{
        return(<Picker.Item label={supp.supplierId.toString()+': '+supp.companyName} value={supp.supplierId} key={index}/>)
    });

    return (
                <Picker                
                    selectedValue={props.selectedValue}
                    style={{height:50,width:250}}
                        prompt='Valitse toimittajan'
                        onValueChange={(value) =>props.refreshAfterPick(value)}
                        >
                {/* if it is the supplier list we add a null category which selects all suppliers */}
                    {props.sender==='list'? zeroSupplier:null}   
                    {/* if its create, we set value to undifined so it wont save 0 to database if no selection was made */}
                    {props.sender==='create'||props.sender==='edit'? zeroCreateSupplier:null}                
      
                    {suppliersList}
                </Picker>

    );
}