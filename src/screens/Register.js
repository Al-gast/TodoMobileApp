import { StatusBar } from "expo-status-bar";
import React,{useState} from "react";
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default function Register({navigation}) {
    const [form, setForm] = useState({
        firstName: '',
        email: '',
        password: '',
    });
    
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

            const response = await axios.post('https://api.kontenbase.com/query/api/v1/0b5806cc-db6b-4088-bbfc-f6368c72c166/auth/register', body, config);
            console.log(response);

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
        }
    };

    return (
        <View style={style.container}>

            <StatusBar />

            <view style={{display:'flex', justifyContent:'center'}}>
            <Image
              source={{ uri: 'https://res.cloudinary.com/agastyo-atallah-al-ardhi/image/upload/v1661432753/TodoApp/Login_Icon_uduhfe.png'}}
              style={{width:256, height:183, textAlign:'center'}}
            />
            </view>

            <Text style={style.header}>Register</Text>
            <View>
                <Text style={style.labelText}>Name</Text>
                <TextInput
                    style={style.textInput}
                    placeholder="Name"
                    onChangeText={(value) => handleOnChange('firstName', value)}
                    value={form.firstName}
                />
            </View>
            <View>
                <Text style={style.labelText}>Email</Text>
                <TextInput
                    style={style.textInput}
                    placeholder="email"
                    onChangeText={(value) => handleOnChange('email', value)}
                    value={form.email}
                />
            </View>

            <View>
                <Text style={style.labelText}>Password</Text>
                <TextInput
                    style={style.textInput}
                    secureTextEntry={true}
                    placeholder="password"
                    onChangeText={(value) => handleOnChange('password', value)}
                    value={form.password}
                />
            </View>

            <TouchableOpacity style={style.button} onPress={handleOnPress}>
                <Text style={style.textButton}>Register</Text>
            </TouchableOpacity>
            <Text onPress={() => navigation.navigate("Login")} style={{color: 'grey', marginTop: 15, textAlign:'center'}}>Joined us before? <Text style={{fontWeight: 'bold', color: '#FF5555'}}>Login!</Text></Text>
        </View>
    );
}

// Create Variable for CSS
const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  header: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: '1rem'
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
    borderColor: 'grey'
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
  }
})
