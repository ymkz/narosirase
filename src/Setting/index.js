import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { materialColors } from 'react-native-typography'
import { ActionSheet } from 'react-native-cell-components'
import { connect } from 'react-redux'
import { constraints } from '../constants'
import { sleep } from '../functions'
import { show, patch, hide } from '../Alert/modules'
import Box from './Box'

const MyButton = ({ title, onPress }) => (
  <Button title={title} onPress={onPress} />
)

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
        <MyButton
          title="Alert"
          onPress={() => handlePress(this.props.dispatch)}
        />
        <MyButton
          title="To Addition"
          onPress={() => this.props.navigation.navigate('Addition')}
        />
        <MyButton
          title="To Reader"
          onPress={() => this.props.navigation.navigate('Reader')}
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
