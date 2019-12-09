import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'

export default function CommonButton({ children, onPress, btnStyle={}, textStyle={}, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.btnStyle, btnStyle]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[styles.textStyle, textStyle]}>{children}</Text>
    </TouchableOpacity>
  )

}
const styles = StyleSheet.create({
  btnStyle: {
    marginTop: 40,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  textStyle: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
  },
})
