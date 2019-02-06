import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/core/TabBarIcon';
import CarLotsScreen from '../screens/CarLotsScreen';
import HouseLotsScreen from '../screens/HouseLotsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HouseWatchLotsScreen from '../screens/HouseWatchLotsScreen';

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-cog' : 'md-settings'}
    />
  ),
};

const CarLotsStack = createStackNavigator({
  CarLots: CarLotsScreen,
});

CarLotsStack.navigationOptions = {
  tabBarLabel: 'Cars',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-car' : 'md-car'}
    />
  ),
};

const HouseLotsStack = createStackNavigator({
  HouseLots: HouseLotsScreen,
});

HouseLotsStack.navigationOptions = {
    tabBarLabel: 'Houses (all)',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        />
    ),
};

const HouseWatchLotsStack = createStackNavigator({
    HouseWatchLots: HouseWatchLotsScreen,
});

HouseWatchLotsStack.navigationOptions = {
    tabBarLabel: 'Houses (live)',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        />
    ),
};

export default createBottomTabNavigator({
    SettingsStack,
    CarLotsStack,
    HouseLotsStack,
    HouseWatchLotsStack
});
