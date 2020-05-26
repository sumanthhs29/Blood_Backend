const http=require('http');
const app=require('./app');
// const port = process.env.PORT || 1025;
var server=http.createServer(app);
if(server){
    console.log("The server is running on Port :1025");
}
server.listen(1025);
