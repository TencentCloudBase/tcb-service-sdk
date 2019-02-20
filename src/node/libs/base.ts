
export default abstract class Base {

    protected cloud: any;
    protected action: string;
    protected version: string;
    protected data: any;
    protected options: any;

    public constructor(cloud, version, action, data, options = {}) {
        this.cloud = cloud;
        this.action = action;
        this.version = version;
        this.data = data;
        this.options = options;
    }

    public abstract async init()
}