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
    private sessionToken: string;
    private smsAppID: string;
    private smsAppKey: string;

    constructor({ secretID = null, secretKey = null, sessionToken=null, smsAppID = null, smsAppKey = null, env = null } = {}) {
        this.cloud = cloud;
        this.env = env;

        if (secretID){
            this.secretID = secretID;
            this.secretKey = secretKey;
            this.sessionToken = sessionToken;
        } else {
            this.secretID = process.env.TENCENTCLOUD_SECRETID;
            this.secretKey = process.env.TENCENTCLOUD_SECRETKEY;
            this.sessionToken = process.env.TENCENTCLOUD_SESSIONTOKEN;
        }

        this.smsAppID = smsAppID;
        this.smsAppKey = smsAppKey;

        this.cloud.init({
            secretId: this.secretID,
            secretKey: this.secretKey,
            env
        });

        this.utils = new Utils(this);
    }

    public callService({ service, version = 'v1.0.0', action, data = {}, options = {}}: Options): Promise<ReturnValue> {
        switch (service) {
            case 'ai': {
                const ai = new AI(this, version, action, data, options);
                return ai.init();
            }
            // case 'video': {
            //     const video = new Video(this.cloud, action, data);
            //     return video.init();
            // }
            case 'sms': {
                const sms = new SMS(this, version, action, data, options);
                return sms.init();
            }
        }
    }
}