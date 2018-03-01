import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Share } from 'react-native'
import { human, systemWeights, iOSColors, materialColors } from 'react-native-typography'
import { connect } from 'react-redux'
import Snackbar from '../Snackbar'

const handleExport = async (dispatch, novel) => {
  const shared = await Share.share({
    title: 'narosirase-export',
    message: JSON.stringify(novel)
  }).catch(() =>
    Snackbar.show('エクスポート時にエラーが発生しました', { backgroundColor: '#f44336' })
  )
  if (shared.action === 'sharedAction') {
    Snackbar.show('小説データをエクスポートしました')
  }
}

const ExportComponent = ({ dispatch, novel }) => (
  <View style={styles.container}>
    <View style={styles.description}>
      <Text style={[human.footnote, styles.message]}>小説データをエクスポートします</Text>
      <Text style={[human.footnote, styles.message]}>Dropboxに保存を選択してください</Text>
    </View>
    <TouchableOpacity onPress={() => handleExport(dispatch, novel)}>
      <View style={styles.button}>
        <Text style={[human.footnote, systemWeights.semibold, styles.text]}>export</Text>
      </View>
    </TouchableOpacity>
  </View>
)

export default connect(({ novel }) => ({ novel }))(ExportComponent)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: iOSColors.white,
    borderBottomColor: iOSColors.midGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: iOSColors.midGray,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    marginVertical: 8,
    padding: 16
  },
  description: {
    flex: 1,
    justifyContent: 'center'
  },
  message: {
    color: materialColors.blackPrimary
  },
  button: {
    alignItems: 'center',
    backgroundColor: iOSColors.lightGray,
    borderRadius: 4,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  text: {
    color: materialColors.blackPrimary
  }
})
