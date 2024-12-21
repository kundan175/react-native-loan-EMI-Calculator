import React, {useState, useEffect, useMemo} from 'react';
import * as RNLocalize from 'react-native-localize';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {
  calculateEMI,
  calculateTotalAmount,
  calculateTotalInterest,
  LoanDetails,
} from '../utils/calculations';
import {useDispatch} from 'react-redux';
import {addToHistory} from '../store/loanSlice';

const {width} = Dimensions.get('window');

const EMICalculator = () => {
  const dispatch = useDispatch();
  const [principal, setPrincipal] = useState('500000');
  const [interestRate, setInterestRate] = useState('10.5');
  const [tenure, setTenure] = useState('5');
  const [result, setResult] = useState<LoanDetails | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const calculateResults = () => {
    const p = parseFloat(principal);
    const r = parseFloat(interestRate);
    const t = parseFloat(tenure);

    if (isNaN(p) || isNaN(r) || isNaN(t)) return;

    const emi = calculateEMI(p, r, t);
    const totalAmount = calculateTotalAmount(emi, t);
    const totalInterest = calculateTotalInterest(totalAmount, p);

    setResult({
      loanAmount: p,
      interestRate: r,
      loanTerm: t,
      emi,
      totalPayment: totalAmount,
      totalInterest,
      date: new Date().toISOString(),
    });

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    calculateResults();
  }, [principal, interestRate, tenure]);

  const formatCurrency = useMemo(() => {
    const locale = RNLocalize.getLocales()[0];
    const currency = RNLocalize.getCurrencies()[0];

    return (value: number) => {
      try {
        return new Intl.NumberFormat(locale.languageTag, {
          style: 'currency',
          currency: currency,
        }).format(value);
      } catch (error) {
        // Fallback to basic formatting if Intl.NumberFormat fails
        return currency + ' ' + value.toLocaleString(locale.languageTag);
      }
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>EMI Calculator</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Loan Amount</Text>
          <TextInput
            style={styles.input}
            value={principal}
            onChangeText={setPrincipal}
            keyboardType="numeric"
            placeholder="Enter loan amount"
          />
          <Slider
            style={styles.slider}
            minimumValue={100000}
            maximumValue={10000000}
            value={parseFloat(principal)}
            onValueChange={value => setPrincipal(Math.round(value).toString())}
            minimumTrackTintColor="#4CAF50"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#4CAF50"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Interest Rate (%)</Text>
          <TextInput
            style={styles.input}
            value={interestRate}
            onChangeText={setInterestRate}
            keyboardType="numeric"
            placeholder="Enter interest rate"
          />
          <Slider
            style={styles.slider}
            minimumValue={5}
            maximumValue={20}
            value={parseFloat(interestRate)}
            onValueChange={value => setInterestRate(value.toFixed(1))}
            minimumTrackTintColor="#4CAF50"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#4CAF50"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Loan Tenure (Years)</Text>
          <TextInput
            style={styles.input}
            value={tenure}
            onChangeText={setTenure}
            keyboardType="numeric"
            placeholder="Enter loan tenure"
          />
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={30}
            value={parseFloat(tenure)}
            onValueChange={value => setTenure(Math.round(value).toString())}
            minimumTrackTintColor="#4CAF50"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#4CAF50"
          />
        </View>
      </View>

      {result && (
        <Animated.View style={[styles.resultCard, {opacity: fadeAnim}]}>
          <Text style={styles.resultTitle}>Loan Summary</Text>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Monthly EMI</Text>
            <Text style={styles.resultValue}>{formatCurrency(result.emi)}</Text>
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Total Interest</Text>
            <Text style={styles.resultValue}>
              {formatCurrency(result.totalInterest)}
            </Text>
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Total Amount</Text>
            <Text style={styles.resultValue}>
              {formatCurrency(result.totalPayment)}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              if (result) {
                dispatch(addToHistory(result));
                Alert.alert('Success', 'Calculation saved successfully!');
              }
            }}>
            <Text style={styles.saveButtonText}>Save Calculation</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#FAFAFA',
  },
  slider: {
    marginTop: 10,
    width: width - 72,
    alignSelf: 'center',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    margin: 16,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  resultLabel: {
    fontSize: 16,
    color: '#666666',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EMICalculator;
