import { StatusBar } from "expo-status-bar";
import React,{useState} from "react";
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default function Login({navigation}) {
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
            const response = await axios.post('https://api.kontenbase.com/query/api/v1/0b5806cc-db6b-4088-bbfc-f6368c72c166/auth/login', body, config);
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
        <View style={style.container}>
            <StatusBar />

            <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Image
              source={{ uri: 'https://res.cloudinary.com/agastyo-atallah-al-ardhi/image/upload/v1661444001/TodoApp/accept-request_1_vucipg.svg'}}
              style={{width:228, height:258}}
            />
            </View>

            <Text style={style.header}>Ways <Text style={{color:'#B82020'}}>To</Text><Text style={{color:'#FF5555'}}>DO</Text></Text>

            <View style={{marginBottom:60}}>
                <Text style={{textAlign:'center', fontSize:12, paddingStart: 55, paddingEnd: 55}}>
                    Write your activity and finish your activity. Fast, simple and easy to youse
                </Text>
            </View>

            <TouchableOpacity style={style.LoginButton} onPress={() => navigation.navigate("Login")} class='mb-5'>
                {
                    isLoading ? <Text style={style.textButton}>Loading ...</Text> : <Text style={style.textButton}>Login</Text>
                }
            </TouchableOpacity>
            <TouchableOpacity style={style.RegisterButton}  onPress={() => navigation.navigate("Register")}>
                {
                    isLoading ? <Text style={style.textButton}>Register ...</Text> : <Text style={style.textButton}>Register</Text>
                }
            </TouchableOpacity>
        </View>
    );
}

// Create Variable for CSS
const style = StyleSheet.create({
    container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center'
  },
  header: {
    color: 'black',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign:'center'
  },

  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
  LoginButton: {
    backgroundColor: '#FF5555',
    height: 40,
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom:10
  },
  RegisterButton: {
    backgroundColor: '#000',
    opacity:'31%',
    height: 40,
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center'
  }
})
