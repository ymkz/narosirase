import { Constants } from 'expo'
import { Dimensions } from 'react-native'

export const constraint = {
  deviceHeight: Dimensions.get('window').height,
  deviceWidth: Dimensions.get('window').width,
  initialItemHeight: 75,
  statusBarHeight: Constants.statusBarHeight || 20,
  headerHeight: 40,
  scrollOffset: Constants.statusBarHeight + 40 || 60
}

export const color = {
  black: '#2e3440',
  darkBlack: '#3b4252',
  middleBlack: '#434c5e',
  lightBlack: '#4c566a',
  darkGray: '#d8dee9',
  middleGray: '#e5e9f0',
  lightGray: '#eceff4',
  white: '#ffffff',
  red: '#bf616a',
  blue: '#88c0d0',
  transparent: 'transparent'
}

export const narou = {
  wait: 800,
  api: 'https://api.syosetu.com/novelapi/api?',
  novel: 'ncode.syosetu.com',
  search: 'https://yomou.syosetu.com/rank/genretop',
  genre: {
    '101': '異世界〔恋愛〕',
    '102': '現実世界〔恋愛〕',
    '201': 'ハイファンタジー〔ファンタジー〕',
    '202': 'ローファンタジー〔ファンタジー〕',
    '301': '純文学〔文芸〕',
    '302': 'ヒューマンドラマ〔文芸〕',
    '303': '歴史〔文芸〕',
    '304': '推理〔文芸〕',
    '305': 'ホラー〔文芸〕',
    '306': 'アクション〔文芸〕',
    '307': 'コメディー〔文芸〕',
    '401': 'VRゲーム〔SF〕',
    '402': '宇宙〔SF〕',
    '403': '空想科学〔SF〕',
    '404': 'パニック〔SF〕',
    '9901': '童話〔その他〕',
    '9902': '詩〔その他〕',
    '9903': 'エッセイ〔その他〕',
    '9904': 'リプレイ〔その他〕',
    '9999': 'その他〔その他〕',
    '9801': 'ノンジャンル〔ノンジャンル〕'
  }
}
