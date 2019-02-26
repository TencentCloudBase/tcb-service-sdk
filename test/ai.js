const fs = require('fs');

let IdCard = null;
let Name = null;

if (process.env.TRAVIS) {
    IdCard = process.env.IdCard;
    Name = process.env.Name;
}
else {
    let config = require('./config');
    process.env.TENCENTCLOUD_SECRETID = config.SecretID;
    process.env.TENCENTCLOUD_SECRETKEY = config.SecretKey;
    IdCard = config.IdCard;
    Name = config.Name;
}

const TcbService = require('../dist/tcb-service-node-sdk');
const tcbService = new TcbService();

describe('人脸融合', () => {
    it('人脸融合 - faceFuse', async () => {
        let imgData = fs.readFileSync('./test/config/ponyma.jpg').toString('base64');

        let result = await tcbService
            .callService({
                service: 'ai',
                action: 'FaceFusion',
                data: {
                    ProjectId: '100792',
                    ModelId: 'qc_100792_162409_1',
                    Image: imgData,
                    RspImgType: 'url'
                }
            });
        
        let data = result.data;
        expect(data.Image).not.toBeNull();
        expect(data.RequestId).not.toBeNull();
    }, 20000);
});

describe.only('人脸核身', () => {
    // it('实名核身鉴权', async () => {
    //     
    //     let result = await tcbService.callService({
    //             service: 'ai',
    //             action: 'DetectAuth',
    //             data: {
    //                 RuleId: 1,
    //                 IdCard,
    //                 Name,
    //                 ImageBase64: fs.readFileSync(path.join(__dirname, '../config/face.jpg')).toString('base64'),
    //             }
    //         });

    //     let data = result.data;
    //     console.log(data);
    // });

    it('获取动作顺序', async () => {
        let result = await tcbService.callService({
            service: 'ai',
            action: 'GetActionSequence',
        });

        let data = result.data;
        // console.log(data);
        expect(typeof data.ActionSequence).toBe('string');
    });

    it('获取数字验证码', async () => {
        let result = await tcbService.callService({
            service: 'ai',
            action: 'GetLiveCode',
        });

        let data = result.data;
        expect(typeof data.LiveCode).toBe('string');
        // console.log(data);
    });

    it('身份信息认证', async () => {
        let result = await tcbService.callService({
            service: 'ai',
            action: 'IdCardVerification',
            data: {
                IdCard,
                Name
            }
        });

        let data = result.data;
        expect(data.Result).toBe('0');
    });

    it.skip('照片人脸核身', async () => {
        let result = await tcbService.callService({
            service: 'ai',
            action: 'ImageRecognition',
            data: {
                IdCard,
                Name,
                ImageBase64: fs.readFileSync('./test/config/face.jpg').toString('base64'),
            }
        });

        let data = result.data;
        // console.log(data);
        expect(data.Sim > 80).toBeTruthy();
    });

    it.skip('活体人脸对比', async () => {
        let result = await tcbService.callService({
            service: 'ai',
            action: 'LivenessCompare',
            data: {
                VideoBase64: fs.readFileSync('./test/config/faceIdCardLiveDetectFour.mp4').toString('base64'),
                ImageBase64: fs.readFileSync('./test/config/face.jpg').toString('base64'),
                LivenessType: 'LIP',
                ValidateData: '1234'
            }
        });

        let data = result.data;
        // console.log(data);
        expect(data.Sim > 80).toBeTruthy();
    }, 200000);

    it.skip('活体人脸核身', async () => {
        let result = await tcbService.callService({
            service: 'ai',
            action: 'LivenessRecognition',
            data: {
                IdCard,
                Name,
                VideoBase64: fs.readFileSync('./test/config/faceIdCardLiveDetectFour.mp4').toString('base64'),
                LivenessType: 'LIP',
                ValidateData: '1234'
            }
        });

        let data = result.data;
        // console.log(data);
        expect(data.Sim > 80).toBeTruthy();
    }, 20000);
});

