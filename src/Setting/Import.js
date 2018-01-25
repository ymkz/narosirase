import React from 'react'
import { DocumentPicker, FileSystem } from 'expo'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import {
  human,
  systemWeights,
  iOSColors,
  materialColors
} from 'react-native-typography'
import { alertDelay } from '../constants'
import { sleep } from '../functions'
import { novelHydrate } from '../Novel/modules'
import { alertShow, alertHide } from '../Alert/modules'

const errorHandler = async (dispatch, message = 'Error happened') => {
  dispatch(alertShow(message))
  await sleep(alertDelay)
  dispatch(alertHide())
}

const handleImport = async dispatch => {
  const picked = await DocumentPicker.getDocumentAsync().catch(() =>
    errorHandler(dispatch, 'インポート時にエラーが発生しました')
  )
  if (picked.type === 'cancel') {
    return false
  } else if (picked.type === 'success') {
    const downloaded = await FileSystem.downloadAsync(
      picked.uri,
      `${FileSystem.documentDirectory}import.json`
    ).catch(() =>
      errorHandler(dispatch, '一時ファイルダウンロード時にエラーが発生しました')
    )
    const read = await FileSystem.readAsStringAsync(downloaded.uri).catch(() =>
      errorHandler(dispatch, '一時ファイル読み込み時にエラーが発生しました')
    )
    const json = JSON.parse(read)
    dispatch(novelHydrate(json))
    dispatch(alertShow('小説データをインポートしました'))
    await sleep(alertDelay)
    dispatch(alertHide())
  } else {
    return false
  }
}

const ImportComponent = ({ dispatch }) => (
  <View style={styles.container}>
    <View style={styles.description}>
      <Text style={[human.footnote, styles.message]}>
        小説データをインポートします
      </Text>
      <Text style={[human.footnote, styles.message]}>
        Dropboxを選択してください
      </Text>
    </View>
    <TouchableOpacity onPress={() => handleImport(dispatch)}>
      <View style={styles.button}>
        <Text style={[human.footnote, systemWeights.semibold, styles.text]}>
          import
        </Text>
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
