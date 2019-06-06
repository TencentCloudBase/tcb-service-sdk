# v0.1.0
- [add] 增加 `sessionToken` 参数，默认值为环境变量 `TENCENTCLOUD_SESSIONTOKEN`，以支持临时密钥调用服务。
- [change] `secretID`, `secretKey`, `sessionToken` 为一组值，以 `secretID` 为标识，当手动配置 `secretID` 时，其余两个也都取配置值，默认为 null，否则从环境变量中获取3个值。
