var db=require('../config/connection')
var collection=require('../config/collection');
const async = require('hbs/lib/async');
module.exports={

    addNews:(news,callback)=>{ 
           
        console.log(news);
        db.get().collection('news').insertOne(news).then((data)=>{
           console.log(data);
           callback(data.insertedId)
        })
    },
    getAllNews:()=>{
        return new Promise(async(resolve,reject)=>{
            let news=await db.get().collection(collection.NEWS).find().toArray()
            news.reverse();
            resolve(news)
        })
    }
}