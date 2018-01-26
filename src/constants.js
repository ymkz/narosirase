import { Dimensions } from 'react-native'
import { Constants } from 'expo'

export const constraints = {
  deviceHeight: Dimensions.get('window').height,
  deviceWidth: Dimensions.get('window').width,
  statusBarHeight: Constants.statusBarHeight,
  alertHeight: Constants.statusBarHeight * 2,
  headerHeight: 96,
  searchHeight: 36,
  separatorHeight: 48,
  separatorpadding: 24,
  scrollOffset: 96,
  promoterOffset: 64
}

export const option = {
  'Content-Type': 'application/json',
  Accepted: 'application/json'
}

export const genre = {
  101: '異世界〔恋愛〕',
  102: '現実世界〔恋愛〕',
  201: 'ハイファンタジー〔ファンタジー〕',
  202: 'ローファンタジー〔ファンタジー〕',
  301: '純文学〔文芸〕',
  302: 'ヒューマンドラマ〔文芸〕',
  303: '歴史〔文芸〕',
  304: '推理〔文芸〕',
  305: 'ホラー〔文芸〕',
  306: 'アクション〔文芸〕',
  307: 'コメディー〔文芸〕',
  401: 'VRゲーム〔SF〕',
  402: '宇宙〔SF〕',
  403: '空想科学〔SF〕',
  404: 'パニック〔SF〕',
  9901: '童話〔その他〕',
  9902: '詩〔その他〕',
  9903: 'エッセイ〔その他〕',
  9904: 'リプレイ〔その他〕',
  9999: 'その他〔その他〕',
  9801: 'ノンジャンル〔ノンジャンル〕'
}

export const status = {
  reading: 'reading',
  pending: 'pending',
  archive: 'archive'
}

export const fontSizeRange = [12, 13, 14, 15, 16]
export const lineHeightRange = [18, 19, 20, 21, 22]

export const patchDelay = 200
export const alertDelay = 1000
