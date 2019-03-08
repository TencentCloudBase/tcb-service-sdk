const fs = require('fs');
const path = require('path');

let TestConfigPath = path.join(__dirname, './config/');
let AppID = null;
let AppKey = null;
let phoneNumber = null;
let phoneNumbers = null;
let Sign = null;

if (fs.existsSync(path.join(TestConfigPath, './index.js'))) {
    const config = require('./config');
    AppID = config.AppID;
    AppKey = config.AppKey;
    phoneNumber = config.phoneNumber;
    phoneNumbers = config.phoneNumbers;
    Sign = config.Sign;
}
else {
    AppID = process.env.SMS_APPID;
    AppKey = process.env.SMS_APPKEY;
    phoneNumber = process.env.phoneNumber;
    phoneNumbers = process.env.phoneNumbers;
    Sign = process.env.Sign;
}

const TcbService = require('../../dist/tcb-service-node-sdk');
const tcbService = new TcbService({ smsAppID: AppID, smsAppKey: AppKey });

describe('发送普通短信', () => {
    it.only('单发短信', async () => {
        let result = await tcbService.callService({
            service: 'sms',
            action: 'SmsSingleSend',
            data: {
                msgType: 0,
                nationCode: '86',
                phoneNumber,
                msg: '上小程序就用云开发，欢迎 heyli 使用云开发实现小程序！'
            }
        });

        // console.log(result);
        expect(result.data.result).toBe(0);
    }, 1000);

    it('指定模板ID单发短信', async () => {
        let result = await tcbService.callService({
            service: 'sms',
            action: 'SmsSingleSendTemplate',
            data: {
                nationCode: '86',
                phoneNumber,
                templId: 278435,
                params: ['baby'],
                sign: Sign
            }
        });

        // console.log(result);
        expect(result.data.result).toBe(0);
    }, 1000);

    it('群发', async () => {
        let result = await tcbService.callService({
            service: 'sms',
            action: 'SmsMultiSend',
            data: {
                msgType: 0,
                nationCode: '86',
                phoneNumbers,
                msg: '上小程序就用云开发，欢迎 heyli 使用云开发实现小程序！'
            }
        });

        // console.log(result);
        expect(result.data.result).toBe(0);
    }, 1000);

    it('群发 - 指定模板ID单发短信', async () => {
        let result = await tcbService.callService({
            service: 'sms',
            action: 'SmsMultiSendTemplate',
            data: {
                nationCode: '86',
                phoneNumbers,
                templId: 278435,
                params: ['baby'],
                sign: Sign
            }
        });

        // console.log(result);
        expect(result.data.result).toBe(0);
    }, 1000);
});

describe('发送语音消息', async () => {
    it('语音验证', async () => {
        let result = await tcbService.callService({
            service: 'sms',
            action: 'CodeVoiceSend',
            data: {
                nationCode: '86',
                phoneNumber,
                msg: '1234',
                playtimes: 2
            }
        });

        // console.log(result);
        expect(result.data.result).toBe(0);
    }, 1000);

    it('发送语音通知', async () => {
        let result = await tcbService.callService({
            service: 'sms',
            action: 'PromptVoiceSend',
            data: {
                nationCode: '86',
                phoneNumber,
                msg: '你好 {1}，你的云开发套餐已经购买成功!',
                playtimes: 2
            }
        });

        // console.log(result);
        expect(result.data.result).toBe(0);
    }, 1000);

    it('指定模板发送语音通知', async () => {
        let result = await tcbService.callService({
            service: 'sms',
            action: 'TtsVoiceSend',
            data: {
                nationCode: '86',
                phoneNumber,
                templId: '278567',
                params: ['baby']
            }
        });

        // console.log(result);
        expect(result.data.result).toBe(0);
    }, 1000);

    it.only('上传语音文件', async () => {
        let result = await tcbService.callService({
            service: 'sms',
            action: 'VoiceFileUpload',
            data: {
                fileContent: fs.readFileSync(path.join(TestConfigPath, './cloudbase.mp3'))
            }
        });

        // console.log(result);
        expect(result.data.result).toBe(0);
        expect(result.data.fid).not.toBeNull();
    });

    it('按语音文件fid发送语音通知', async () => {
        let result = await tcbService.callService({
            service: 'sms',
            action: 'FileVoiceSend',
            data: {
                nationCode: '86',
                phoneNumber,
                fid: 'f8ed061e8c8042c8e4f92f54a279bbf51d10637b.mp3',
            }
        });

        // console.log(result);
        expect(result.data.result).toBe(0);
    });

});

describe('拉取回执与回复', () => {
    it('拉取短信回执', async () => {
        let result = await tcbService.callService({
            service: 'sms',
            action: 'SmsStatusPullCallback',
            data: {
                maxNum: 10
            }
        });

        // console.log(result);
        expect(result.data.result).toBe(0);
    }, 1000);
    
    it('拉取短信回复', async () => {
        let result = await tcbService.callService({
            service: 'sms',
            action: 'SmsStatusPullReply',
            data: {
                maxNum: 10
            }
        });

        // console.log(result);
        expect(result.data.result).toBe(0);
    }, 1000);

    it('拉取单个手机短信回执', async () => {
        let result = await tcbService.callService({
            service: 'sms',
            action: 'SmsMobileStatusPullCallback',
            data: {
                nationCode: '86',
                phoneNumber,
                beginTime: 1552492800,
                endTime: 1550199571,
                maxNum: 10
            }
        });

        // console.log(result);
        expect(result.data.result).toBe(0);
    }, 1000);

    it('拉取单个手机短信回复', async () => {
        let result = await tcbService.callService({
            service: 'sms',
            action: 'SmsMobileStatusPullReply',
            data: {
                nationCode: '86',
                phoneNumber,
                beginTime: 1552492800,
                endTime: 1550199571,
                maxNum: 10
            }
        });

        // console.log(result);
        expect(result.data.result).toBe(0);
    }, 1000);
});