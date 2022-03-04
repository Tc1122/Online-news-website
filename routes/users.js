var express = require('express');
var router = express.Router();
const render=require('../app');
const newsHelper = require('../helpers/news-helper');
const userHelper = require('../helpers/user-helper');
const userhelper = require('../helpers/user-helper')

/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  console.log(user);

    
    newsHelper.getAllNews().then((news)=>{

    res.render('user/user-view',{news,user});
    })
});
router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/');
  }else{
    res.render('user/login',{"loginError":req.session.loginError});
    req.session.loginError=false
  }
})
 router.get('/subscribe',(req,res)=>{
   res.render('user/subscribe');
 })
 router.post('/signup',(req,res)=>{
   userhelper.doSignup(req.body).then((response)=>{
     console.log(response);
   })
 })

 router.post('/login',(req,res)=>{
   userHelper.doLogin(req.body).then((response)=>{
     if(response.status){
       req.session.loggedIn=true
       req.session.user=response.user
       res.redirect('/')
     }else{           
       req.session.loginError="Invalid Username or Password"                     
       res.redirect('/login')
     }
   })
 })
 router.get('/logout',(req,res)=>{
   req.session.destroy()
   res.redirect('/')
 })
module.exports = router;
