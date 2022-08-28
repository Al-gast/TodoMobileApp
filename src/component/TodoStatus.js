import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from 'react-native-vector-icons/AntDesign';

  const status = [
    { label: 'Finished', value: '1' },
    { label: 'Unfinished', value: '2' },
  ];
  
  const TodoStatus = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: '#FF5555' }]}>
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={{flexDirection: 'row'}}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#FF5555' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={status}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Status' : '...'}
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

  export default TodoStatus;

  const styles = StyleSheet.create({
    dropdown: {
      display: 'flex',
      height: 40,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      width: 100,
    //   marginRight: 15,
    },
    placeholderStyle: {
      fontSize: 12,
      color: 'grey',
    },
    selectedTextStyle: {
      fontSize: 12,
    },
    iconStyle: {
      width: 10,
      height: 20,
    },
  });