import ImageClient from './libs/BaseService';
import Base from '../base';
import {
    ReturnValue
} from '../../../common/interface';

export default class AI extends Base {
    public async init(): Promise<ReturnValue> {
        try {
            let imgClient = new ImageClient({ SecretID: this.secretID, SecretKey: this.secretKey });
            let result = await imgClient.init({
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