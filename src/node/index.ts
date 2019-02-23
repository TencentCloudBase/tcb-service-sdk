import AI from './libs/ai';
// import Video from './libs/video';
import SMS from './libs/sms';
import Utils from './libs/utils';
import {
    Options,
    ReturnValue
} from '../common/interface';
const cloud = require('tcb-admin-node');

export default class TcbService {

    public utils: any;

    private cloud: any;
    private env: string;
    private secretID: string;
    private secretKey: string;
    private smsAppID: string;
    private smsAppKey: string;

    constructor({ secretID = null, secretKey = null, smsAppID = null, smsAppKey = null, env = '' } = {}) {
        this.cloud = cloud;
        this.env = env;
        this.secretID = secretID || process.env.TENCENTCLOUD_SECRETID;
        this.secretKey = secretKey || process.env.TENCENTCLOUD_SECRETKEY;
        this.smsAppID = smsAppID;
        this.smsAppKey = smsAppKey;
        this.utils = new Utils(this);
    }

    public callService({ service, version = 'v1.0.0', action, data }: Options): Promise<ReturnValue> {
        switch (service) {
            case 'ai': {
                const ai = new AI(this, version, action, data);
                return ai.init();
            }
            // case 'video': {
            //     const video = new Video(this.cloud, action, data);
            //     return video.init();
            // }
            case 'sms': {
                const sms = new SMS(this, version, action, data);
                return sms.init();
            }
        }
    }
}