const config = require('./config')
const {
  SecretID,
  SecretKey,
} = config
const TcbService = require('tcb-service-sdk')
const tcbService = new TcbService()

exports.main = async (event) => {
  const {
    FileID,
    Url,
  } = event

  try {
    let fileContent = await tcbService.utils.getContent({
      fileID: FileID,
      url: Url
    })

    if (!fileContent) {
      return { code: 10002, message: 'fileContent is empty' }
    }

    const result = await tcbService.callService({
      service: 'ai',
      action: 'DetectLiveFace',
      data: {
        Image: fileContent.toString('base64'),
        Url,
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