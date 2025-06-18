import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

export class AppAsyncStorage {
  static STORAGE_KEYS = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    phoneNumber: 'phoneNumber',
    user: 'user',
  };

  static async readData(key: string, defaultValue = null) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
    } catch (error) {
      console.log('Error reading data:', error);
      return defaultValue;
    }
  }

  static async storeData(key: string, value: any) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.log('Error storing data:', error);
    }
  }

  static async removeData(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('Error removing data:', error);
    }
  }

  static async clearAll() {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      console.log('Trước khi xóa, có các key:', allKeys);

      await AsyncStorage.clear();

      const remainingKeys = await AsyncStorage.getAllKeys();
      console.log('Sau khi xóa, còn lại key:', remainingKeys);
    } catch (error) {
      console.log('Error clearing all data:', error);
    }
  }

  static async isTokenValid() {
    const accessToken = await AppAsyncStorage.readData(
      AppAsyncStorage.STORAGE_KEYS.accessToken,
    );
    if (!accessToken) {
      return false;
    }

    try {
      const decoded = jwtDecode(accessToken);
      // console.log('decoded', decoded);
      const currentTime = Math.floor(Date.now() / 1000);

      return decoded?.exp ? decoded?.exp > currentTime : false;
    } catch (error) {
      console.log('Lỗi khi decode token:', error);
      return false;
    }
  }
}
