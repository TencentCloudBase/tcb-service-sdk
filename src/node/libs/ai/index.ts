const ImageClient = require('./libs/BaseService');
import Base from '../base';
import {
    ReturnValue
} from '../../../common/interface';

export default class AI extends Base {
    public async init(): Promise<ReturnValue> {
        let {
            SecretID,
            SecretKey
        } = this.options;
    
        try {
            let imgClient = new ImageClient({ SecretID, SecretKey });
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