import axios from 'axios'

// /plugins/logger.ts
export class Utils {
  async getData(uri: string) {
    if (!uri) {
      return null
    }
    if (uri.includes('http://')) {
      uri = process.env.C_URL + uri
    }
    const result = await axios
      .get(uri)
      .then((response) => {
        return response.data
      })
      .catch(() => {
        return null
      })
    return result
  }
}

export default (_: any, inject: any) => {
  inject('utils', new Utils())
}
