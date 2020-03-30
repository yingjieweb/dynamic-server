let fs = require("fs");

//读数据库
const usersString = fs.readFileSync("./database/users.json").toString();
const usersArray = JSON.parse(usersString);

//写数据库
const user3 = {id:3,name:'tom',password:'yyy'};
usersArray.push(user3);
const string = JS0N.stringify(usersArray);
fs.writeFileSync('./database/users.json',string);

//run node operate.js