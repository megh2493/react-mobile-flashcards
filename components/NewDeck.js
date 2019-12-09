import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { purple, white, lightPurp } from '../utils/colors';
import { addDeck } from '../actions'
import CommonButton from './CommonButton';
import { saveDeck } from '../utils/api'

class NewDeck extends Component {

  state = {
    deckName: ''
  }

  onTextChanged = (text) => {
    this.setState(() => ({
      deckName: text
    }))
  }

  onSubmit = () => {
    const { deckName } = this.state
    const deck = {
      title: deckName,
      questions: []
    }
    this.props.dispatch(addDeck({
      deck
    }))
    saveDeck(deck)
    this.toDeck()

    this.setState(() => ({
      deckName: ''
    }))
  }

  toDeck = () => {
    this.props.navigation.navigate(
      'Deck',
      { deckId: this.state.deckName }
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>What do you want to call your new deck?</Text>
        <TextInput style={styles.textInput}
          onChangeText={text => this.onTextChanged(text)}
          value={this.state.deckName}
          placeholder="Enter your deck name"
          placeholderTextColor={lightPurp}
        />
        <View style={styles.container}>
        <CommonButton
          onPress={this.onSubmit}
          disabled={this.state.deckName === ''}>
          Create
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
    padding: 15
  },
  heading: {
    paddingTop: 30,
    marginBottom: 40,
    color: purple,
    fontSize: 36,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    borderColor: lightPurp,
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'stretch',
    textAlign: 'center',
    color: purple
  },
});

export default connect()(NewDeck)
