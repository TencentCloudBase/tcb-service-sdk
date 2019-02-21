const config = require('./config')
const {
  AppID,
  AppKey,
} = config
const TcbService = require('tcb-service-sdk')
const tcbService = new TcbService({ SecretID: AppID, SecretKey: AppKey })

// 云函数入口函数
exports.main = async (event, context) => {
  let {
    nationCode = '86',
    phoneNumber,
    beginTime,
    endTime,
    maxNum
  } = event

  try {
    let result = await tcbService.callService({
      service: 'sms',
      action: 'SmsMobileStatusPullCallback',
      data: {
        nationCode,
        phoneNumber,
        beginTime,
        endTime,
        maxNum
      }
    })

    return result
  }
  catch (e) {
    response.code = e.code || 10002
    response.message = e.message
  }

}