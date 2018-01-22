import cheerio from 'cheerio-without-node-native'
import { parse } from 'uri-js'
import { constraints, genre } from './constants'

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const errorHandler = error => console.log(error)

export const canMoveNext = ({
  layoutMeasurement,
  contentOffset,
  contentSize
}) => {
  return (
    layoutMeasurement.height + contentOffset.y >
    contentSize.height + constraints.scrollOffset
  )
}

export const canMovePrev = ({ contentOffset }) => {
  return contentOffset.y < -constraints.scrollOffset
}

export const novelObjectMapper = novel => ({
  ncode: novel.ncode.toLowerCase(),
  title: novel.title,
  userid: novel.userid,
  writer: novel.writer,
  short: novel.novel_type === 2,
  story: novel.story,
  isstop: novel.isstop === 1,
  genre: genre[novel.genre],
  keywords: novel.keyword.split(' '),
  publishedAt: novel.general_firstup,
  lastPostedAt: novel.general_lastup,
  lastUpdatedAt: novel.novelupdated_at,
  time: novel.time,
  end: novel.end === 0,
  episodes: novel.general_all_no
})

export const fetchNovelContents = async url => {
  const parsed = parse(url)
  const pathnames = parsed.path.split('/')
  const ncode = pathnames[1]
  const novel = `${parsed.scheme}://${parsed.host}/${ncode}`
  const index = Number(pathnames[2]) || 0
  if (index === 0) {
    const response = await fetch(novel).catch(errorHandler)
    const html = await response.text()
    const $ = cheerio.load(html)
    let chapters = $('.chapter_title')
      .map((i, e) => ({
        chapter: $(e).text(),
        episodes: $(e)
          .nextUntil('.chapter_title')
          .map((i, e) => ({
            index: Number(
              parse(
                $(e)
                  .children('.subtitle')
                  .first()
                  .children()
                  .attr('href')
              ).path.split('/')[2]
            ),
            subtitle: $(e)
              .children('.subtitle')
              .first()
              .children()
              .text()
          }))
          .get()
      }))
      .get()
    if (chapters.length === 0) {
      chapters.push({
        chapter: '',
        episodes: $('.novel_sublist2')
          .map((i, e) => ({
            index: Number(
              parse(
                $(e)
                  .children('.subtitle')
                  .first()
                  .children()
                  .attr('href')
              ).path.split('/')[2]
            ),
            subtitle: $(e)
              .children('.subtitle')
              .first()
              .children()
              .text()
          }))
          .get()
      })
    }
    return { chapters }
  } else {
    const response = await fetch(url).catch(errorHandler)
    const html = await response.text()
    const $ = cheerio.load(html)
    const subtitle = $('.novel_subtitle')
      .first()
      .text()
    const prologue = $('#novel_p').text()
    const body = $('#novel_honbun').text()
    const epilogue = $('#novel_a').text()
    return { subtitle, prologue, body, epilogue }
  }
}
