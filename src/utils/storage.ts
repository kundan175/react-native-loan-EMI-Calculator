import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoanDetails} from './calculations';

const HISTORY_KEY = '@loan_calculator_history';

export const saveCalculation = async (calculation: LoanDetails) => {
  try {
    const existingHistory = await getHistory();
    const updatedHistory = [calculation, ...existingHistory];
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    return true;
  } catch (error) {
    console.error('Error saving calculation:', error);
    return false;
  }
};

export const getHistory = async (): Promise<LoanDetails[]> => {
  try {
    const history = await AsyncStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
};

export const clearHistory = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing history:', error);
    return false;
  }
};
