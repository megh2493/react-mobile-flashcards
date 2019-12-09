import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { purple, white} from '../utils/colors'
import CommonButton from './CommonButton'

class ResultView extends Component {
  render () {
    const { yourScore, totalQuestions, deckId, onBackToDeck, onRetakeQuiz } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Your Score!</Text>
        <Text style={styles.heading}>{yourScore}/{totalQuestions}</Text>

        <View style={styles.btnContainer}>
          <CommonButton
            btnStyle={styles.retakeBtn}
            textStyle={styles.retakeBtnText}
            onPress={() => onRetakeQuiz()}
            disabled={false}>
            Retake Quiz
          </CommonButton>
          <CommonButton
            onPress={() => onBackToDeck()}
            disabled={false}>
            Back to Deck
          </CommonButton>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    alignItems: 'center'
  },
  btnContainer: {
    flex: 1,
    backgroundColor: white,
  },
  heading: {
    paddingTop: 30,
    marginBottom: 40,
    color: purple,
    fontSize: 36,
    justifyContent: 'center',
    alignItems: 'center'
  },
  retakeBtn: {
    marginTop: 40,
    borderColor: purple,
    borderWidth: 1,
    backgroundColor: white,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  retakeBtnText: {
    color: purple,
    fontSize: 20,
    textAlign: 'center',
  },
})
export default ResultView
