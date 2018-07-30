import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import ContentBody from 'src/components/Reader/ContentBody'
import ContentImages from 'src/components/Reader/ContentImages'
import ContentWord from 'src/components/Reader/ContentWord'
import NovelTitle from 'src/components/Reader/NovelTitle'
import { color } from 'src/constants'
import { NovelState } from 'src/modules/novels'
import { SettingState } from 'src/modules/Setting'

interface Props {
  novel: NovelState
  setting: SettingState
}

const PageShort: React.SFC<Props> = ({ novel, setting }) => (
  <View style={styles.container}>
    <NovelTitle novel={novel} />
    <ContentWord word={novel.contents.foreword} expandWord={setting.expandWord} pre={true} />
    <ContentBody body={novel.contents.body} setting={setting} />
    {!!novel.contents.images && <ContentImages images={novel.contents.images} />}
    <ContentWord word={novel.contents.afterword} expandWord={setting.expandWord} post={true} />
  </View>
)

export default PageShort

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    paddingHorizontal: 16,
    paddingBottom: 32
  }
})
