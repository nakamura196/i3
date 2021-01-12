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

## IIIF Curation Map Search

IIIFキュレーションリストに対して、IIIF Content Search APIライクな機能を提供します。

https://purl.org/dhn/i3/map/

ex. [江戸マップ・御江戸大名小路絵図（CODH編集）](https://purl.org/dhn/i3/map/?curation=http://codh.rois.ac.jp/edo-maps/owariya/01/1849/ndl.json)

* 2021-01-13
  * マーカー形式のIIIFキュレーションリストの表示方式を更新
  
## Infinite Loading for IIIF Collection

https://purl.org/dhn/i3/collection/

ex. [捃拾帖](https://purl.org/dhn/i3/collection/?u=https://archdataset.dl.itc.u-tokyo.ac.jp/collections/tanaka/image/collection.json&random=true)
  
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
