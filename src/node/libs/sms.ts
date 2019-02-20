import Base from './base';
import {
    ReturnValue
} from '../../common/interface';
const {
    SmsClient
} = require('sms-node-sdk');

export default class SMS extends Base {
    public async init(): Promise<ReturnValue> {
        let {
            SecretID,
            SecretKey
        } = this.options;

        try {
            let smsClient = new SmsClient({ AppID: SecretID, AppKey: SecretKey });
            let data = await smsClient.init({
                action: this.action,
                data: this.data
            });

            let resData = data.resData;

            return {
                code: resData.result,
                message: !resData.result ? 'success' : resData.errmsg,
                data: resData,
            };
        }
        catch (e) {
            return {
                code: e.code || 1000,
                message: e.message
            };
        }
    }
}