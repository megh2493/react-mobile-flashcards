import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux'
import { purple, white, red, green, black, lightPurp } from '../utils/colors'
import CommonButton from './CommonButton'
import ShowAnswerButton from './ShowAnswerButton'
import ResultView from './ResultView'
import {clearLocalNotification, setLocalNotification} from '../utils/helpers'

class QuizView extends Component {
  state = {
    currentQuestion: '',
    currentAnswer: '',
    totalCorrect: 0,
    count: 0,
    showAnswer: false,
    questionsLeft: [],
    showResults: false
  }

  componentDidMount () {
    this.loadFirstQuestion()
    clearLocalNotification()
      .then(setLocalNotification)
  }

  loadFirstQuestion = () => {
    const { quizDeck } = this.props
    const questions = [...quizDeck.questions]
    const firstQuestion = questions.pop()

    this.setState(() => ({
      currentQuestion: firstQuestion.question,
      currentAnswer: firstQuestion.answer,
      count: 1,
      questionsLeft: questions,
      showResults: false,
      totalCorrect: 0,
    }))
  }

  onCorrect = () => {
    this.nextQuestion(true)
  }

  onIncorrect = () => {
    this.nextQuestion(false)
  }

  backToDeck = () => {
    this.props.navigation.navigate(
      'Deck',
      { deckId: this.props.quizDeck.title }
    )
  }

  retakeQuiz = () => {
    this.loadFirstQuestion()
  }

  nextQuestion = (wasCorrect) => {
    if (this.state.questionsLeft.length === 0) {
      //show results
      this.setState((prevState) => ({
        showResults: true,
        totalCorrect: wasCorrect ? prevState.totalCorrect + 1 : prevState.totalCorrect,
        count: prevState.count + 1,
        showAnswer: false
      }))
    } else {
      //show next question
      const questions = [...this.state.questionsLeft]
      const nextQuestion = questions.pop()
      this.setState((prevState) => ({
        totalCorrect: wasCorrect ? prevState.totalCorrect + 1 : prevState.totalCorrect,
        currentQuestion: nextQuestion.question,
        currentAnswer: nextQuestion.answer,
        questionsLeft: questions,
        count: prevState.count + 1,
        showAnswer: false
      }))
    }
  }

  showAnswer = () => {
    this.setState(() => ({
      showAnswer: true
    }))
  }

  render () {
    const { quizDeck } = this.props
    const { currentQuestion, currentAnswer, totalCorrect, count, showAnswer, showResults } = this.state
    return (
      <View style={styles.container}>
        {showResults === false && (<View style={styles.container}>
          <Text style={styles.answer}>{count}/{quizDeck.questions.length}</Text>
          <Text style={styles.heading}>{currentQuestion}</Text>
          {showAnswer === false &&
            <ShowAnswerButton
              onPress={this.showAnswer}>
              Show Answer
        </ShowAnswerButton>}
          {showAnswer === true &&
            <Text style={styles.answer}>{currentAnswer}</Text>}
          <View style={styles.btnContainer}>
            <CommonButton
              btnStyle={styles.correctBtn}
              textStyle={styles.btnText}
              onPress={this.onCorrect}
              disabled={false}>
              Correct
          </CommonButton>
            <CommonButton
              btnStyle={styles.incorrectBtn}
              textStyle={styles.btnText}
              onPress={this.onIncorrect}
              disabled={false}>
              Incorrect
          </CommonButton>
          </View>
        </View>)}
        {showResults === true && (
          <ResultView
          yourScore={totalCorrect}
          totalQuestions={quizDeck.questions.length}
          onRetakeQuiz={this.retakeQuiz}
          onBackToDeck={this.backToDeck}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    padding: 15
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
  correctBtn: {
    backgroundColor: green,
    paddingHorizontal: 40
  },
  incorrectBtn: {
    backgroundColor: red,
    paddingHorizontal: 40
  },
  btnText: {
    color: black
  },
  answer: {
    color: lightPurp,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params
  const deck = state[deckId]
  console.log("mapstate deck:", deck)
  return {
    quizDeck: deck
  }
}

export default connect(mapStateToProps)(QuizView)
