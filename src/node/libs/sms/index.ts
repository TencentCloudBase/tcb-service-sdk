const SmsClient = require('./libs/BaseService');
import Base from '../base';
import {
    ReturnValue
} from '../../../common/interface';

export default class SMS extends Base {
    public async init(): Promise<ReturnValue> {
        let {
            smsAppID,
            smsAppKey
        } = this.tcbService;

        try {
            let smsClient = new SmsClient({ AppID: smsAppID, AppKey: smsAppKey });
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