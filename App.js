import React, { Component } from 'react'
import { Text, View, StyleSheet, Settings } from 'react-native'
import AppStack from './src/navigation/AppStack';
import { NavigationContainer } from '@react-navigation/native';
export default class App extends Component {
  render() {
    return (
        <AppStack />
    );
  }
}
const styles = StyleSheet.create({})