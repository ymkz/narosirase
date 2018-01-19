import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { materialColors } from 'react-native-typography'
import { ActionSheet } from 'react-native-cell-components'
import { connect } from 'react-redux'
import { constraints } from '../constants'
import { show, patch, hide } from '../Alert/modules'
import Box from './Box'

const MyButton = ({ title, onPress }) => (
  <Button title={title} onPress={onPress} />
)

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const handlePress = async dispatch => {
  dispatch(show())
  dispatch(patch('payload'))
  await sleep(3000)
  dispatch(patch('更新が完了しました'))
  await sleep(2000)
  dispatch(hide())
}

class SettingContainer extends React.PureComponent {
  state = {
    novel: null
  }

  render() {
    return (
      <View style={styles.container}>
        <MyButton title="ActionSheet" onPress={() => this.actionSheet.open()} />
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button
          title="Alert"
          onPress={() => handlePress(this.props.dispatch)}
        />
        <Button
          title="To"
          onPress={() => this.props.navigation.navigate('Addition')}
        />
        <ActionSheet
          ref={ref => (this.actionSheet = ref)}
          mode="list"
          onOpen={() =>
            this.setState({
              novel: { ncode: 'n1111', title: 'これが小説のタイトトルです' }
            })
          }
          onClose={() => this.setState({ novel: null })}
        >
          <View style={styles.actionSheetContainer}>
            <Box
              icon="chrome-reader-mode"
              text="reading"
              onPress={() =>
                this.actionSheet.close(() => console.log(this.state))
              }
            />
            <Box
              icon="watch-later"
              text="pending"
              onPress={() =>
                this.actionSheet.close(() => console.log('pending'))
              }
            />
            <Box
              icon="archive"
              text="archive"
              onPress={() =>
                this.actionSheet.close(() => console.log('archive'))
              }
            />
            <Box
              destructive
              last
              icon="delete-forever"
              text="delete"
              onPress={() =>
                this.actionSheet.close(() => console.log('delete'))
              }
            />
          </View>
        </ActionSheet>
      </View>
    )
  }
}

export default connect()(SettingContainer)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.whitePrimary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionSheetContainer: {
    backgroundColor: materialColors.whitePrimary,
    flexDirection: 'row',
    padding: constraints.deviceWidth / 25
  }
})
