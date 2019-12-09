import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { lightPurp } from '../utils/colors'

export default function ShowAnswerButton({ children, onPress, style={} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.showAnswer, style]}>{children}</Text>
    </TouchableOpacity>
  )

}
const styles = StyleSheet.create({
  showAnswer: {
    textAlign: 'center',
    color: lightPurp,
    fontSize: 20
  }
})
