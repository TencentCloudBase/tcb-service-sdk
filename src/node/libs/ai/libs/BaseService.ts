import config from './config';

const tencentcloud = require('tencentcloud-sdk-nodejs');
const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

export default class BaseService {

    protected SecretID: string;
    protected SecretKey: string;
    protected Proxy: string;

    constructor({ SecretID = null, SecretKey = null } = {}) {
        let {
            SECRETID,
            SECRETKEY,
            TENCENTCLOUD_SECRETID,
            TENCENTCLOUD_SECRETKEY
        } = process.env;

        this.SecretID = SecretID || TENCENTCLOUD_SECRETID || SECRETID;
        this.SecretKey = SecretKey || TENCENTCLOUD_SECRETKEY || SECRETKEY;
    }

    setProxy(proxy) {
        this.Proxy = proxy || null;
        // process.env.https_proxy = proxy;
        // process.env.http_proxy = proxy;
        return this;
    }

    init({ action = '', data = {}, options = {}}) {

        if (!action) {
            throw new Error('action should not be empty.');
        }

        if (!this[action]) {
            throw new Error('action cannot be found.');
        }

        return this[action](data, options);
    }

    request({ service, action, version, data, options, endpoint = null }) {
        const Client = tencentcloud[service][version].Client;
        const Models = tencentcloud[service][version].Models;
        let cred = new Credential(this.SecretID, this.SecretKey);
        let httpProfile = new HttpProfile();
        httpProfile.endpoint = endpoint || config.services[service].url;
        let clientProfile = new ClientProfile();
        clientProfile.httpProfile = httpProfile;
        let client = new Client(cred, options.region || 'ap-shanghai', clientProfile);

        let req = new Models[`${action}Request`]();

        let reqParams = JSON.stringify({
            ...data
        });

        req.from_json_string(reqParams);

        return new Promise((resolve, reject) => {
            client[action](req, function(errMsg, response) {

                if (errMsg) {
                    reject(errMsg);
                    return;
                }

                resolve(response.to_json_string());
            });
        });
    }

    // 人脸融合
    FaceFusion(data = {}, options = {}) {
        return this.request({
            service: 'facefusion',
            action: 'FaceFusion',
            version: 'v20181201',
            data,
            options,
        });
    }

    // // 实名核身鉴权
    // DetectAuth(data = {}, options = {}) {
    //     return this.request({
    //         service: 'faceid',
    //         action: 'DetectAuth',
    //         version: 'v20180301',
    //         data,
    //         options,
    //     });
    // }

    // 获取动作顺序
    GetActionSequence(data = {}, options = {}) {
        return this.request({
            service: 'faceid',
            action: 'GetActionSequence',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 获取数字验证码
    GetLiveCode(data = {}, options = {}) {
        return this.request({
            service: 'faceid',
            action: 'GetLiveCode',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 身份信息认证
    IdCardVerification(data = {}, options = {}) {
        return this.request({
            service: 'faceid',
            action: 'IdCardVerification',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 照片人脸核身
    ImageRecognition(data = {}, options = {}) {
        return this.request({
            service: 'faceid',
            action: 'ImageRecognition',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 活体人脸比对
    LivenessCompare(data = {}, options = {}) {
        return this.request({
            service: 'faceid',
            action: 'LivenessCompare',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 活体人脸核身
    LivenessRecognition(data = {}, options = {}) {
        return this.request({
            service: 'faceid',
            action: 'LivenessRecognition',
            version: 'v20180301',
            data,
            options,
        });
    }

    // // 获取实名核身结果信息
    // GetDetectInfo(data = {}, options = {}) {
    //     return this.request({
    //         service: 'faceid',
    //         action: 'GetDetectInfo',
    //         version: 'v20180301',
    //         data,
    //         options,
    //     });
    // }

    // 人脸检测与分析
    DetectFace(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'DetectFace',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 五官定位
    AnalyzeFace(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'AnalyzeFace',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 人脸对比
    CompareFace(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'CompareFace',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 创建人员库
    CreateGroup(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'CreateGroup',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 删除人员库
    DeleteGroup(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'DeleteGroup',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 获取人员列表
    GetGroupList(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'GetGroupList',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 修改人员库
    ModifyGroup(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'ModifyGroup',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 创建人员
    CreatePerson(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'CreatePerson',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 删除人员
    DeletePerson(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'DeletePerson',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 人员库删除人员
    DeletePersonFromGroup(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'DeletePersonFromGroup',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 获取人员列表
    GetPersonList(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'GetPersonList',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 获取人员列表长度
    GetPersonListNum(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'GetPersonListNum',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 获取人员基础信息
    GetPersonBaseInfo(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'GetPersonBaseInfo',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 获取人员归属信息
    GetPersonGroupInfo(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'GetPersonGroupInfo',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 修改人员基础信息
    ModifyPersonBaseInfo(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'ModifyPersonBaseInfo',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 修改人员描述信息
    ModifyPersonGroupInfo(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'ModifyPersonGroupInfo',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 增加人脸
    CreateFace(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'CreateFace',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 删除人脸
    DeleteFace(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'DeleteFace',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 复制人员
    CopyPerson(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'CopyPerson',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 人脸搜索
    SearchFaces(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'SearchFaces',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 人脸验证
    VerifyFace(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'VerifyFace',
            version: 'v20180301',
            data,
            options,
        });
    }

    // 人脸静态活体检测
    DetectLiveFace(data = {}, options = {}) {
        return this.request({
            service: 'iai',
            action: 'DetectLiveFace',
            version: 'v20180301',
            data,
            options,
        });
    }
}
