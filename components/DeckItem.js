import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { purple, white } from '../utils/colors';
import DeckPanel from './DeckPanel'
import CommonButton from './CommonButton';

class DeckItem extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params
    return {
      title: `${deckId}`
    }
  }
  render() {
    const { display } = this.props
     return (
      <View style={styles.container}>
      <DeckPanel deckId={display.title}/>
      <View style={styles.container}>
      <CommonButton
      btnStyle={styles.newCardBtn}
      textStyle={styles.newCardBtnText}
        onPress={() => this.props.navigation.navigate(
              'NewCard',
              { deckId: display.title }
            )}
          disabled={false}>
          Add Card
          </CommonButton>
        <CommonButton
        onPress={() => this.props.navigation.navigate(
              'StartQuiz',
              { deckId: display.title }
            )}
          disabled={display.questions.length === 0}>
          Start Quiz
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
  },
  newCardBtn: {
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
  newCardBtnText: {
    color: purple,
    fontSize: 20,
    textAlign: 'center',
  },
})

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params
  const deck = state[deckId]
  return {
    display: deck
  }
}

export default connect(mapStateToProps)(DeckItem)
