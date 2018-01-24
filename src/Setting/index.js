import React from 'react'
import { StyleSheet, View, ScrollView, Button } from 'react-native'
import { iOSColors } from 'react-native-typography'
import { connect } from 'react-redux'
import { novelPurge } from '../Novel/modules'
import Header from './Header'

const SettingContainer = ({ navigation, dispatch }) => (
  <View style={styles.container}>
    <Header navigation={navigation} />
    <ScrollView style={styles.scroll}>
      <Button title="novelPurge" onPress={() => dispatch(novelPurge())} />
    </ScrollView>
  </View>
)

export default connect()(SettingContainer)

const styles = StyleSheet.create({
  container: {
    backgroundColor: iOSColors.customGray,
    flex: 1
  },
  scroll: {
    backgroundColor: iOSColors.customGray,
    flex: 1,
    paddingHorizontal: 8
  }
})
