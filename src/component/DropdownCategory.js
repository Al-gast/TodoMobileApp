import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from 'react-native-vector-icons/AntDesign';


  const CategoryDropdown = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: '#FF5555' }]}>
            Dropdown label
          </Text>
        );
      }
      return null;
    };

    const [data, setData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

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

      const datas = data.map((item) => {
        return {label: item.name, value: item.name}
      })

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#FF5555' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={datas}
          search
          width={'100%'}
          maxHeight={300}
          labelField={(item.label)}
          valueField="value"
          placeholder={!isFocus ? 'Category' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
            />
      </View>
    );
  };

  export default CategoryDropdown;

  const styles = StyleSheet.create({
    container: {
      width: '100%',
    },
    dropdown: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 4,
      paddingHorizontal: 8,
      marginBottom : 15,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      color: 'grey',
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
  });