const config = require('./config')
const {
  SecretID,
  SecretKey,
} = config
const TcbService = require('tcb-service-sdk')
const tcbService = new TcbService()

exports.main = async (event) => {
  const {
    ImageFileID,
    VideoFileID,
    LivenessType = 'SILENT',
    ValidateData
  } = event

  try {
    let videoContent = await tcbService.utils.getContent({
      fileID: VideoFileID
    })

    let imageContent = await tcbService.utils.getContent({
      fileID: ImageFileID
    })

    if (!videoContent || !imageContent) {
      return { code: 10002, message: 'imageContent or videoContent empty' }
    }

    const result = await tcbService.callService({
      service: 'ai',
      action: 'LivenessCompare',
      data: {
        ValidateData,
        LivenessType,
        ImageBase64: imageContent.toString('base64'),
        VideoBase64: videoContent.toString('base64')
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