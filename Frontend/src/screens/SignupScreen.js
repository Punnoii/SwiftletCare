// src/screens/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { BASE_URL } from '@env'; // นำเข้า BASE_URL จากไฟล์ .env
// หากต้องการใช้ Dropdown หรือ Checkbox ที่สวยงาม อาจจะต้องติดตั้ง library เพิ่มเติม
// import Checkbox from 'react-native-checkbox'; // ตัวอย่าง library
// import { Picker } from '@react-native-picker/native'; // หากต้องการใช้ Picker ของ React Native (ใช้ @react-native-picker/picker แทน @react-native-picker/native)

const SignupScreen = () => {
  const navigation = useNavigation();

  // agree term
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // value and verify
  const [name, setName] = useState("");
  const [nameVerify, setNameVerify] = useState(false);
  const [surname, setSurname] = useState("");
  const [surnameVerify, setSurnameVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [confirmPasswordVerify, setConfirmPasswordVerify] = useState(false);

  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  
  const handleEmailChange = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailVerify(emailRegex.test(text));
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordVerify(text.length >= 6);
    setConfirmPasswordVerify(text === confirmPassword && text.length >= 6);
  };

  const handleConfirmPasswordChange = (text) => {

    setConfirmPassword(text);
    setConfirmPasswordVerify(text === password && text.length >= 6);
  };

  const handleSignin = () => {
    if (!(nameVerify)){
      Alert.alert("name < 1");
    } else if (!(surnameVerify)){
      Alert.alert("surname < 1");
    } else if (!(emailVerify)){
      Alert.alert("email doesn't match the format");
    } else if (!(passwordVerify && confirmPasswordVerify)) {
      Alert.alert("Check your password");
    } else if(!(agreedToTerms)){
      Alert.alert("Please agree terms");
    } else {
      const userData = { 
        name: name, 
        surname: surname, 
        email: email, 
        password: password,
        confirmPassword: confirmPassword
        }; 
      axios
        .post(`${BASE_URL}signup-user`, userData)
        .then(res => {
          console.log(res.data);
          if (typeof res.data === 'object' && res.data !== null && res.data.status === "ok") { 
            Alert.alert("ลงทะเบียนสำเร็จ!", res.data.message); 
            navigation.navigate("Login");
          } else {
            Alert.alert("ERROR", res.data.message); 
          }
        })
        .catch(error => {
          console.log(error);
          Alert.alert("ERROR", error); 
        });
    };
}

  // view
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>ลงทะเบียนบัญชี</Text>
      <Text style={styles.subHeader}>กรุณากรอกข้อมูลส่วนตัว</Text>

      <View style={styles.inputGroup}>
        {/* name */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="ชื่อ"
            placeholderTextColor="#999"
            onChangeText={(text) => {
              setName(text);
              setNameVerify(text.length > 1);
            }}
            value={name}
          />
          {/* when typing check verify */}
          {name.length > 0 && (
            <Feather
              name={nameVerify ? "check-circle" : "x-circle"}
              color={nameVerify ? "green" : "red"}
              size={20}
              style={styles.icon}
            />
          )}
        </View>

        {/* surname */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="นามสกุล"
            placeholderTextColor="#999"
            onChangeText={(text) => {
              setSurname(text);
              setSurnameVerify(text.length > 1); // check text > 1
            }}
            value={surname}
          />
          {surname.length > 0 && ( // show when typing 
            <Feather
              name={surnameVerify ? "check-circle" : "x-circle"}
              color={surnameVerify ? "green" : "red"}
              size={20}
              style={styles.icon}
            />
          )}
        </View>

        {/* email */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="อีเมล"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={handleEmailChange}
            value={email}
          />
          {email.length > 0 && ( // show icon when text > 0
            <Feather
              // if not verify will be red
              name={emailVerify ? "check-circle" : "x-circle"}
              color={emailVerify ? "green" : "red"}
              size={20}
              style={styles.icon}
            />
          )}
        </View>

        {/* password */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="รหัสผ่าน"
            placeholderTextColor="#999"
            secureTextEntry={!passwordShow}
            onChangeText={handlePasswordChange}
            value={password}
          />
          {password.length > 0 && ( // when only typing
            <>
              <Feather
                name={passwordVerify ? "check-circle" : "x-circle"}
                color={passwordVerify ? "green" : "red"}
                size={20}
                style={styles.icon}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setPasswordShow(!passwordShow)}
              >
                <Feather
                  name={passwordShow ? "eye" : "eye-off"}
                  color="#999"
                  size={20}
                />
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* comfirm password */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="ยืนยันรหัสผ่าน"
            placeholderTextColor="#999"
            secureTextEntry={!confirmPasswordShow}
            onChangeText={handleConfirmPasswordChange}
            value={confirmPassword}
          />
          {confirmPassword.length > 0 && ( // when typing
            <>
              <Feather
                name={confirmPasswordVerify ? "check-circle" : "x-circle"}
                color={confirmPasswordVerify ? "green" : "red"}
                size={20}
                style={styles.icon}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setConfirmPasswordShow(!confirmPasswordShow)}
              >
                <Feather
                  name={confirmPasswordShow ? "eye" : "eye-off"}
                  color="#999"
                  size={20}
                />
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.checkboxContainer}>
          {/*  component Checkbox  */}
          <TouchableOpacity onPress={() => setAgreedToTerms(!agreedToTerms)} style={styles.checkbox}>
            <View style={[styles.checkboxBox, agreedToTerms && styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>ยอมรับข้อกำหนดและเงื่อนไข</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignin}>
          <Text style={styles.signupButtonText}>ลงทะเบียน</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.loginLink}>
          มีบัญชีอยู่แล้วใช่หรือไม่? <Text style={styles.loginTextBold}>เข้าสู่ระบบ</Text>
        </Text>
      </TouchableOpacity>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  inputGroup: {
    width: '100%',
    alignItems: 'center',
  },
  // Wrapper สำหรับ TextInput และ Icon
  inputWrapper: {
    width: '90%',
    marginBottom: 15,
    position: 'relative', // สำคัญสำหรับการจัดตำแหน่งไอคอน
  },
  input: {
    width: '100%', // ให้ TextInput เต็มความกว้างของ inputWrapper
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingRight: 40, // เพิ่ม padding ด้านขวาเพื่อไม่ให้ข้อความทับไอคอน
  },
  icon: {
    position: 'absolute',
    right: 15, // ตำแหน่งจากขวา
    top: 15, // ตำแหน่งจากด้านบน
  },
  eyeIcon: {
    position: 'absolute',
    right: 45, // ตำแหน่งจากขวา (เยื้องจาก icon verify)
    top: 15, // ตำแหน่งจากด้านบน
  },
  dropdownPlaceholder: {
    width: '90%',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownText: {
    fontSize: 16,
    color: '#999',
  },
  checkboxContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#666',
  },
  signupButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    fontSize: 15,
    color: '#666',
    marginTop: 30,
  },
  loginTextBold: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  errorText: {
    color: '#a20000ff',
  },
});

export default SignupScreen;
