# i3 — Tools related IIIF

[IIIF Presentation API](https://iiif.io/api/presentation/3.0/) と
[Curation API 1.0 for IIIF](http://codh.rois.ac.jp/iiif/curation/) をつなぐ小さなツール群です。

第14回CODHセミナー「[IIIF Curation Platform利活用レシピ100連発](https://codh.rois.ac.jp/seminar/icp-recipe-20210218/)」
（2021-02-18）の講演「IIIF Curation Platformを用いたデジタルアーカイブの活用」
（[doi:10.20676/00000389](https://doi.org/10.20676/00000389)）で紹介したツールの再実装です。

> [!NOTE]
> いずれも簡易なツールです。不具合等もあり得るため参考程度にご利用ください。

## 収録ツール

| ツール | 用途 |
|---|---|
| [IIIF Converter](#iiif-converter) | マニフェストとキュレーションリストの相互変換 |
| [IIIF Curation Comparison](#iiif-curation-comparison) | 切り出し画像を並べて比較 |
| [IIIF Curation Map Search](#iiif-curation-map-search) | 大きな一枚画像の大量アノテーションを表示・検索 |

## 旧版からの変更点

- **IIIF Presentation API v2 / v3 の両方に対応しました。** 旧版は v2 のみでした。
  入力は [`@iiif/parser`](https://github.com/iiif-commons/parser) の `convertPresentation2` で
  内部的に v3 へ正規化してから処理します。出力のキュレーションリストは、
  Curation API 1.0 が Presentation API 2.1 の拡張であるため P2 形式のまま生成し、
  IIIF Curation Viewer など ICP のツール群との互換性を保ちます。
- **変換を API として公開しました。** 変換はステートレスなので、
  API の URL 自体が変換結果の永続的な URI になります。
- 静的サイトから Next.js（SSR）に移行し、UI と API を単一リポジトリにまとめました。

---

## IIIF Converter

IIIF マニフェストとキュレーションリストの相互変換ツールです。
両者が大部分で相互変換可能であるという関係性を確かめるための検証ツールという位置づけです。

- **Manifest → Curation** … `/conv/convert2curation`
  アノテーション付きマニフェストを、切り出し領域を持つキュレーションリストに変換します。
  矩形領域（`#xywh=`）を持つアノテーションのみが対象です。
- **Curation → Manifest** … `/conv/convert2manifest`
  キュレーションリストを、出典マニフェストの一覧からなる IIIF コレクションに変換します。

`?u=` に対象の URI を与えると自動実行します。

```
/conv/convert2curation?u=https%3A%2F%2Fnakamura196.github.io%2Fportal_pro%2Fusage%2Fagriculture%2Fmanifest.json
/conv/convert2manifest?u=https%3A%2F%2Fmp.ex.nii.ac.jp%2Fapi%2Fcuration%2Fjson%2F388b085f-772e-472d-8866-9951747c6719
```

例として『百鬼夜行図』のキュレーションを読み込むと、
東京大学総合図書館・国文学研究資料館・国立国会図書館の 3 マニフェストから構成される
IIIF コレクションに変換されることが確認できます。

## IIIF Curation Comparison

キュレーションリストを読み込み、切り出した画像を並べて比較します（`/icc`）。
複数機関が公開する資料から同種の図像を比べる用途に向きます。

一覧から領域を選ぶと、選択したものだけが上部に並びます。
画像は IIIF Image API の領域リクエスト（`/{x},{y},{w},{h}/{size}/0/default.jpg`）で切り出します。

## IIIF Curation Map Search

大きな一枚画像（例: 地図）に付与された大量のアノテーションを表示・検索します（`/map`）。
ラベルとメタデータを対象に絞り込み、項目をクリックすると該当箇所を拡大表示します。

東洋文庫『大明地理之図』のように、地名アノテーションを大量に持つ資料を想定しています。

---

## API

変換はステートレスです。**API の URL 自体が変換結果の永続的な URI**になるため、
セルフミュージアムや IIIF Curation Viewer にそのまま渡せます。

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/api/curation?u=<IIIF Manifest URI>` | マニフェスト → キュレーションリスト（`cr:Curation`） |
| GET | `/api/collection?u=<IIIF Curation URI>` | キュレーションリスト → IIIF コレクション（`sc:Collection`） |
| GET | `/api/fetch?u=<URI>` | CORS ヘッダを返さないサーバ向けの中継（JSON のみ） |

いずれも `Access-Control-Allow-Origin: *` を返します。

```bash
curl 'https://<deployment>/api/curation?u=https%3A%2F%2Fnakamura196.github.io%2Fportal_pro%2Fusage%2Fagriculture%2Fmanifest.json'
```

`/api/fetch` は SSRF 対策として、ループバック・プライベート・リンクローカル・CGNAT
宛ての要求を遮断し、応答は JSON・8MB までに制限しています。
CORS が通るサーバには不要なので、画面側はまず直接取得を試み、失敗時のみ中継に回します。

## 開発

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
npm run lint
```

主要なファイルは次のとおりです。

```
src/lib/i3.ts      変換コア（Curation ⇄ Manifest）
src/lib/iiif.ts    Presentation API v2/v3 の吸収、Image API の解決
src/app/api/       Route Handler（Edge Runtime）
```

Next.js 16 / React 19 / next-intl（日本語・英語）/ next-themes（ライト・ダーク）。
[nextjs-i18n-themes-ssr-template](https://github.com/nakamura196/nextjs-i18n-themes-ssr-template) をベースにしています。

## 関連

- [IIIF Curation Platform (ICP)](https://codh.rois.ac.jp/icp/) — ROIS-DS 人文学オープンデータ共同利用センター (CODH)
- [Curation API 1.0 for IIIF](http://codh.rois.ac.jp/iiif/curation/)
- [nakamura196/icc2](https://github.com/nakamura196/icc2) — IIIF Multi Viewer
- [nakamura196/rp](https://github.com/nakamura196/rp) — Rectangle Packing with IIIF Curation

## ライセンス

MIT
