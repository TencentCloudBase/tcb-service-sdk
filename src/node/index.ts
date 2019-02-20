import AI from './libs/ai';
// import Video from './libs/video';
import SMS from './libs/sms';
import {
    Options,
    ReturnValue
} from '../common/interface';
const cloud = require('tcb-admin-node');

export default class TcbService {
    private cloud: any;
    private SecretID: string;
    private SecretKey: string;

    constructor({ SecretID = null, SecretKey = null }) {
        this.cloud = cloud;
        this.SecretID = process.env.TENCENTCLOUD_SECRETID || SecretID;
        this.SecretKey = process.env.TENCENTCLOUD_SECRETKEY || SecretKey;
    }

    callService({ service, version = 'v1.0.0', action, data }: Options): Promise<ReturnValue> {
        switch (service) {
            case 'ai': {
                const ai = new AI(this.cloud, version, action, data, {
                    SecretID: this.SecretID,
                    SecretKey: this.SecretKey
                });
                return ai.init();
            }
            // case 'video': {
            //     const video = new Video(this.cloud, action, data);
            //     return video.init();
            // }
            case 'sms': {
                const sms = new SMS(this.cloud, action, data, {
                    SecretID: this.SecretID,
                    SecretKey: this.SecretKey
                });
                return sms.init();
            }
        }
    }
}