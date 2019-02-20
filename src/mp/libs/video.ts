import Base from './base';
import {
    ReturnValue
} from '../../common/interface';

export default class Video extends Base {
    public async init(): Promise<ReturnValue> {
        let { result } = await this.cloud.callFunction({
            name: this.action,
            data: this.data
        });
        return result;
    }
}