import dayjs from 'dayjs'
import { NativeScrollEvent } from 'react-native'
import cheerio from 'react-native-cheerio'
import Snackbar from 'rn-snackbar'
import { color, constraint, narou } from 'src/constants'
import { Content, Index, NovelData, NovelState } from 'src/modules/novels'
import { parse } from 'url'

export const snackbar = {
  success: (message: string) => {
    return Snackbar.show(message, {
      duration: 3000,
      backgroundColor: color.lightBlack,
      textColor: color.lightGray
    })
  },
  error: (message: string) => {
    return Snackbar.show(message, {
      duration: 3000,
      backgroundColor: color.red,
      textColor: color.lightGray
    })
  }
}

export function sleep(ms: number): Promise<number> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function capitalize([first, ...rest]: string): string {
  return `${first.toUpperCase()}${rest.join('').toLowerCase()}`
}

export function currentPageInfo(novel: NovelState): string {
  if (isShortStory(novel)) {
    return '短編'
  } else if (isIndexPage(novel)) {
    return `目次／全${novel.episodes}話`
  } else {
    return `第${novel.page}話／全${novel.episodes}話`
  }
}

export function lastUpdateInfo({ lastUpdatedAt }: NovelState): string {
  return `最終更新 ${dayjs(lastUpdatedAt).format('M月D日h時m分')}`
}

export function validToAddNovel(url: string, novels: NovelState[]) {
  if (url) {
    const isNarouNovelUrl: boolean = RegExp(narou.novel).test(url)
    const isNewNovel: boolean = !novels.filter(
      item => item.ncode === parse(url).pathname.split('/')[1]
    ).length
    return isNarouNovelUrl && isNewNovel
  } else {
    return false
  }
}

export function isIndexPage({ page }: NovelState): boolean {
  return page === 0
}

export function isLastEpisode({ page, episodes }: NovelState): boolean {
  return page === episodes
}

export function isShortStory({ isShort }: NovelState): boolean {
  return isShort
}

export function ableToMovePrev({ contentOffset }: NativeScrollEvent): boolean {
  return contentOffset.y < -constraint.scrollOffset
}

export function ableToMoveNext({
  contentOffset,
  layoutMeasurement,
  contentSize
}: NativeScrollEvent): boolean {
  return (
    layoutMeasurement.height + contentOffset.y >
    contentSize.height + constraint.scrollOffset
  )
}

export function responseToNovelData(json: any): NovelData {
  return {
    ncode: json.ncode.toLowerCase(),
    title: json.title,
    userid: json.userid,
    writer: json.writer,
    isEnd: json.end === 0,
    isShort: json.novel_type === 2,
    isStop: json.isstop === 1,
    abstract: json.story,
    genre: narou.genre[json.genre],
    keywords: json.keyword.split(' '),
    publishedAt: json.general_firstup,
    lastPostedAt: json.general_lastup,
    lastUpdatedAt: json.novelupdated_at,
    time: json.time,
    episodes: json.general_all_no
  }
}

export async function scrapeIndexPage(url: string): Promise<Index> {
  const response = await fetch(url)
  const html = await response.text()
  const scrape = cheerio.load(html)
  const chapters = scrape('.chapter_title')
    .map((_, parentNode) => ({
      chapter: scrape(parentNode).text(),
      episodes: scrape(parentNode)
        .nextUntil('.chapter_title')
        .children('.subtitle')
        .map((__, childNode) => ({
          subtitle: scrape(childNode)
            .children()
            .text(),
          page: Number(
            scrape(childNode)
              .children()
              .attr('href')
              .split('/')[2]
          )
        }))
        .get()
    }))
    .get()
  if (chapters.length === 0) {
    chapters.push({
      chapter: '',
      episodes: scrape('.subtitle')
        .map((index, childNode) => ({
          subtitle: scrape(childNode)
            .children()
            .text(),
          page: index + 1
        }))
        .get()
    })
  }

  return { chapters }
}

export async function scrapeNovelContents(url: string): Promise<Content> {
  const response = await fetch(url)
  const html = await response.text()
  const scrape = cheerio.load(html)
  const subtitle = scrape('.novel_subtitle')
    .first()
    .text()
  const body = scrape('#novel_honbun').text()
  const foreword = scrape('#novel_p').text()
  const afterword = scrape('#novel_a').text()
  const images = scrape('img')
    .map((_, e) => scrape(e).attr('src'))
    .get()
    .filter((_, index) => index > 1)
    .map(imageUrl => `https:${imageUrl}`)

  return { subtitle, body, foreword, afterword, images }
}
