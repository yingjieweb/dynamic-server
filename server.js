let http = require('http');
let fs = require('fs');
let url = require('url');
let port = process.argv[2];

if(!port){
  console.log('指定端口号不好吗？\nnode server.js 8888 这样不会吗？');
  process.exit(1);
}

let server = http.createServer(function(request, response){
  let parsedUrl = url.parse(request.url, true);
  let pathWithQuery = request.url ;
  let queryString = '';
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  let path = parsedUrl.pathname;
  let query = parsedUrl.query;
  let method = request.method;

  /********************/

  console.log('有个傻子发请求过来啦！路径(带查询参数)为：' + pathWithQuery)

  if (path === '/sign_in' && method==="POST"){
    let userArray = JSON.parse(fs.readFileSync('./database/users.json'));
    const array = []; //设置一个数据容器，逐步接受请求发送过来的信息chunk
    request.on('data',(chunk) => { //将分块传送来的数据接收到一个数组里
      array.push(chunk);
    })
    request.on('end',() => {  //当接收数据完成时，将用户信息写进数据库
      let string = Buffer.concat(array).toString(); //chunk => string
      let obj = JSON.parse(string); //string => object
      const user = userArray.find( user => user.name === obj.name && user.password === obj.password );
      if (user === undefined) { //数据库里没找到上述用户名密码匹配的对象
        response.statusCode = 400;
        response.setHeader("Content-Type","text/json;charset=utf-8");
        response.end(`{"errorCode":4001}`)
      } else {
        response.statusCode = 200;
        response.setHeader('Set-Cookie',`user_id = ${user.id};HttpOnly`); //设置cookie
        response.end();
      }
    })
  } else if (path === '/home.html'){
    const cookie = request.headers['cookie'];
    if(cookie ==="user_id=1") {
      const homeHtml = fs.readFileSync("./src/home.html").toString();
      const string = homeHtml.replace('{{loginStatus}}', '已登录')
      response.write(string);
    }else{
      const homeHtml = fs.readFileSync("./src/home.html").toString();
      const string = homeHtml.replace('{{loginStatus}}', '未登录')
      response.write(string);
    }
    response.end('home')
  }else if (path === '/register' && method==="POST"){
    response.statusCode = 200;
    response.setHeader('Content-Type','text/html;charset=utf-8');
    let userArray = JSON.parse(fs.readFileSync('./database/users.json'));
    const array = []; //设置一个数据容器，逐步接受请求发送过来的信息chunk
    request.on('data',(chunk) => { //将分块传送来的数据接收到一个数组里
      array.push(chunk);
    })
    request.on('end',() => {  //当接收数据完成时，将用户信息写进数据库
      let string = Buffer.concat(array).toString(); //chunk => string
      let obj = JSON.parse(string); //string => object
      const lastUser = userArray[userArray.length - 1];
      let newUser = {id:lastUser ? userArray[userArray.length-1].id+1 : 1,name:obj.name,password:obj.password};
      userArray.push(newUser);
      fs.writeFileSync('./database/users.json',JSON.stringify(userArray));
      response.end();
    })
  }else{
    response.statusCode = 200;
    //设置默认首页
    let superPath = path === '/' ? '/home.html' :path;

    const index = superPath.lastIndexOf('.'); //找到后缀 . 的下标
    const suffix = superPath.substring(index);  //拿到 . 及后面的后缀
    const fileTypes = {
      '.html':'text/html',
      '.css':'text/css',
      '.js':'text/javascript',
      '.png':'image/png',
      '.jpg':'image/jpeg'
    }
    response.setHeader('Content-Type',`${fileTypes[suffix] || 'text/html'};charset=utf-8`); //根据请求的文件后缀,设置响应头中的文件类型

    let content;
    try{
      content = fs.readFileSync(`./src/${superPath}`);
    }catch (error) {
      response.statusCode = 404;
      content = '你在神思啥呢,老弟！'
    }
    response.write(content);
    response.end()
  }

  /********************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)