// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // navigate to other screens
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '@env'; //  BASE_URL form .env

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  // Handle login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("กรุณากรอกอีเมลและรหัสผ่าน");
      return ;
    }
    
    try {
      const userData = {
      email: email,
      password: password,
      };
      console.log("User Data:", userData);

      const res = await axios.post(`${BASE_URL}/login-user`, userData);
      console.log("API Response:", res.data.data); 

      if (res.data.status === "ok") { 
        Alert.alert('Login Success');
        await AsyncStorage.setItem("token", res.data.data);
        await AsyncStorage.setItem('IsLoggedIn', JSON.stringify(true)); 
        navigation.navigate('ChooseSection');
      } else { 
          Alert.alert('Login Failed', res.data.message || 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert('Error', 'เกิดข้อผิดพลาดบางอย่าง โปรดลองอีกครั้ง');
    }
    };

    // view
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../assets/images/t-app-logo.png')} 
          style={styles.logo}
        />
        <Text style={styles.appName}>T-APP</Text>
        <Text style={styles.appDescription}>
          ควบคุมอุณหภูมิและแจ้งเตือนอุณหภูมิร่างกาย
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="อีเมล"
            placeholderTextColor="#999"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="รหัสผ่าน"
            placeholderTextColor="#999"
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => console.log('ลืมรหัสผ่าน?')}>
          <Text style={styles.forgotPassword}>ลืมรหัสผ่าน?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}>
            ยังไม่มีบัญชีใช่หรือไม่? <Text style={styles.signupTextBold}>ลงทะเบียน</Text>
          </Text>
        </TouchableOpacity>

        <Image
          source={require('../assets/images/me2-logo.png')}
          style={styles.me2Logo}
        />
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  appDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loginButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#007bff', // สีฟ้าตามภาพ
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#007bff',
    fontSize: 15,
    marginTop: 20,
  },
  signupLink: {
    fontSize: 15,
    color: '#666',
    marginTop: 30,
  },
  signupTextBold: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  me2Logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default LoginScreen;