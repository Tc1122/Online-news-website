var express = require('express');
const render=require('../app');
const newsHelper = require('../helpers/news-helper');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  newsHelper.getAllNews().then((news)=>{
    console.log(news);
    res.render('admin/view-news', { admin:true,news}); 
  })
  
}); 
router.post('/view-news',(req,res)=>{
  console.log(req.body);
  console.log(req.files.image);

   newsHelper.addNews(req.body,(id)=>{
     let image=req.files.image
     console.log(id);
     image.mv('./public/images/'+id+'.jpeg',(err,done)=>{
      if(!err){
        res.render("admin/view-news")
      }else{
        console.log(err);
      }
    })
    res.render('admin/view-news',{admin:true})
  })
})

module.exports = router;
 