import React from 'react'
import { StyleSheet, View, WebView } from 'react-native'
import { patch } from '../ducks/data'

export default ({ item, dispatch }) => {
  const handleChangeWebViewState = (state) => {
    const url = state.url
    const splited = url.split('/')
    const ep = splited[splited.length - 2]
    if (isNaN(ep)) {
      return false
    } else {
      if (item.ep_now < Number(ep)) {
        dispatch(patch({...item, ep_now: Number(ep)}))
      }
    }
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: `http://ncode.syosetu.com/${item.ncode}${item.ep_now === 0 ? '/' : `/${item.ep_now}`}` }}
        onNavigationStateChange={handleChangeWebViewState}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  }
})
