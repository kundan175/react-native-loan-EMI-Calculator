import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const About = () => {
  const openLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Icon name="information" size={60} color="#4CAF50" />
          <Text style={styles.title}>About Loan Calculator</Text>
          <Text style={styles.subtitle}>
            Calculate EMI, interest, and manage your loan calculations easily
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureItem}>
            <Icon name="calculator" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>EMI Calculator</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="history" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Calculation History</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="chart-line" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Detailed Loan Breakup</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() =>
              openLink(
                'https://www.barnardmedia.co.za/apps/loanemicalculator/privacy',
              )
            }>
            <Icon name="file-document" size={24} color="#4CAF50" />
            <Text style={styles.linkText}>Privacy Policy</Text>
            <Icon name="chevron-right" size={24} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() =>
              openLink(
                'https://www.barnardmedia.co.za/apps/loanemicalculator/terms',
              )
            }>
            <Icon name="file-document-outline" size={24} color="#4CAF50" />
            <Text style={styles.linkText}>Terms & Conditions</Text>
            <Icon name="chevron-right" size={24} color="#666666" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => openLink('mailto:info@barnardmedia.co.za')}>
            <Icon name="email" size={24} color="#4CAF50" />
            <Text style={styles.linkText}>info@barnardmedia.co.za</Text>
            <Icon name="chevron-right" size={24} color="#666666" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    paddingBottom: Platform.select({ios: 20, android: 0}),
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 12,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 14,
    color: '#666666',
  },
});

export default About;
