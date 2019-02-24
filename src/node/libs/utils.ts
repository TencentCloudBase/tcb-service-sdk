const axios = require('axios');

export default class Utils {
    private tcbService: any;

    constructor(tcbService) {
        this.tcbService = tcbService;
    }

    async getContent({ fileID = null, url = null, options = {} }: any): Promise<string|null> {
        try {
            if (fileID) {
                let result = await this.tcbService.cloud.downloadFile({
                    fileID: fileID
                });

                if (result.fileContent) {
                    return result.fileContent;
                }
            }
            else if (url) {
                let image = await axios.get(url, {
                    responseType: 'arraybuffer',
                    ...options
                });

                if (image.data) {
                    let imageBase64 = image.data;
                    return imageBase64;
                }
            }
        }
        catch (e) {
            console.log(e);
        }

        return null;
    }
}