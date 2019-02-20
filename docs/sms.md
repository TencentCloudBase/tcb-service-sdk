# 短信

以下项目各自的 `data` 参数，可以到 `sms-node-sdk` 的[SDK 文档](https://github.com/TencentCloudBase/sms-node-sdk/blob/master/docs/README.md)详细参考。

* 使用前，请先创建名为 `verification` 的数据库集合。

* 将 `cloud/functions/sms` 中的所需要的云函数放置在项目的云函数根目录，并创建部署。

## 单发短信

- callService 入参
```js
{
    service: 'sms',
    action: 'sms-single-send',
    data: {
        msgType: 0, // Enum{0: 普通短信, 1: 营销短信}
        nationCode: '86',
        phoneNumber: '12838494857',
        msg: '【腾讯云】您的验证码是: 5678！'
    }
}
```

## 指定模板ID单发短信

- callService 入参
```js
{
    service: 'sms',
    action: 'sms-single-send-template',
    data: {
        nationCode: '86',
        phoneNumber: '12838494857',
        templId: 278435,
        params: ['5678'],
        sign: '腾讯云'
    }
}
```

## 群发

- callService 入参
```js
{
    service: 'sms',
    action: 'sms-multi-send',
    data: {
        msgType: 0, // Enum{0: 普通短信, 1: 营销短信}
        nationCode: '86',
        phoneNumber: ['12838494857', '12848574875'],
        msg: '【腾讯云】您的验证码是: 5678'
    }
}
```

## 指定模板ID群发

- callService 入参
```js
{
    service: 'sms',
    action: 'sms-multi-send-template',
    data: {
        nationCode: '86',
        phoneNumber: ['12838494857', '12848574875'],
        templId: '7839',
        params: ['5678'],
        sign: '腾讯云'
    }
}
```

## 发送语音验证码

- callService 入参
```js
{
    service: 'sms',
    action: 'code-voice-send',
    data: {
        nationCode: '86',
        phoneNumber: '12838494857',
        msg: '1234',
        playtimes: 2
    }
}
```

## 发送语音通知

- callService 入参
```js
{
    service: 'sms',
    action: 'prompt-voice-send',
    data: {
        nationCode: '86',
        phoneNumber: '12838494857',
        msg: '5678',
        playtimes: 2
    }
}
```

## 拉取短信回执

- callService 入参
```js
{
    service: 'sms',
    action: 'sms-status-pull-callback',
    data: {
        maxNum： 10
    }
}
```

## 拉取短信回复

- callService 入参
```js
{
    service: 'sms',
    action: 'sms-status-pull-reply',
    data: {
        maxNum： 10
    }
}
```

## 拉取单个手机短信回执

- callService 入参
```js
{
    service: 'sms',
    action: 'sms-mobile-status-pull-callback',
    data: {
        nationCode: '86',
        phoneNumber: '12838494857',
        beginTime: 1511125600,
        endTime: 1511841600,
        maxNum: 10
    }
}
```

## 拉取单个手机短信回复

- callService 入参
```js
{
    service: 'sms',
    action: 'sms-mobile-status-pull-reply',
    data: {
        nationCode: '86',
        phoneNumber: '12838494857',
        beginTime: 1511125600,
        endTime: 1511841600,
        maxNum: 10
    }
}
```

## 上传语音文件

- callService 入参
```js
{
    service: 'sms',
    action: 'voice-file-upload',
    data: {
        fileContent: fs.readFileSync('path/to/file');
    }
}
```

## 按语音文件fid发送语音通知

- callService 入参
```js
{
    service: 'sms',
    action: 'file-voice-send',
    data: {
        nationCode: '86',
        phoneNumber: '12838494857',
        fid: 'c799d10a43ec109f02f2288ca3c85b79e7700c98.mp3',
    }
}
```

## 指定模板发送语音通知

- callService 入参
```js
{
    service: 'sms',
    action: 'tts-voice-send',
    data: {
        nationCode: '86',
        phoneNumber: '12838494857',
        templId: 7839,
        params: ['5678']
    }
}
```