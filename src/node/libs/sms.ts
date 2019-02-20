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
            let result = await smsClient.init({
                action: this.action,
                data: this.data
            });
            let data = JSON.parse(result);

            return {
                code: 0,
                message: 'success',
                data,
            };
        }
        catch (e) {
            return {
                code: e.code,
                message: e.message
            };
        }
    }
}