describe('人脸识别', () => {

    it('人脸检测与分析', async () => {
        
        let result = await tcbService.callService({
            service: 'ai',
            action: 'DetectFace',
            data: {
                Image: fs.readFileSync('./test/config/ponyma.jpg').toString('base64'),
            }
        });

        console.log(result)
        let data = result.data;
        // console.log(data);
        expect(Array.isArray(data.FaceInfos)).toBeTruthy();
    }, 5000);

    it('五官识别', async () => {
        
        let result = await tcbService.callService({
            service: 'ai',
            action: 'AnalyzeFace',
            data: {
                Mode: 0,
                Image: fs.readFileSync('./test/config/ponyma.jpg').toString('base64'),
            }
        });

        let data = result.data;
        // console.log(data);
        expect(Array.isArray(data.FaceShapeSet)).toBeTruthy();
    }, 5000);

    it('人脸比对', async () => {
        
        let result = await tcbService.callService({
            service: 'ai',
            action: 'CompareFace',
            data: {
                ImageA: fs.readFileSync('./test/config/mengmeiqi-0001.jpeg').toString('base64'),
                ImageB: fs.readFileSync('./test/config/mengmeiqi-0002.jpeg').toString('base64'),
            }
        });

        let data = result.data;
        expect(data.Score > 80).toBeTruthy();
    }, 5000);

    it('创建人员库', async () => {
        try {
            await tcbService.callService({
                service: 'ai',
                action: 'CreateGroup',
                data: {
                    GroupName: '孟美歧',
                    GroupId: 'mengmeiqi-01',
                    GroupExDescriptions: ['火箭少女', '宇宙少女']
                }
            });
        }
        catch (e) {
            expect(e.code).toBe('InvalidParameterValue.GroupIdAlreadyExist');
        }
    });

    it('删除人员库', async () => {
        try {
            
            await tcbService.callService({
                service: 'ai',
                action: 'DeleteGroup',
                data: {
                    GroupId: 'mengmeiqi-02'
                }
            });
        }
        catch (e) {
            expect(e.code).toBe('InvalidParameterValue.GroupIdNotExist');
        }
    });

    it('获取人员库列表', async () => {
        
        let result = await tcbService.callService({
            service: 'ai',
            action: 'GetGroupList',
            data: {
                Offset: 0,
                Limit: 10
            }
        });

        let data = result.data;
        // console.log(data);
        expect(data.GroupInfos).toEqual(
            [
                {
                    GroupName: '孟美歧',
                    GroupId: 'mengmeiqi-01',
                    GroupExDescriptions: ['火箭少女', '宇宙少女'],
                    Tag: null
                }
            ]
        );
        expect(data.GroupNum).toBe(1);
    }, 5000);

    it('修改人员库', async () => {
        try {
            
            await tcbService.callService({
                service: 'ai',
                action: 'ModifyGroup',
                data: {
                    GroupId: 'mengmeiqi-02'
                }
            });
        }
        catch (e) {
            expect(e.code).toBe('InvalidParameterValue.GroupIdNotExist');
        }
    }, 5000);

    it('创建人员', async () => {
        try {
            
            await tcbService.callService({
                service: 'ai',
                action: 'CreatePerson',
                data: {
                    GroupId: 'mengmeiqi-01',
                    PersonName: '孟美歧',
                    PersonId: 'mengmeiqi-0001',
                    Image: fs.readFileSync('./test/config/mengmeiqi-0001.jpeg').toString('base64'),
                }
            });
        }
        catch (e) {
            expect(e.code).toBe('InvalidParameterValue.PersonIdAlreadyExist');
        }
    }, 5000);

    it('删除人员', async () => {
        try {
            await tcbService.callService({
                service: 'ai',
                action: 'DeletePerson',
                data: {
                    PersonId: 'mengmeiqi-0002',
                }
            });
        }
        catch (e) {
            expect(e.code).toBe('InvalidParameterValue.PersonIdNotExist');
        }
    }, 5000);

    it('人员库删除人员', async () => {
        try {
            
            await tcbService.callService({
                service: 'ai',
                action: 'DeletePersonFromGroup',
                data: {
                    GroupId: 'mengmeiqi-01',
                    PersonId: 'mengmeiqi-0002',
                }
            });
        }
        catch (e) {
            expect(e.code).toBe('InvalidParameterValue.PersonIdNotExist');
        }
    }, 5000);

    it('获取人员列表', async () => {
        let result = await tcbService.callService({
            service: 'ai',
            action: 'GetPersonList',
            data: {
                GroupId: 'mengmeiqi-01',
                Offset: 0,
                Limit: 10
            }
        });
        
        let data = result.data;
        // console.log(data);
        expect(data.PersonNum).toBe(1);
        expect(data.FaceNum > 0).toBeTruthy();
    }, 5000);

    it('获取人员列表长度', async () => {
        
        let result = await tcbService.callService({
            service: 'ai',
            action: 'GetPersonListNum',
            data: {
                GroupId: 'mengmeiqi-01',
            }
        });

        let data = result.data;
        // console.log(data);
        expect(data.PersonNum).toBe(1);
        expect(data.FaceNum > 0).toBeTruthy();
    }, 5000);

    it('获取人员基础信息', async () => {
        
        let result = await tcbService.callService({
            service: 'ai',
            action: 'GetPersonBaseInfo',
            data: {
                PersonId: 'mengmeiqi-0001',
            }
        });
        
        let data = result.data;
        // console.log(data);
        expect(data.PersonName).toBe('孟美歧');
        expect(data.Gender).toBe(0);
    }, 5000);

    it('获取人员归属信息', async () => {
        
        let result = await tcbService.callService({
            service: 'ai',
            action: 'GetPersonGroupInfo',
            data: {
                PersonId: 'mengmeiqi-0001',
                Offset: 0,
                Limit: 10
            }
        });
        
        let data = result.data;
        // console.log(data);
        expect(data.PersonGroupInfos).toEqual([
            { GroupId: 'mengmeiqi-01', PersonExDescriptions: [] }
        ]);
    }, 5000);

    it('修改人员基础信息', async () => {
        try {
            
            await tcbService.callService({
                service: 'ai',
                action: 'ModifyPersonBaseInfo',
                data: {
                    PersonId: 'mengmeiqi-0002',
                    PersonName: 'hahaha'
                }
            });
        }
        catch (e) {
            expect(e.code).toBe('InvalidParameterValue.PersonIdNotExist');
        }
    }, 5000);

    it('修改人员描述信息', async () => {
        try {
            
            await tcbService.callService({
                service: 'ai',
                action: 'ModifyPersonGroupInfo',
                data: {
                    GroupId: 'mengmeiqi-01',
                    PersonId: 'mengmeiqi-0002',
                    PersonExDescriptionInfos: [{
                        PersonExDescriptionIndex: 0,
                        PersonExDescription: 'haha'
                    }]
                }
            });
        }
        catch (e) {
            expect(e.code).toBe('InvalidParameterValue.PersonIdNotExist');
        }
    }, 5000);

    it('增加人脸', async () => {
        try {
            
            await tcbService.callService({
                service: 'ai',
                action: 'CreateFace',
                data: {
                    PersonId: 'mengmeiqi-0001',
                    Images: [
                        fs.readFileSync('./test/config/mengmeiqi-0002.jpeg').toString('base64'),
                        fs.readFileSync('./test/config/mengmeiqi-0003.jpeg').toString('base64')
                    ],
                }
            });
            // let data = result.data;
            // console.log(data);
            // expect(data.SucFaceNum).toEqual(2);
        }
        catch (e) {
            expect(e.code).toBe('InvalidParameterValue.PersonFaceNumExceed');
        }

    }, 5000);

    it('删除人脸', async () => {
        
        let result = await tcbService.callService({
            service: 'ai',
            action: 'DeleteFace',
            data: {
                PersonId: 'mengmeiqi-0001',
                FaceIds: ['2984444426221357938', '2984447426221357949']
            }
        });

        let data = result.data;
        expect(data.SucDeletedNum).toEqual(0);
    }, 20000);

    it('复制人员', async () => {
        try {
            
            await tcbService.callService({
                service: 'ai',
                action: 'CopyPerson',
                data: {
                    PersonId: 'mengmeiqi-0001',
                    GroupIds: ['mengmeiqi-02']
                }
            });
        }
        catch (e) {
            expect(e.code).toBe('InvalidParameterValue.GroupIdNotExist');
        }
    }, 20000);

    it('人脸搜索', async () => {
        
        let result = await tcbService.callService({
            service: 'ai',
            action: 'SearchFaces',
            data: {
                GroupIds: ['mengmeiqi-01'],
                Image: fs.readFileSync('./test/config/mengmeiqi-0004.jpg').toString('base64'),
            }
        });
        let data = result.data;
        expect(data.Results[0].Candidates.length > 0).toBeTruthy();
    }, 20000);

    it('人脸验证', async () => {
        
        let result = await tcbService.callService({
            service: 'ai',
            action: 'VerifyFace',
            data: {
                PersonId: 'mengmeiqi-0001',
                Image: fs.readFileSync('./test/config/mengmeiqi-0004.jpg').toString('base64'),
            }
        });
        let data = result.data;
        // console.log(data);
        expect(data.Score > 80).toBeTruthy();
    }, 20000);

    it.skip('人脸静态活体检测', async () => {
        
        let result = await tcbService.callService({
            service: 'ai',
            action: 'DetectLiveFace',
            data: {
                Image: fs.readFileSync('./test/config/face.jpg').toString('base64'),
            }
        });
        let data = result.data;
        // console.log(data);
        expect(data.Score > 80).toBeTruthy();
    }, 20000);
});