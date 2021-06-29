# Tools related IIIF

## IIIF Converter

IIIF Converter between annotation and curation

https://purl.org/dhn/i3/conv

### 更新履歴

* 2021-01-11
  * IIIFコレクション対応を追加
  * http接続対応を追加
  * 以下のようにIIIFマニフェスト（コレクション）の変換方式を更新
    * 1つ以上のカンバスからotherContentが取得できた場合には、それらに含まれるアノテーション情報のみから構成されるIIIFキュレーションリストに変換します。otherContentが1つも取得できなかった場合には、すべてのカンバス情報をIIIFキュレーションリストに変換します。
    * IIIFコレクションの場合、各マニフェストの第1カンバスの情報のみから構成されるIIIFキュレーションリストに変換します。
  * マーカー形式のIIIFキュレーションリストの変換方式を更新

## IIIF Curation Content Search

IIIFキュレーションリストに対して、IIIF Content Search APIライクな機能を提供します。

https://purl.org/dhn/i3/map/

ex. [江戸マップ・御江戸大名小路絵図（CODH編集）](https://purl.org/dhn/i3/map/?curation=http://codh.rois.ac.jp/edo-maps/owariya/01/1849/ndl.json)

* 2021-06
  * クエリパラメータを追加
  * ユーザインタフェースを更新
* 2021-01-13
  * マーカー形式のIIIFキュレーションリストの表示方式を更新
  
| パラメータ名 | 内容 | 値の形式 | 補足 |
| ------------- | ------------- | ------------- | ------------- |
| curation | Curation APIに準拠するJSONファイルのURLによる表示対象指定 | URL | 必須
| q | 任意のmetadataのvalueに対して、部分一致検索を行います。 | string | 任意
| q-XXX | metadataのlabel:XXXに対して、部分一致検索を行います。 | string | 任意
| fc-XXX | metadataのlabel:XXXに対して、完全一致検索を行います。 | string | 任意
| label | 一覧に表示するlabelを指定します。カンマ区切りで複数指定します。 | string | 任意

## IIIF Curation Comparison

IIIFキュレーションリストを引数として、Mirador 2で画像を比較する機能を提供します。

https://purl.org/dhn/i3/compare/

ex. [百鬼夜行図](https://purl.org/dhn/i3/compare/?curation=https://purl.org/dhn/i3/compare/data.json&layout=2x2)

| パラメータ名 | 内容 | 値の形式 | 補足 |
| ------------- | ------------- | ------------- | ------------- |
| curation | Curation APIに準拠するJSONファイルのURLによる表示対象指定 | URL | 必須
| layout  | Miradorのウインドウズの分割レイアウト | [0-9]+x[0-9]+ | 任意
  
## Infinite Loading for IIIF Collection

https://purl.org/dhn/i3/collection/

ex. [捃拾帖](https://purl.org/dhn/i3/collection/?u=https://archdataset.dl.itc.u-tokyo.ac.jp/collections/tanaka/image/collection.json&random=true)

| パラメータ名 | 内容 | 値の形式 | 補足 |
| ------------- | ------------- | ------------- | ------------- |
| u | IIIF Presenation APIに準拠するIIIFコレクションのJSONファイルのURL | URL | 必須
  
## IIIF Annotation Library

https://purl.org/dhn/i3/al
  
## Other repository
* パズル Powered by Puzzles! Powered by IIIF
  * https://purl.org/dhn/jpsearch/puzzle
* Search Interface for IIIF Collection and Curation
  * https://nakamura196.github.io/icc2/
  
## Workshops
* 2018_11_15_16_NCC_Digital_Scholarship_Workshop
  * https://purl.org/dhn/i3/materials/2018_11_15_16_NCC_Digital_Scholarship_Workshop
  
  
## Developer
* [Satoru Nakamura](https://researchmap.jp/nakamura.satoru?lang=en)
* [Kiyonori Nagasaki](https://researchmap.jp/knagasaki?lang=en)
