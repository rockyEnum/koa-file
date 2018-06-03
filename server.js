var multiparty = require('multiparty');
var fs = require('fs')
var http = require('http');
var util = require('util');
http.createServer((req,res)=>{
    if(req.url =='/upload' && req.method.toLocaleLowerCase() == 'post'){
        const form = new multiparty.Form();
        form.uploadDir = './img' //设置存放路径
        //fieids 存放其他表单数据
        form.parse(req,(err,fieids,files)=>{
            for(let item in files){
                var oldPath =__dirname + '/'+ files[item][0].path;
                var newPath = __dirname + '/img/'+ files[item][0].originalFilename;
                fs.rename(oldPath,newPath,(err)=>{
                    if(!err){
                        console.log('修改成功')
                    }
                })
            }
            res.end();
        })
    }

}).listen(8888,(err)=>{
  if(err){
      console.log(err)
  }else{
      console.log('8888端口开启成功')
  }
})