
export default abstract class Base {

    protected tcbService: any;
    protected action: string;
    protected version: string;
    protected data: any;
    protected options: any;

    protected secretID: string;
    protected secretKey: string;

    public constructor(tcbService, version, action, data, options) {
        this.tcbService = tcbService;
        this.action = action;
        this.version = version;
        this.data = data;
        this.options = options;

        let {
            secretID: ID1,
            secretKey: Key1
        } = tcbService;

        let {
            secretID: ID2,
            secretKey: Key2
        } = options;

        this.secretID = ID2 || ID1;
        this.secretKey = Key2 || Key1;
    }

    public abstract async init()
}