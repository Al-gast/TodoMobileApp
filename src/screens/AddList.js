import { StatusBar } from "expo-status-bar";
import React,{useState} from "react";
import {Image, View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import DropdownCategory from '../component/DropdownCategory'

export default function Login({navigation}) {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

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

            <Text style={style.header}>Add List</Text>

            <View style={{marginBottom:60}}>
                <View>
                    <TextInput
                        style={style.textInput}
                        placeholder="Name"
                        onChangeText={(value) => handleOnChange('name', value)}
                        value={form.name}
                    />
                </View>

                <View>
                    <DropdownCategory/>
                </View>

                <View>
                    <TextInput
                        style={style.textInput}
                        placeholder="Date"
                        onChangeText={(value) => handleOnChange('date', value)}
                        value={form.date}
                    />
                </View>
                <View>
                    <TextInput
                        style={style.textsInput}
                        placeholder="Description"
                        onChangeText={(value) => handleOnChange('description', value)}
                        value={form.description}
                    />
                </View>
            </View>

            <TouchableOpacity style={style.button} onPress={handleOnPress}>
                {
                    isLoading ? <Text style={style.textButton}>Loading ...</Text> : <Text style={style.textButton}>Add List</Text>
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
  },
  header: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15
  },
  labelText: {
    color: 'grey',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    color: 'grey',
    padding: 10,
    borderColor: 'grey',
  },
  textsInput: {
    height: 120,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    color: 'grey',
    padding: 10,
    borderColor: 'grey',
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#FF5555',
    height: 40,
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center'
  },
  icon: {
    marginRight: 5,
  }
})
