/**
 * i3 の Web API を記述した OpenAPI 3.1 仕様。
 *
 * /api/openapi で配信し、/api-docs の Swagger UI がこれを読み込む。
 * 仕様をコード側に置くことで、エンドポイントを増やしたときに
 * 実装とドキュメントが同じ PR で更新される。
 */
import { SITE_URL } from '@/constants/metadata';

const EX_MANIFEST = 'https://nakamura196.github.io/portal_pro/usage/agriculture/manifest.json';
const EX_CURATION = 'https://mp.ex.nii.ac.jp/api/curation/json/388b085f-772e-472d-8866-9951747c6719';

export function buildOpenApiDocument(origin: string = SITE_URL) {
  return {
    openapi: '3.1.0',
    info: {
      title: 'i3 — Tools related IIIF API',
      version: '1.0.0',
      summary: 'IIIF Presentation API と Curation API 1.0 for IIIF の相互変換 API',
      description: [
        'IIIF マニフェストと Curation API 1.0 for IIIF のキュレーションリストを相互変換します。',
        '',
        '## 入力の IIIF バージョン',
        '',
        '**Presentation API v2 / v3 のどちらでも受け付けます。**',
        '内部では [`@iiif/parser`](https://github.com/iiif-commons/parser) の',
        '`convertPresentation2` で v3 に正規化してから領域を抽出します。',
        '',
        '出力のキュレーションリストは、Curation API 1.0 が Presentation API 2.1 の',
        '拡張であるため **P2 形式のまま**生成します（IIIF Curation Viewer など',
        'ICP のツール群との互換性を保つため）。',
        '',
        '## 永続 URI として使えます',
        '',
        '変換はステートレスです。同じ `u` に対しては常に同じ結果を返すため、',
        '**この API の URL 自体が変換結果の永続的な URI** になります。',
        'セルフミュージアムや IIIF Curation Viewer にそのまま渡せます。',
        '',
        'すべてのエンドポイントが `Access-Control-Allow-Origin: *` を返します。',
      ].join('\n'),
      license: { name: 'MIT', identifier: 'MIT' },
      contact: { name: 'nakamura196/i3', url: 'https://github.com/nakamura196/i3' },
    },
    servers: [{ url: origin, description: '本番' }],
    tags: [
      { name: 'convert', description: 'IIIF リソースの相互変換' },
      { name: 'util', description: '補助的なエンドポイント' },
    ],
    paths: {
      '/api/curation': {
        get: {
          tags: ['convert'],
          operationId: 'manifestToCuration',
          summary: 'マニフェスト → キュレーションリスト',
          description: [
            'アノテーション付きの IIIF マニフェストを、切り出し領域を持つ',
            'キュレーションリスト（`cr:Curation`）に変換します。',
            '',
            '矩形領域（`#xywh=`）を持つアノテーションのみが対象です。',
            '領域指定のないアノテーションは黙って除外されます。',
            '',
            '外部の AnnotationPage / AnnotationList（`otherContent` や',
            '`annotations` からの参照）は取得して解決します。',
          ].join('\n'),
          parameters: [
            {
              name: 'u',
              in: 'query',
              required: true,
              schema: { type: 'string', format: 'uri' },
              description: 'IIIF マニフェストの URI（v2 / v3 いずれも可）',
              example: EX_MANIFEST,
            },
          ],
          responses: {
            '200': {
              description: 'キュレーションリスト',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Curation' },
                },
              },
            },
            '400': { $ref: '#/components/responses/BadRequest' },
            '502': { $ref: '#/components/responses/UpstreamError' },
          },
        },
      },
      '/api/collection': {
        get: {
          tags: ['convert'],
          operationId: 'curationToCollection',
          summary: 'キュレーションリスト → IIIF コレクション',
          description: [
            'キュレーションリストを、出典マニフェスト（`selections[].within`）の',
            '一覧からなる IIIF コレクション（`sc:Collection`）に変換します。',
            '',
            '例として『百鬼夜行図』のキュレーションを渡すと、東京大学総合図書館・',
            '国文学研究資料館・国立国会図書館の 3 マニフェストに展開されます。',
          ].join('\n'),
          parameters: [
            {
              name: 'u',
              in: 'query',
              required: true,
              schema: { type: 'string', format: 'uri' },
              description: 'キュレーションリストの URI',
              example: EX_CURATION,
            },
          ],
          responses: {
            '200': {
              description: 'IIIF コレクション',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Collection' },
                },
              },
            },
            '400': { $ref: '#/components/responses/BadRequest' },
            '502': { $ref: '#/components/responses/UpstreamError' },
          },
        },
      },
      '/api/fetch': {
        get: {
          tags: ['util'],
          operationId: 'fetchJson',
          summary: 'CORS 中継（JSON のみ）',
          description: [
            'CORS ヘッダを返さない IIIF サーバのリソースを、ブラウザから',
            '読めるようにするための中継です。',
            '',
            'CORS が通るサーバには不要なので、画面側はまず直接取得を試み、',
            '失敗したときだけこの経路にフォールバックします。',
            '',
            '**SSRF 対策**として、ループバック・プライベート・リンクローカル・',
            'CGNAT 宛ての要求を遮断し、`http(s)` 以外を拒否、応答は JSON・',
            '8MB までに制限しています。',
          ].join('\n'),
          parameters: [
            {
              name: 'u',
              in: 'query',
              required: true,
              schema: { type: 'string', format: 'uri' },
              description: '取得先の URI（http / https のみ）',
              example: EX_CURATION,
            },
          ],
          responses: {
            '200': {
              description: '取得した JSON をそのまま返す',
              content: { 'application/json': { schema: { type: 'object' } } },
            },
            '400': { $ref: '#/components/responses/BadRequest' },
            '403': {
              description: '内部ネットワーク宛てのため遮断',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: { error: '内部ネットワーク宛ての中継は許可されていません。' },
                },
              },
            },
            '502': { $ref: '#/components/responses/UpstreamError' },
          },
        },
      },
      '/api/openapi': {
        get: {
          tags: ['util'],
          operationId: 'getOpenApi',
          summary: 'この OpenAPI 仕様そのもの',
          responses: {
            '200': {
              description: 'OpenAPI 3.1 ドキュメント',
              content: { 'application/json': { schema: { type: 'object' } } },
            },
          },
        },
      },
    },
    components: {
      responses: {
        BadRequest: {
          description: 'クエリパラメータが不正',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
              example: { error: 'u は http(s) の絶対 URI である必要があります。' },
            },
          },
        },
        UpstreamError: {
          description: '取得先の IIIF リソースを解決できなかった',
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/Error' } },
          },
        },
      },
      schemas: {
        Error: {
          type: 'object',
          required: ['error'],
          properties: { error: { type: 'string', description: '日本語のエラーメッセージ' } },
        },
        Curation: {
          type: 'object',
          description: 'Curation API 1.0 for IIIF のキュレーションリスト',
          required: ['@context', '@type', '@id', 'label', 'selections'],
          properties: {
            '@context': {
              type: 'array',
              items: { type: 'string' },
              example: [
                'http://iiif.io/api/presentation/2/context.json',
                'http://codh.rois.ac.jp/iiif/curation/1/context.json',
              ],
            },
            '@type': { type: 'string', const: 'cr:Curation' },
            '@id': { type: 'string', format: 'uri' },
            label: { type: 'string' },
            selections: {
              type: 'array',
              items: { $ref: '#/components/schemas/Range' },
            },
          },
        },
        Range: {
          type: 'object',
          required: ['@id', '@type', 'members', 'within'],
          properties: {
            '@id': { type: 'string', format: 'uri' },
            '@type': { type: 'string', const: 'sc:Range' },
            label: { type: 'string' },
            members: { type: 'array', items: { $ref: '#/components/schemas/Member' } },
            within: {
              type: 'object',
              description: '出典マニフェスト',
              properties: {
                '@id': { type: 'string', format: 'uri' },
                '@type': { type: 'string', const: 'sc:Manifest' },
                label: { type: 'string' },
              },
            },
          },
        },
        Member: {
          type: 'object',
          description: '切り出し領域。@id は canvas URI に #xywh= が付いた形',
          required: ['@id', '@type'],
          properties: {
            '@id': {
              type: 'string',
              example:
                'https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/187cc82d-11e6-9912-9dd4-b4cca9b10970/canvas/p2#xywh=1136,5824,4928,5856',
            },
            '@type': { type: 'string', const: 'sc:Canvas' },
            label: { type: 'string' },
          },
        },
        Collection: {
          type: 'object',
          description: 'IIIF Presentation API 2.1 のコレクション',
          required: ['@context', '@type', '@id', 'label', 'manifests'],
          properties: {
            '@context': { type: 'string', const: 'http://iiif.io/api/presentation/2/context.json' },
            '@type': { type: 'string', const: 'sc:Collection' },
            '@id': { type: 'string', format: 'uri' },
            label: { type: 'string' },
            manifests: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  '@id': { type: 'string', format: 'uri' },
                  '@type': { type: 'string', const: 'sc:Manifest' },
                  label: { type: 'string' },
                },
              },
            },
            within: {
              type: 'object',
              description: '変換元のキュレーションリスト',
              properties: {
                '@id': { type: 'string', format: 'uri' },
                '@type': { type: 'string', const: 'cr:Curation' },
                label: { type: 'string' },
              },
            },
          },
        },
      },
    },
  };
}
