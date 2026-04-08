// App.js
import 'react-native-gesture-handler'; // ต้องเพิ่มสำหรับ React Navigation
import React , {useEffect , useRef, useState} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState ,ActivityIndicator , View } from 'react-native';
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check login status
  const checkLoginStatus = async () => {
    try {
    const status = await AsyncStorage.getItem('isLoggedIn');
    console.log(`status: ${status}`);
    setIsLoggedIn(status);
    }catch (error) {
      console.log(error);
    }finally {
      setIsLoading(false);
    }
  };
  // use effect
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // show activity indicator while loading
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1bb294ff" />
      </View>
    )
  }

  return <AppNavigator isLoggedIn={isLoggedIn}/>;
};

export default App;