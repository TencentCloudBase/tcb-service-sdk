
export default abstract class Base {

    protected tcbService: any;
    protected action: string;
    protected version: string;
    protected data: any;
    protected options: any;

    protected secretID: string;
    protected secretKey: string;
    protected sessionToken: string;

    public constructor(tcbService, version, action, data, options) {
        this.tcbService = tcbService;
        this.action = action;
        this.version = version;
        this.data = data;
        this.options = options;

        let {
            secretID: ID1,
            secretKey: Key1,
            sessionToken: Token1
        } = tcbService;

        let {
            secretID: ID2,
            secretKey: Key2,
            sessionToken: Token2
        } = options;

        if (ID2){
            this.secretID = ID2
            this.secretKey = Key2
            this.sessionToken = Token2
        }
        else {
            this.secretID = ID1;
            this.secretKey = Key1;
            this.sessionToken = Token1
        }
    }

    public abstract async init()
}