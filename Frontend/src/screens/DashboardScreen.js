// src/screens/DashboardScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PatientCard from '../components/PatientCard'; // component 

const DUMMY_PATIENTS = [
  { id: '1', name: 'นายชรินธร', deviceId: 'HT-0001', temp1: 40.0, temp2: 37.0, status: 'high' },
  { id: '2', name: 'นายแรลลี่ 5', deviceId: 'HT-0001', temp1: 40.0, temp2: 37.0, status: 'normal' },
  { id: '3', name: 'นายชรินธร', deviceId: 'HT-0001', temp1: 40.0, temp2: 37.0, status: 'high' },
  { id: '4', name: 'นายแรลลี่ 5', deviceId: 'HT-0001', temp1: 40.0, temp2: 37.0, status: 'normal' },
  { id: '5', name: 'นายชรินธร', deviceId: 'HT-0001', temp1: 40.0, temp2: 37.0, status: 'high' },
  { id: '6', name: 'นายแรลลี่ 5', deviceId: 'HT-0001', temp1: 40.0, temp2: 37.0, status: 'normal' },
];

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const filteredPatients = DUMMY_PATIENTS.filter(patient =>
    patient.name.toLowerCase().includes(searchText.toLowerCase()) ||
    patient.deviceId.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>แสดงผลอุณหภูมิรวม `{'>'}` ผู้ป่วย 4 (10)</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="ค้นหาชื่อ, รหัสเครื่อง..."
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredPatients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PatientCard patient={item} onPress={() => navigation.navigate('PatientDetails', { patientId: item.id, patientName: item.name })} />
        )}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>เพิ่มผู้ป่วย</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  searchBar: {
    width: '100%',
    height: 45,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listContent: {
    paddingBottom: 80, // เผื่อที่สำหรับปุ่มด้านล่าง
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    alignSelf: 'center',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;