import React, {useState, useEffect, useMemo} from 'react';
import * as RNLocalize from 'react-native-localize';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {LoanDetails} from '../utils/calculations';
import {clearHistory} from '../store/loanSlice';
import {RootState} from '../store/store';

const History = () => {
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.loan.history);

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all saved calculations?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            dispatch(clearHistory());
          },
        },
      ],
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

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

  const renderItem = ({item}: {item: LoanDetails}) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{formatDate(item.date)}</Text>
        <View style={styles.amountBadge}>
          <Text style={styles.amountBadgeText}>
            {formatCurrency(item.loanAmount)}
          </Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Monthly EMI</Text>
          <Text style={styles.detailValue}>{formatCurrency(item.emi)}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Interest Rate</Text>
          <Text style={styles.detailValue}>{item.interestRate}%</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Tenure</Text>
          <Text style={styles.detailValue}>{item.loanTerm} Years</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Interest</Text>
          <Text style={styles.detailValue}>
            {formatCurrency(item.totalInterest)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Amount</Text>
          <Text style={[styles.detailValue, styles.totalAmount]}>
            {formatCurrency(item.totalPayment)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Calculation History</Text>
          {history.length > 0 && (
            <TouchableOpacity
              onPress={handleClearHistory}
              style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No saved calculations yet</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={item => item.date}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    // flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    paddingBottom: Platform.select({ios: 20, android: 0}),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: '#F44336',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
    paddingBottom: Platform.select({ios: 90, android: 80}),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  date: {
    fontSize: 14,
    color: '#666666',
  },
  amountBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  amountBadgeText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  detailsContainer: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
  },
  totalAmount: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
  },
});

export default History;
