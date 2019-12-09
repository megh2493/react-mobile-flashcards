import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { purple, white, lightPurp } from '../utils/colors';
import { addCard } from '../actions'
import CommonButton from './CommonButton';
import { saveCard } from '../utils/api'

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  onQuestionChanged = (text) => {
    this.setState(() => ({
      question: text
    }))
  }
  onAnswerChanged = (text) => {
    this.setState(() => ({
      answer: text
    }))
  }

  onSubmit = () => {
    const { question, answer } = this.state
    const { deckKey } = this.props
    this.props.dispatch(addCard({
      question,
      answer,
      deckKey
    }))
    saveCard(deckKey,{question, answer})
    this.backToDeck()
    this.setState(() => ({
      question: '',
      answer: '',
    }))
  }

  backToDeck = () => {
    this.props.navigation.goBack()
  }

  render () {
    const { question, answer } = this.state
    return (
      <View style={styles.container}>
        <TextInput style={styles.textInput}
          onChangeText={text => this.onQuestionChanged(text)}
          value={this.state.question}
          placeholder="Enter your question"
          placeholderTextColor={lightPurp}
        />
        <TextInput style={styles.textInput}
          onChangeText={text => this.onAnswerChanged(text)}
          value={this.state.answer}
          placeholder="Enter your answer"
          placeholderTextColor={lightPurp}
        />
        <View style={styles.container}>
          <CommonButton
            onPress={this.onSubmit}
            disabled={question === '' || answer === ''}>
            Add Card
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
    alignItems: "center",
    padding: 15
  },
  textInput: {
    height: 40,
    borderColor: lightPurp,
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'stretch',
    textAlign: 'center',
    color: purple,
    marginBottom: 20,
  },
});

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deckKey: deckId
  }
}

export default connect(mapStateToProps)(NewCard)
