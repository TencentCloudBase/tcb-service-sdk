# 音视频（视频客服、直播）

## 视频客服

* 使用前，请先创建名为 `webrtcRooms` 的数据库集合。

* 将 `cloud/functions/video` 中的 `webrtcroom-enter-room`, `webrtcroom-get-room-info`, `webrtcroom-get-room-list` 和 `webrtcroom-quit-room` 云函数放置在项目的云函数根目录，并创建部署。

### 进入房间
进入房间主要是根据房间号或者房间名创建或进入房间。如果提供的入参是房间号，如果房间不存在，则创建并进入房间；如果存在，则直接进入房间。如果提供的入参是房间名，则随机生成一个房间号。

- callService 入参
```js
// 填入房间号
{
    service: 'video',
    action: 'webrtcroom-enter-room',
    data: {
        roomID: '1234'
    }
}

// 填入房间名
{
    service: 'video',
    action: 'webrtcroom-enter-room',
    data: {
        roomName: '商品客服1'
    }
}
```

### 退出房间
如果退出房间后，观众和主播均为0，则删除房间。

- callService 入参
```js
// 填入房间号
{
    service: 'video',
    action: 'webrtcroom-quit-room',
    data: {
        roomID: '1234'
    }
}
```

### 获取房间列表

- callService 入参
```js
{
    service: 'video',
    action: 'webrtcroom-get-room-list',
    data: {
        skip: 0, // 从哪里开始获取
        limit: 20 // 每页房间数
    }
}
```

### 获取房间信息

- callService 入参
```js
{
    service: 'video',
    action: 'webrtcroom-get-room-info',
    data: {
        roomID: '1234'
    }
}
```

## 直播

* 使用前，请先创建名为 `liveRooms` 的数据库集合。

* 将 `cloud/functions/video` 中的 `liveroom-enter-room`, `liveroom-get-room-info`, `liveroom-get-room-list` 和 `liveroom-quit-room` 云函数放置在项目的云函数根目录，并创建部署。

### 进入房间
进入房间主要是根据房间号或者房间名创建或进入房间。如果提供的入参是房间号，如果房间不存在，则创建并进入房间；如果存在，则直接进入房间。如果提供的入参是房间名，则随机生成一个房间号。

- callService 入参
```js
// 填入房间号
{
    service: 'video',
    action: 'liveroom-enter-room',
    data: {
        roomID: '1234'
    }
}

// 填入房间名
{
    service: 'video',
    action: 'liveroom-enter-room',
    data: {
        roomName: '美女直播间'
    }
}
```

### 退出房间
如果退出房间后，观众和主播均为0，则删除房间。

- callService 入参
```js
// 填入房间号
{
    service: 'video',
    action: 'liveroom-quit-room',
    data: {
        roomID: '1234'
    }
}
```

### 获取房间列表

- callService 入参
```js
{
    service: 'video',
    action: 'liveroom-get-room-list',
    data: {
        skip: 0, // 从哪里开始获取
        limit: 20 // 每页房间数
    }
}
```

### 获取房间信息

- callService 入参
```js
{
    service: 'video',
    action: 'liveroom-get-room-info',
    data: {
        roomID: '1234'
    }
}
```