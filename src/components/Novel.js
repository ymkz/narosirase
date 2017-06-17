import React, { Component } from 'react'
import { StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { refresh, remove } from '../ducks/data'

export default class Novel extends Component {
  constructor (props) {
    super()
    this.state = {
      refreshing: false
    }
  }

  handleRefresh = () => {
    this.setState({ refreshing: true })
    this.props.data.map(item => {
      fetch(`http://api.syosetu.com/novelapi/api?ncode=${item.ncode}&out=json`, {
        'Content-Type': 'application/json',
        'Accepted': 'application/json'
      }).then(response => {
        return response.json()
      }).then(json => {
        this.props.dispatch(refresh({
          title: json[1].title,
          writer: json[1].writer,
          ncode: json[1].ncode,
          ep_last: json[1].general_all_no,
          ep_now: item.ep_now
        }))
        this.setState({ refreshing: false })
      }).catch(error => {
        console.log(error)
      })
    })
  }

  handleRemove = (item) => {
    Alert.alert(
      'この小説をを削除する',
      item.title,
      [
        { text: 'キャンセル', style: 'cancel', onPress: () => console.log('remove is canceled') },
        { text: '削除', style: 'destructive', onPress: () => this.props.dispatch(remove(item.ncode)) }
      ]
    )
  }

  render () {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh} />
        }>
        <List containerStyle={styles.container}>
          {this.props.data.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              titleStyle={styles.title}
              subtitle={`${item.writer}\n${`${item.ep_now}話 / 全${item.ep_last}話`}`}
              subtitleStyle={styles.subtitle}
              rightIcon={{ name: 'fiber-new', color: 'deepskyblue' }}
              hideChevron={item.ep_now === item.ep_last}
              onPress={() => Actions.web({ item: item, dispatch: this.props.dispatch, title: item.title })}
              onLongPress={() => this.handleRemove(item)}
            />
          ))}
        </List>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 6,
    marginLeft: 0,
    color: '#646464'
  },
  subtitle: {
    marginLeft: 0
  }
})
