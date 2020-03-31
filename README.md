## 实现用户注册 sign_up 功能:
1. 用户提交用户名和密码
2. users.json 里就新增了一行数据

### 前端思路:
1. 前端写一个 form，让用户填写 name 和 password
2. 前端监听 form 表单的 submit 事件
3. 前端发送 post 请求，数据位于请求体

### 后端思路:
1. 后端接收post请求
2. 后端获取请求体中的name和password
3. 后端将获取的 name 和 password 拼接上 id 存储到数据库

------

## 实现用户登录 sign_in 功能:
1. 首页home.html，已登录用户可看到自己用户名
2. 登录页sign_in.html供提交用户名和密码输入的用户名密码
3. 如果是匹配的，就自动跳转首页

### 前端思路:
1. 前端写一个form，让用户填写name和 password
2. 前端监听 submit事件
3. 前端发送post 请求，数据位于请求体

### 后端思路:
1. 后端接收post 请求
2. 后端获取请求体中的name和password
3. 后端读取数据，看是否有匹配的name和 password

------

### 如果用户名密码匹配，后端应标记用户已登录，可是怎么标记？
### Cookie
- Cookie是服务器下发给浏览器的一段字符串，后端通过 Set-Cookie 进行设置
- 浏览器必须保存这个Cookie（除非用户删除）
- 之后发起相同二级域名请求（任何请求）时，浏览器Reuest header自动附上Cookie
