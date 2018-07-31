# README

## Task

- `narou#jenre`の型定義解決
- `hydrateNovel(json)`で json の型チェックをしたい
- `setting/index.tsx`とかで action の Props を export して子 Component からはその PartialType を継承させるとか
- NovelChapter とかそのあたりの名前が衝突するので NovelChapterType 等の名前を検討
- Reader の mapStateToProps での find が undefind になる可能性がある
  - 現在はキャストして型エラーを潰しているが、もしかしたら undefind をケアしてかつ、constructor で pop するなどの対応が必要になるかもしれない
- 現状の TSLint+Prettier で Lottie 用の json がへんなエラー吐くため tslint 側で exclude してる
  - prettier じゃないっぽい(?)
