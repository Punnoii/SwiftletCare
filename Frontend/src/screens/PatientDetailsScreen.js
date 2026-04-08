// src/screens/PatientDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
// import { LineChart } from 'react-native-chart-kit'; // หากใช้ chart-kit

const PatientDetailsScreen = ({ route, navigation }) => {
  const { patientId, patientName } = route.params;

  // ข้อมูลจำลองสำหรับกราฟ (ต้องเชื่อมกับข้อมูลจริงในอนาคต)
  const chartData = {
    labels: ['9am', '10am', '11am', '12pm', '1pm', '2pm'],
    datasets: [{
      data: [36.5, 37.0, 36.8, 37.5, 38.0, 37.2],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2
    }]
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726'
    }
  };

  const dummyTempReadings = [
    { id: '1', name: '1 ผิวหนัง', temp: 36.0, time: '1 วันที่แล้ว' },
    { id: '2', name: '2 ผิวหนัง', temp: 36.5, time: '1 วันที่แล้ว' },
    { id: '3', name: '3 ผิวหนัง', temp: 36.5, time: '1 วันที่แล้ว' },
    { id: '4', name: '4 ผิวหนัง', temp: 36.5, time: '1 วันที่แล้ว' },
    { id: '5', name: '5 ผิวหนัง', temp: 36.5, time: '1 วันที่แล้ว' },
    { id: '6', name: '6 ผิวหนัง', temp: 36.5, time: '1 วันที่แล้ว' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.patientName}>{patientName}</Text>
        <Text style={styles.patientId}>HT-0001</Text>
        <View style={styles.statusButtons}>
          <TouchableOpacity style={styles.statusButtonNormal}>
            <Text style={styles.statusButtonText}>ปกติ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statusButtonAbnormal}>
            <Text style={styles.statusButtonText}>ผิดปกติ</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Body Temperature 15th of June</Text>
      <View style={styles.chartContainer}>
        {/*
          หากใช้ react-native-chart-kit:
          <LineChart
            data={chartData}
            width={350} // from react-native
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        */}
        {/* สำหรับ prototype ใช้ Image แทนกราฟไปก่อน */}
        <Image
          source={require('../assets/images/sample-chart.png')} // แทนที่ด้วย path รูปกราฟจำลอง
          style={styles.sampleChart}
          resizeMode="contain"
        />
      </View>

      <View style={styles.timeFilterContainer}>
        <TouchableOpacity style={styles.timeFilterButton}>
          <Text style={styles.timeFilterButtonText}>1 วัน</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeFilterButton}>
          <Text style={styles.timeFilterButtonText}>3 วัน</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeFilterButton}>
          <Text style={styles.timeFilterButtonText}>7 วัน</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeFilterButton}>
          <Text style={styles.timeFilterButtonText}>30 วัน</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tempReadingsContainer}>
        {dummyTempReadings.map(reading => (
          <View key={reading.id} style={styles.tempReadingItem}>
            <Text style={styles.readingName}>{reading.name}</Text>
            <Text style={styles.readingTemp}>{reading.temp.toFixed(1)}°</Text>
            <Text style={styles.readingTime}>{reading.time}</Text>
          </View>
        ))}
      </View>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>สรุปข้อมูล</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>อุณหภูมิสูงสุด:</Text>
          <Text style={styles.summaryValue}>38°</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>อุณหภูมิต่ำสุด:</Text>
          <Text style={styles.summaryValue}>36.5°C</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>เฉลี่ย:</Text>
          <Text style={styles.summaryValue}>40.0°</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>ระยะเวลา:</Text>
          <Text style={styles.summaryValue}>5 นาที</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>ดาวน์โหลดข้อมูล</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
  },
  patientName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  patientId: {
    fontSize: 16,
    color: '#666',
  },
  statusButtons: {
    flexDirection: 'row',
  },
  statusButtonNormal: {
    backgroundColor: '#28a745', // Green
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  statusButtonAbnormal: {
    backgroundColor: '#dc3545', // Red
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  statusButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  chartContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 250, // กำหนดความสูงเพื่อให้เห็นพื้นที่
  },
  sampleChart: {
    width: '100%',
    height: '100%',
  },
  timeFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  timeFilterButton: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  timeFilterButtonText: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
  tempReadingsContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
  },
  tempReadingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  readingName: {
    fontSize: 16,
    color: '#333',
    flex: 2,
  },
  readingTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    flex: 1,
    textAlign: 'right',
  },
  readingTime: {
    fontSize: 14,
    color: '#888',
    flex: 1,
    textAlign: 'right',
  },
  summaryBox: {
    backgroundColor: '#e6f7ff', // Light blue background
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#91d5ff',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#555',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  downloadButton: {
    backgroundColor: '#007bff',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PatientDetailsScreen;