import React from 'react';
import{Text,View,FlatList,Button} from 'react-native';
import styles from './styles'

export default function JsonList(){
   //Muuttuja johon haettava JSONdata tallennetaan
    const [jsonData, setJsonData] = React.useState();
    //Haetaan JSONdata jsonplaceholderista ja kirjoitetaan se jsonData -muuttujaan
    const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((responseData) => {
        setJsonData(responseData);
    })
    }

    return(
        <View>
            <Button
            onPress={()=>getData()}
            title="Lataa ToDo"
            color="#556B2F"
            />

            <FlatList
                data={jsonData}
                keyExtractor={(item)=>item.id.toString()}
                renderItem={({item})=>(
                    <View>
                        <View style={styles.separatorLine} />
                        <Text style={styles.itemItalic}>UserId: {item.userId.toString()}</Text>
                        <Text style={styles.itemBolded}>Title: {item.title}</Text>
                        <Text>Status: {item.completed.toString()}</Text>

                    </View>
                )}
            />

        </View>
    )
            
}
