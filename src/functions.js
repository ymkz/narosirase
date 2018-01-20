import cheerio from 'cheerio-without-node-native'
import { parse } from 'uri-js'
import { constraints } from './constants'

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

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

export const fetchNovelContents = async url => {
  const parsed = parse(url)
  const pathnames = parsed.path.split('/')
  const ncode = pathnames[1]
  const novel = `${parsed.scheme}://${parsed.host}/${ncode}`
  const index = Number(pathnames[2]) || 0
  if (index !== 0) {
    const response = await fetch(url)
    const html = await response.text()
    const $ = cheerio.load(html)
    const subtitle = $('.novel_subtitle')
      .first()
      .text()
    const prologue = $('#novel_p').text()
    const body = $('#novel_honbun').text()
    const epilogue = $('#novel_a').text()
    return { index, subtitle, prologue, body, epilogue }
  } else {
    const response = await fetch(novel)
    const html = await response.text()
    const $ = cheerio.load(html)
    const title = $('.novel_title')
      .first()
      .text()
    const chapters = $('.chapter_title')
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
    return { index, title, chapters }
  }
}
