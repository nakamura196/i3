# Tools related IIIF

## This repository
* IIIF Converter between annotation and curation
  * https://purl.org/dhn/i3/conv
* Images from IIIF Collection
  * https://purl.org/dhn/i3/collection/
  * ex. [捃拾帖](https://purl.org/dhn/i3/collection/?u=https://archdataset.dl.itc.u-tokyo.ac.jp/collections/tanaka/image/collection.json&random=true)
* IIIF Annotation Library
  * https://purl.org/dhn/i3/al

## IIIF Converter between annotation and curation

### 更新履歴

* 2021-01-11
  * IIIFコレクション対応を追加
  * http接続対応を追加
  * 以下のようにIIIFマニフェスト（コレクション）の変換方式を更新
    * 1つ以上のカンバスからotherContentが取得できた場合には、それらに含まれるアノテーション情報のみから構成されるIIIFキュレーションリストに変換します。otherContentが1つも取得できなかった場合には、すべてのカンバス情報をIIIFキュレーションリストに変換します。
    * IIIFコレクションの場合、各マニフェストの第1カンバスの情報のみから構成されるIIIFキュレーションリストに変換します。
  * マーカー形式のIIIFキュレーションリストの変換方式を更新
  
## Other repository
* パズル Powered by Puzzles! Powered by IIIF
  * https://purl.org/dhn/jpsearch/puzzle
* Text Conversion to Kuzushiji
  * https://purl.org/dhn/jpsearch/kuzushiji
* Search Interface for IIIF Collection and Curation
  * https://nakamura196.github.io/icc2/
  
## Workshops
* 2018_11_15_16_NCC_Digital_Scholarship_Workshop
  * https://purl.org/dhn/i3/materials/2018_11_15_16_NCC_Digital_Scholarship_Workshop
