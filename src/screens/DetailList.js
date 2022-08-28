import { StatusBar } from "expo-status-bar";
import React,{useState} from "react";
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'


export default function DetailList({navigation}) {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    
    const handleOnChange = (name, value) => {
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleOnPress = async () => {
        try {
            const config = {
                headers: {
                'Content-type': 'application/json',
                },
            };
        
            const body = JSON.stringify(form);
            setIsLoading(true)
            const response = await axios.post('https://api.kontenbase.com/query/api/v1/e47c10a1-ec97-4a84-988c-3c146b726ef0/Login', body, config);
            // console.log(response);
            setIsLoading(false)           
            if (response) {
                await AsyncStorage.setItem('token', response.data.token);
            }
            
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                console.log(value);
                navigation.navigate("Users")
            }
                
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
            setIsLoading(false)           

        }
    };

    return (
   
        <View style={style.section}>
            <StatusBar />
            <View style={style.card}>
            <View style={{flexDirection: 'row'}}>
                <View style={{marginLeft: 20,marginRight: 20, marginTop:10}}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5, width: 200}}>Study-Golang</Text>
                    
                </View>
                <View style={{width: 50, marginTop: 10,}}>
                    <TouchableOpacity style={style.CardTitle}>
                        <Text style={{fontSize: 10, fontWeight: 'bold', textAlign: 'center'}}>Study</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={style.Omark}>
                        
                    </TouchableOpacity >
                </View>
                <View>
        </View>
            </View>
            <Text style={style.cardDescription}>Learn Golang to Improve 
        fundamentals and familiarize with coding</Text>
            </View>
        </View>

    );
}

const style = StyleSheet.create({
section :{
    padding: 35,

},
  card :{
    height: 600,
    width: 290,
    backgroundColor: `#DAEFFF`,
    borderRadius: 5,
  },
  cardDescription :{
    fontSize: 10,
    flexWrap: 'wrap',
    display: 'flex',
    width: 260,
    marginLeft: 20,
  },
  CardTitle :{
    height: 15,
    width: 45,
    borderRadius: 5,
    backgroundColor: `#81C8FF`,
  },
  Omark:{
    height: 25,
    width: 25,
    borderRadius: 50,
    backgroundColor: `#D9D9D9`,
    marginTop: 10,
  }
})
