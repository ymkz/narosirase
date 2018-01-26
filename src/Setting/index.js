import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { iOSColors } from 'react-native-typography'
import { connect } from 'react-redux'
import Header from './Header'
import Config from './Config'
import Developer from './Developer'
import About from './About'
import Disclaimer from './Disclaimer'
import Import from './Import'
import Export from './Export'
import Purge from './Purge'

const SettingContainer = ({ setting, navigation, dispatch }) => (
  <View style={styles.container}>
    <Header navigation={navigation} />
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContainer}
    >
      <Config dispatch={dispatch} setting={setting} />
      <Developer />
      <About />
      <Disclaimer />
      <Export />
      <Import dispatch={dispatch} />
      <Purge dispatch={dispatch} />
    </ScrollView>
  </View>
)

export default connect(({ setting }) => ({ setting }))(SettingContainer)

const styles = StyleSheet.create({
  container: {
    backgroundColor: iOSColors.customGray,
    flex: 1
  },
  scroll: {
    backgroundColor: iOSColors.customGray,
    flex: 1
  },
  scrollContainer: {
    paddingVertical: 16
  }
})
