### 实现用户注册功能:
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