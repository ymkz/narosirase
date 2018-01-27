import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { TabViewAnimated } from 'react-native-tab-view'
import { materialColors } from 'react-native-typography'
import { ActionSheet } from 'react-native-cell-components'
import { connect } from 'react-redux'
import { constraints, status, alertDelay } from '../constants'
import { sleep } from '../functions'
import { alertShow, alertHide } from '../Alert/modules'
import { novelPatch, novelRemove } from './modules'
import Header from './Header'
import Novels from './Novels'
import Box from './Box'

class NovelContainer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      novel: null,
      tabview: {
        index: 0,
        routes: [
          { key: 'reading', title: 'Reading', index: 0 },
          { key: 'pending', title: 'Pending', index: 1 },
          { key: 'archive', title: 'Archive', index: 2 }
        ]
      }
    }
  }

  handleActionSheet = novel => {
    this.setState({ novel })
    this.actionSheet.open()
  }

  handleToReading = async () => {
    StatusBar.setBarStyle('light-content', true)
    this.props.dispatch(alertShow('小説を読むに移動しました'))
    this.props.dispatch(
      novelPatch({ ...this.state.novel, status: status.reading })
    )
    this.actionSheet.close()
    await sleep(alertDelay)
    this.props.dispatch(alertHide())
    StatusBar.setBarStyle('dark-content', true)
  }

  handleToPending = async () => {
    StatusBar.setBarStyle('light-content', true)
    this.props.dispatch(alertShow('小説をあとで読むに移動しました'))
    this.props.dispatch(
      novelPatch({ ...this.state.novel, status: status.pending })
    )
    this.actionSheet.close()
    await sleep(alertDelay)
    this.props.dispatch(alertHide())
    StatusBar.setBarStyle('dark-content', true)
  }

  handleToArchive = async () => {
    StatusBar.setBarStyle('light-content', true)
    this.props.dispatch(alertShow('小説をアーカイブに移動しました'))
    this.props.dispatch(
      novelPatch({ ...this.state.novel, status: status.archive })
    )
    this.actionSheet.close()
    await sleep(alertDelay)
    this.props.dispatch(alertHide())
    StatusBar.setBarStyle('dark-content', true)
  }

  handleRemove = async () => {
    StatusBar.setBarStyle('light-content', true)
    this.props.dispatch(alertShow('小説を削除しました'))
    this.props.dispatch(novelRemove(this.state.novel))
    this.actionSheet.close()
    await sleep(alertDelay)
    this.props.dispatch(alertHide())
    StatusBar.setBarStyle('dark-content', true)
  }

  handleIndexChange = index => {
    this.setState({ tabview: { ...this.state.tabview, index } })
  }

  renderHeader = ({ navigationState }) => (
    <Header
      navigation={this.props.navigation}
      handleIndexChange={this.handleIndexChange}
      {...navigationState}
    />
  )

  renderScene = ({ route }) => (
    <Novels
      route={route}
      navigation={this.props.navigation}
      handleActionSheet={this.handleActionSheet}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <TabViewAnimated
          style={styles.tabview}
          navigationState={this.state.tabview}
          onIndexChange={this.handleIndexChange}
          renderHeader={this.renderHeader}
          renderScene={this.renderScene}
          useNativeDriver
        />
        <ActionSheet
          ref={ref => (this.actionSheet = ref)}
          mode="list"
          onClose={() => this.setState({ novel: null })}
        >
          <View style={styles.actionsheet}>
            <Box
              icon="chrome-reader-mode"
              text="reading"
              onPress={this.handleToReading}
            />
            <Box
              icon="watch-later"
              text="pending"
              onPress={this.handleToPending}
            />
            <Box icon="archive" text="archive" onPress={this.handleToArchive} />
            <Box
              destructive
              last
              icon="delete-forever"
              text="delete"
              onPress={this.handleRemove}
            />
          </View>
        </ActionSheet>
      </View>
    )
  }
}

export default connect(({ novel }) => ({ novel }))(NovelContainer)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.whitePrimary
  },
  tabview: {
    flex: 1
  },
  actionsheet: {
    backgroundColor: materialColors.whitePrimary,
    flexDirection: 'row',
    padding: constraints.deviceWidth / 25
  }
})
