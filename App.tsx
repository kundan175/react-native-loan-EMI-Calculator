import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EMICalculator from './src/screens/EMICalculator';
import History from './src/screens/History';
import About from './src/screens/About';
import {SafeAreaView, View} from 'react-native';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{flex: 1}}>
          <SafeAreaView style={{backgroundColor: 'white'}} />
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: '#4CAF50',
                tabBarInactiveTintColor: '#757575',
                tabBarLabelStyle: {
                  fontSize: 12,
                  fontWeight: '500',
                },
                tabBarStyle: {
                  backgroundColor: '#FFFFFF',
                  borderTopWidth: 1,
                  borderTopColor: '#E0E0E0',
                  paddingBottom: 8,
                  paddingTop: 8,
                  height: 75,
                },
                headerShown: false,
              }}>
              <Tab.Screen
                name="Calculator"
                component={EMICalculator}
                options={{
                  tabBarIcon: ({color, size}) => (
                    <Icon name="calculator" size={size} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="History"
                component={History}
                options={{
                  tabBarIcon: ({color, size}) => (
                    <Icon name="history" size={size} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="About"
                component={About}
                options={{
                  tabBarIcon: ({color, size}) => (
                    <Icon name="information" size={size} color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
