## 服务端代码

1. 需要启动 mongodb
2. 需要启动 redis
3. node 版本需要>=14.0
4. nestjs 框架

> config 目录存放配置文件

> database 目录存放数据相关的 schema 和 module

> filter 目录存放过滤异常以及 APM 打点

> gateway 目录存放全局网关进行鉴权和拦截

> interceptor 目录存放全局接口默认返回值信息

> modules 目录存放业务模块以及第三方插件

> operations 目录存放业务逻辑

> process 目录存放监听服务的异常并进行 APM 打点

> providers 目录存放服务，业务服务和第三方插件服务

> queue 目录存放队列和任务调度

> service 目录存放 APM 打点服务，swagger 服务

> utils 目录存放工具方法

### 主要功能

-   商家申请
-   商家审核
-   商家添加类目
-   商家添加某一个类目下的商品
-   微信支付
-   支付宝支付
-   店铺地理位置筛选
-   骑手地理位置上报和更新
-   短信验证
-   商品下单
-   添加优惠活动
-   oss 图片上传
-   用户注册并登录
-   极光推送
-   任务队列
-   商品条形码扫码查询详细信息并入库
