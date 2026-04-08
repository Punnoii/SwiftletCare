
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import DropDownPicker from 'react-native-dropdown-picker';
import { BASE_URL } from '@env';

const ChooseSectionScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(''); 

  // --- State สำหรับ DropDownPicker แผนก ---
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [departmentValue, setDepartmentValue] = useState(null);
  const [departmentItems, setDepartmentItems] = useState([
    { label: 'แผนก A', value: 'deptA', maxFloors: 5 },
    { label: 'แผนก B', value: 'deptB', maxFloors: 3 },
    { label: 'แผนก C', value: 'deptC', maxFloors: 4 },
    { label: 'แผนก D', value: 'deptD', maxFloors: 6 },
    { label: 'แผนก E', value: 'deptE', maxFloors: 2 },
  ]);

  const [floorNumber, setFloorNumber] = useState(-1);
  const [maxFloors, setMaxFloors] = useState(-1); // default max

  // update maxfloor when department change
  useEffect(() => {
    if (departmentValue) {
      const selectedDept = departmentItems.find(item => item.value === departmentValue);
      if (selectedDept) {
        setMaxFloors(selectedDept.maxFloors);
        // if > max => set(1)
        if (floorNumber > selectedDept.maxFloors) {
          setFloorNumber(1);
        // if < 1 => set(1)
        }else if (floorNumber < 1) {
          setFloorNumber(1);
        }
      }
    }
  }, [departmentValue, departmentItems]);

    // getting data when running for the first time
  useEffect(() => {
    getData();
  }, []); 

  // increase floor 
  const increaseFloor = () => {
    if (floorNumber < maxFloors) {
      setFloorNumber(floorNumber + 1);
    }
  };

  // decrease floor
  const decreaseFloor = () => {
    if (floorNumber > 1) {
      setFloorNumber(floorNumber - 1);
    }
  };

  // get user data from DB
  async function getData() {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    axios
      .post(`${BASE_URL}/userdata`, {token: token})
      .then(res => {
        console.log(res.data);
        setUserData(res.data.data);
      });
  }

  // handle next button
  const handleNext = () => {
    if (!departmentValue) {
      Alert.alert('เตือน', 'กรุณาเลือกแผนกก่อน');
      return;
    }
    
    // Go to the dashboard page when everything is correct
    console.log('Selected Department:', departmentValue);
    console.log('Selected Floor:', floorNumber);
    navigation.navigate('Dashboard');
  };

  // view
  return (
    <View style={styles.container}>
      <Text style={styles.header}>เลือกส่วน</Text>
      {/* user name */}
      <Text style={[styles.header, { textAlign: 'center' }]}>{userData ? `${userData.name} ${userData.surname}` : 'กำลังโหลดข้อมูล...'}</Text>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>รพ. ธรรมศาสตร์</Text>
        
        <View style={[styles.pickerWrapper, { zIndex: 2000, elevation: 5  }]}>
          <Text style={styles.sectionLabel}>เลือกแผนก:</Text>
          <DropDownPicker
            open={departmentOpen}
            value={departmentValue}
            items={departmentItems}
            setOpen={setDepartmentOpen}
            setValue={setDepartmentValue}
            setItems={setDepartmentItems}
            placeholder="กรุณาเลือกแผนก"
            style={styles.dropdown}
            dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 2000 , elevation: 5 }]}
            listMode="SCROLLVIEW"
          />
        </View>

        {/* Counter สำหรับเลือกชั้น */}
        {departmentValue && (
          <View style={styles.floorCounterWrapper}>
            <Text style={styles.sectionLabel}>เลือกชั้น:</Text>
            
            <View style={styles.counterContainer}>
              <TouchableOpacity 
                style={[styles.counterButton, floorNumber <= 1 && styles.disabledButton]}
                onPress={decreaseFloor}
                disabled={floorNumber <= 1}
              >
                <Text style={[styles.counterButtonText, floorNumber <= 1 && styles.disabledText]}>-</Text>
              </TouchableOpacity>
              
              <View style={styles.floorDisplay}>
                <Text style={styles.floorNumber}>{floorNumber}</Text>
                <Text style={styles.maxFloorText}>/ {maxFloors} ชั้น</Text>
              </View>
              
              <TouchableOpacity 
                style={[styles.counterButton, floorNumber >= maxFloors && styles.disabledButton]}
                onPress={increaseFloor}
                disabled={floorNumber >= maxFloors}
              >
                <Text style={[styles.counterButtonText, floorNumber >= maxFloors && styles.disabledText]}>+</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.floorInfo}>
              {departmentItems.find(item => item.value === departmentValue)?.label} มี {maxFloors} ชั้น
            </Text>
          </View>
        )}
     
        <TouchableOpacity style={styles.confirmButton} onPress={handleNext}>
          <Text style={styles.confirmButtonText}>ต่อไป</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  searchBar: {
    width: '100%',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sectionContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  dropdown: {
    borderColor: '#ddd',
    height: 50,
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
  },
  dropdownContainer: {
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  pickerWrapper: {
    width: '90%',
    marginBottom: 20,
  },
  floorCounterWrapper: {
    width: '90%',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  counterButton: {
    width: 50,
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  counterButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#999',
  },
  floorDisplay: {
    alignItems: 'center',
    minWidth: 100,
  },
  floorNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
  },
  maxFloorText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  floorInfo: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  confirmButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChooseSectionScreen;