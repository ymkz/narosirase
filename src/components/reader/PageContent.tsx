import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import ContentBody from 'src/components/reader/ContentBody'
import ContentImages from 'src/components/reader/ContentImages'
import ContentSubtitle from 'src/components/reader/ContentSubtitle'
import ContentWord from 'src/components/reader/ContentWord'
import { color } from 'src/constants'
import { NovelState } from 'src/modules/novels'
import { SettingState } from 'src/modules/Setting'

interface Props {
  novel: NovelState
  setting: SettingState
}

class PageContent extends React.PureComponent<Props> {
  render() {
    const { novel, setting } = this.props

    return (
      <View style={styles.container}>
        <ContentSubtitle subtitle={novel.contents.subtitle} />
        <ContentWord
          word={novel.contents.foreword}
          expandWord={setting.expandWord}
          pre
        />
        <ContentBody body={novel.contents.body} setting={setting} />
        {!!novel.contents.images && (
          <ContentImages images={novel.contents.images} />
        )}
        <ContentWord
          word={novel.contents.afterword}
          expandWord={setting.expandWord}
          post
        />
      </View>
    )
  }
}

export default PageContent

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    paddingHorizontal: 16,
    paddingBottom: 32
  }
})
