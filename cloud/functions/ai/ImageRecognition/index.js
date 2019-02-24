const config = require('./config')
const {
  SecretID,
  SecretKey,
} = config
const TcbService = require('tcb-service-sdk')
const tcbService = new TcbService()

exports.main = async (event) => {
  const {
    IdCard,
    Name,
    FileID
  } = event

  try {
    let fileContent = await tcbService.utils.getContent({
      fileID: FileID
    })

    if (!fileContent) {
      return { code: 10002, message: 'fileContent is empty' }
    }

    const result = await tcbService.callService({
      service: 'ai',
      action: 'ImageRecognition',
      data: {
        IdCard,
        Name,
        ImageBase64: fileContent.toString('base64'),
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