// src/components/PatientCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PatientCard = ({ patient, onPress }) => {
  const tempStatusColor = patient.status === 'high' ? '#ff4d4f' : '#28a745'; // สีแดงสำหรับสูง, เขียวสำหรับปกติ

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.leftContent}>
        <Text style={styles.idText}>{patient.id}</Text>
        <Text style={styles.nameText}>{patient.name}</Text>
        <Text style={styles.deviceIdText}>{patient.deviceId}</Text>
      </View>
      <View style={styles.rightContent}>
        <View style={[styles.tempBox, { backgroundColor: tempStatusColor }]}>
          <Text style={styles.tempText}>{patient.temp1.toFixed(1)}</Text>
        </View>
        <View style={styles.tempBox}>
          <Text style={styles.tempText}>{patient.temp2.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  leftContent: {
    flex: 1,
  },
  idText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 2,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  deviceIdText: {
    fontSize: 14,
    color: '#666',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempBox: {
    width: 60,
    height: 40,
    backgroundColor: '#e0e0e0', // สีพื้นหลังทั่วไปสำหรับอุณหภูมิปกติ
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  tempText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default PatientCard;