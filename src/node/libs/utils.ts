import axios from 'axios';

export default class Utils {
    private tcbService: any;

    constructor(tcbService) {
        let {
            secretID,
            secretKey,
            env
        } = tcbService;
        this.tcbService = tcbService;

        this.tcbService.cloud.init({
            secretId: secretID,
            secretKey,
            env
        });
    }

    async getBase64({ fileID = null, url = null, options = {} }: any): Promise<string|null> {
        if (fileID) {
            let result = await this.tcbService.cloud.downloadFile({
                fileID: fileID
            });

            if (result.fileContent) {
                return result.fileContent.toString('base64');
            }
        }
        else if (url) {
            let image = await axios.get(url, {
                responseType: 'arraybuffer',
                ...options
            });

            if (image.data) {
                let imageBase64 = image.data.toString('base64');
                return imageBase64;
            }
        }
        
        return null;
    }
}