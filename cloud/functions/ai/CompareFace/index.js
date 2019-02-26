const config = require('./config')
const {
  SecretID,
  SecretKey,
} = config
const TcbService = require('tcb-service-sdk')
const tcbService = new TcbService()

exports.main = async (event) => {
  const {
    FileIDA,
    FileIDB,
    UrlA,
    UrlB,
  } = event

  try {
    let personA = await tcbService.utils.getContent({
      fileID: FileIDA,
      url: UrlA
    })

    let personB = await tcbService.utils.getContent({
      fileID: FileIDB,
      url: UrlB
    })

    if (!personA || !personB) {
      return { code: 10002, message: 'image content is empty' }
    }

    const result = await tcbService.callService({
      service: 'ai',
      action: 'CompareFace',
      data: {
        ImageA: personA.toString('base64'),
        ImageB: personB.toString('base64'),
      },
      options: {
        secretID: SecretID,
        secretKey: SecretKey
      }
    })

    return result
  }
  catch (e) {
    return { code: 10001, message: e.message }
  }
}