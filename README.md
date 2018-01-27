<h1 align="center">narosirase</h1>

<h5 align="center">Reader application of Syosetuka ni Narou</h5>

<p align="center">
   <a href="https://github.com/prettier/prettier/">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
</p>

## Task

* Reader 画面での Index へのジャンプ
* Reader 画面での設定変更 Modal
* Addition 画面での戻る進むジェスチャーのスタート位置の判定場所と距離
* 小説の追加の排他制御(連続タップの throttling)
* navigation の排他制御(2 重遷移)
* 挿絵表示 Component
* 短編のときの Reader 制御
* スクロール位置保存
* エラーハンドリングの切り出しとアラートの色 type 実装
* アラート実装できてない箇所の実装
* 目次ページの最初の方に「読み始める」でエピソード 1 に飛ぶ実装
* scraping 箇所で情報量の多いページを非同期に読み込まないと

## Bug

* エクスポートで「Dropbox に保存」を押した後にキャンセルした場合に`sharedAction`な action が呼ばれている
  * Dropbox 側のバグではないか?
