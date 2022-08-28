import { StatusBar } from "expo-status-bar";
import React,{useState, useEffect} from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Directions } from "react-native-gesture-handler";
import { FlatList } from "react-native-gesture-handler";

const category = [
    {label:'Study', value:'1'},
    {label:'Home Work', value:'2'},
    {label:'Workout', value:'3'}
]

export default function Login({navigation}) {

    const [data, setData] = React.useState([]);
    const [dataLoading, setDataLoading] = React.useState(false);

    const [form, setForm] = useState({
        name: '',
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
          const token = await AsyncStorage.getItem('token');
          if (token === null) {
              navigation.navigate("Users")
          }
            const config = {
                headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + token
                },
            };

            const body = JSON.stringify(form);
            setIsLoading(true)
            const response = await axios.post('https://api.kontenbase.com/query/api/v1/0b5806cc-db6b-4088-bbfc-f6368c72c166/Category', body, config);

            setIsLoading(false)
            alert('Category Added Successfully')

        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
            setIsLoading(false)

        }
    };

    const getData = async() =>{
      try {
          const token = await AsyncStorage.getItem('token');
          if (token === null) {
              navigation.navigate("Login")
          }

          const config = {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + token
              },
          };

          setDataLoading(true);

          const res = await axios.get('https://api.kontenbase.com/query/api/v1/0b5806cc-db6b-4088-bbfc-f6368c72c166/Category', config);
          setData(res.data)
          setDataLoading(false)

      } catch (error) {
          console.log(error);
          setDataLoading(false)
      }
  }

  React.useEffect(()=> {
      getData()
  },[data])

    return (
        <View style={style.container}>
            <StatusBar />

            <View style={{marginBottom:50}}>

            <Text style={style.header}>Add List</Text>
                <View>
                    <TextInput
                        style={style.textInput}
                        placeholder="Name"
                        onChangeText={(value) => handleOnChange('name', value)}
                        value={form.name}
                    />
                </View>

                <TouchableOpacity style={style.button} onPress={handleOnPress}>
                    {
                        isLoading ? <Text style={style.textButton}>Add Category ...</Text> : <Text style={style.textButton}>Add Category</Text>
                    }
                </TouchableOpacity>

            </View>
            <View>
                <Text style={style.header}>List Category</Text>
            </View>
            <View className="mt-4 mx-9 flex flex-row flex-wrap">
                        <FlatList
                                numColumns={3}
                                data={data}
                                key={item => item.index}
                                renderItem={({item}) => (
                                    <View style={{backgroundColor:'#FF5555', width:60, height:20, marginEnd:5, borderRadius:3, marginBottom:5}}>
                                        <Text style={{color:'white', textAlign:'center'}}>
                                            {item.name}
                                        </Text>
                                    </View>
                                )}
                                refreshing={dataLoading}
                                onRefresh={getData}
                            />
                </View>
        </View>
    );
}

// Create Variable for CSS
const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
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
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})
