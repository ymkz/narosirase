import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { human, systemWeights, iOSColors, materialColors } from 'react-native-typography'
import { DocumentPicker, FileSystem } from 'expo'
import { novelHydrate } from '../Novel/modules'
import Snackbar from '../Snackbar'

const handleImport = async dispatch => {
  const picked = await DocumentPicker.getDocumentAsync().catch(() =>
    Snackbar.show('インポート時にエラーが発生しました', { backgroundColor: '#f44336' })
  )
  if (picked.type === 'cancel') {
    return false
  } else if (picked.type === 'success') {
    const downloaded = await FileSystem.downloadAsync(
      picked.uri,
      `${FileSystem.documentDirectory}import.json`
    ).catch(() =>
      Snackbar.show('一時ファイルダウンロード時にエラーが発生しました', {
        backgroundColor: '#f44336'
      })
    )
    const read = await FileSystem.readAsStringAsync(downloaded.uri).catch(() =>
      Snackbar.show('一時ファイル読み込み時にエラーが発生しました', { backgroundColor: '#f44336' })
    )
    const json = JSON.parse(read)
    dispatch(novelHydrate(json))
    Snackbar.show('小説データをインポートしました')
  } else {
    return false
  }
}

const ImportComponent = ({ dispatch }) => (
  <View style={styles.container}>
    <View style={styles.description}>
      <Text style={[human.footnote, styles.message]}>小説データをインポートします</Text>
      <Text style={[human.footnote, styles.message]}>Dropboxを選択してください</Text>
    </View>
    <TouchableOpacity onPress={() => handleImport(dispatch)}>
      <View style={styles.button}>
        <Text style={[human.footnote, systemWeights.semibold, styles.text]}>import</Text>
      </View>
    </TouchableOpacity>
  </View>
)

export default ImportComponent

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
