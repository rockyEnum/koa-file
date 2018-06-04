var multiparty = require('multiparty');
var fs = require('fs')
var util = require('util');
var path = require('path')
var basePath = path.dirname(require.main.filename);//获取主入口文件路径
const formUpload = async (ctx) => {
    let body = await saveFile(ctx)
    return body;
}
const saveFile = (ctx) => {
    return new Promise((resolve, reject) => {
        const form = new multiparty.Form();
        form.uploadDir = './img' //设置存放路径
        //fieids 存放其他表单数据
        //files 存放文件
        //判断文件路径是否存在
        fs.stat(basePath+'/img',(err)=>{
             if(err){
               let mkdir = fs.mkdirSync(basePath+'/img')
               saveImg(form,ctx,resolve,reject)
             }else{
                saveImg(form,ctx,resolve,reject)
             }
        })
       
    })
}
const saveImg = (form,ctx,resolve,reject)=>{
    form.parse(ctx.request.req, (err, fieids, files) => {
        for (let item in files) {
            var oldPath = basePath + '/' + files[item][0].path;
            var newPath = basePath + '/img/' + files[item][0].originalFilename;
            fs.rename(oldPath, newPath, (err) => {
                if (!err) {
                    console.log('修改成功')
                    resolve("修改成功")
                }
            })
        }
    })
}
module.exports = {
    formUpload
}