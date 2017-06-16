import React, { Component } from 'react'
import { StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { refresh } from '../ducks/data'
import Subtitle from '../components/Subtitlle'

export default class Novel extends Component {
  constructor (props) {
    super()
    this.state = {
      refreshing: false
    }
  }

  handleRefresh = () => {
    this.setState({refreshing: true})
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

  handleRemove = () => {
    console.log('long-press: remove')
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
              onLongPress={this.handleRemove}
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
