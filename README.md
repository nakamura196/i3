# i3 — Tools related IIIF（サービス終了）

> [!IMPORTANT]
> **i3 はサービスを終了しました。後継は [Kasane](https://kasane.ldas.jp) です。**
> https://i3-mu.vercel.app の古い URL は、Kasane の同じ働きの画面へ転送されます。

[IIIF Presentation API](https://iiif.io/api/presentation/3.0/) と
[Curation API 1.0 for IIIF](http://codh.rois.ac.jp/iiif/curation/) をつなぐ小さなツール群でした。
第14回CODHセミナー「[IIIF Curation Platform利活用レシピ100連発](https://codh.rois.ac.jp/seminar/icp-recipe-20210218/)」
（2021-02-18）の講演「IIIF Curation Platformを用いたデジタルアーカイブの活用」
（[doi:10.20676/00000389](https://doi.org/10.20676/00000389)）で紹介したツールの再実装です。

## 転送先

`?u=` に渡していた URL は、そのまま Kasane に引き継がれます。

| i3 の画面 | 転送先（Kasane） |
|---|---|
| IIIF Converter: Curation → Manifest（`/conv/convert2manifest?u=`） | ビューア（`/viewer/?curation=`）。キュレーションの順に領域を見て回れます |
| IIIF Converter: Manifest → Curation（`/conv/convert2curation?u=`） | ビューア（`/viewer/?manifest=`）。変換は行いません |
| IIIF Curation Comparison（`/icc?u=`） | 比較画面（`/compare/?curation=`） |
| IIIF Curation Map Search（`/map?u=`） | ビューア（`/viewer/?curation=`）。注釈の絞り込みで検索できます |
| 上記以外 | Kasane のトップ |

変換 API（`/api/curation`、`/api/collection`、`/api/fetch`）は廃止しました。HTTP 410 を返します。

## 旧版のコード

ツールのコードは、このリポジトリの履歴に残っています（最終版は [`2d903cd`](https://github.com/nakamura196/i3/tree/2d903cd)）。
