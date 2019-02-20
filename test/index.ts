import {
    AppID,
    AppKey,
    phoneNumber
} from './config';
import TcbService from '../src/node/index';
const tcbService = new TcbService({ SecretID: AppID, SecretKey: AppKey });


describe.skip('语音短信', () => {
    it('CodeVoiceSend', async () => {
        try {
            let result = await tcbService.callService({
                service: 'sms',
                action: 'CodeVoiceSend',
                data: {
                    nationCode: '86',
                    phoneNumber,
                    msg: '4567',
                }
            });

            console.log(result);
        }
        catch (e) {
            console.log('err');
            console.log(e.code, e.message);
        }
    });
});

describe('普通短信', () => {
    it('SmsSingleSend', async () => {
        try {
            let result = await tcbService.callService({
                service: 'sms',
                action: 'SmsSingleSend',
                data: {
                    msgType: 0,
                    nationCode: '86',
                    phoneNumber,
                    msg: '上小程序就用云开发，欢迎 babe 使用云开发实现小程序！',
                }
            });
            
            console.log(result);
        }
        catch (e) {
            console.log('err');
            console.log(e.code, e.message);
        }
    });
});