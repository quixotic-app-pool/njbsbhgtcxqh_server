/**
 * @Author: MichaelChen <mymac>
 * @Date:   2017-10-26T18:27:11+08:00
 * @Email:  teacherincafe@163.com
 * @Project: one_server
 * @Filename: Route.js
 * @Last modified by:   mymac
 * @Last modified time: 2017-11-26T18:51:18+08:00
 */
 var express = require('express');
 var dateFormat = require('dateformat');
 var CircularJSON = require('circular-json');
 var mongoose = require('mongoose');
 const ObjectId = mongoose.Types.ObjectId
 //nnd，multer 比较娇贵，只能走这了
 var path = require('path')
 var Jimp = require("jimp");
 var multer = require('multer');
 var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, __dirname + '/../imageuploaded/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
  var upload = multer({ storage: storage })

 var router = express.Router();


 var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
 router.use(bodyParser.json());                                     // parse application/json
 router.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded

 var InviteModel = require("../models/invite");
 var PortfolioModel = require("../models/portfolio");
 //Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('#################Welcome to server of njbsbhgtcdsxqh!######################')
  var now = new Date();
  console.log('Time: ', dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT"));
  next();
});


//image files realted
router.post('/api/upload/image', upload.single('file'), function(req, res, next) {
  var filePath = __dirname + '/../imageuploaded/'
  var logoPath = __dirname + '/../assets/imgs/logo.png'
  var file= filePath + req.file.filename
  Jimp.read(file).then(function (img) {
      Jimp.read(logoPath).then(function(logoImg){
        img.resize(480, Jimp.AUTO)            // resize
           .quality(60)                 // set JPEG quality
           .composite(logoImg, 360 , 10)
           .write(file); // save
       })
    }).catch(function (err) {
       console.error(err);
   });
  var reply = { img: file}
  res.json(reply)
})

//router
router.post('/api/verifyinvite', function(req, res) {
  var invitecode = req.body.invitecode;
  // console.log('/api/verifyinvite: ' + CircularJSON.stringify(data))
   InviteModel.findOne({'invitecode': invitecode}, function(err, docs){
     if(err) {
       res.send("Sorry, this operation failed, please try again.")
     } else {
       console.log("this is doc: " + docs)
       res.send(docs);
     }
   })
})

router.post('/api/newportfolio', function(req, res) {
  var now = new Date();
   now = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT")
   var data = req.body.pack;
   var portfolioEntity = new PortfolioModel({
     imgurls: data.imgUrls,
     nickname: data.nickname,
     selfintro: data.selfintro,
     gender: data.gender,
     age: data.age,
     marriagestatus: data.marriagestatus,
     height: data.height,
     weight: data.weight,
     degree: data.degree,
     shihaigui: data.shihaigui,
     college: data.college,
     major: data.major,
     city: data.city,
     salary: data.salary,
     youfang: data.youfang,
     hometown: data.hometown,
     industry: data.industry,
     companytype: data.companytype,
     created_time: now
   })
   portfolioEntity.save(function(err, docs){
       if(err) console.log(err);
       console.log('blog保存成功：' + docs);
       res.send({success: true})
   })
})

router.get('/api/getlist', function(req, res) {
  //默认都显示，如果有filter，按filter显示，微信本地检查之前选项，如果是女生则默认显示女生
  var data = req.query;
  console.log("request regarding list: " + CircularJSON.stringify(data));
   var option = {
     limit: 10,
     skip: 10 * data.page
   }
   if(data.genderpreference === '男生' || data.genderpreference === '女生') {
     PortfolioModel.find({gender: data.genderpreference}, {}, option, function(err, docs){
       if(err) {
         res.send("Sorry, this operation failed, please try again.")
       } else {
         console.log('reply from db about list: ' + docs);
         if(!docs) {
           res.send('没有更多了')
         } else {
           res.json(docs);
         }
        //  {_id: 232312321, name: '爱因斯坦', age: '25', gender: '男生', height: '175', degree: '本科', weight: '68', industry: '互联网', position: '前端程序员', img: './einstain.jpeg'}, {_id: 232312321, name: '爱因斯坦', age: '25', gender: '男生', height: '175', degree: '本科', weight: '68', industry: '互联网', position: '前端程序员', img: './einstain.jpeg'}, {_id: 232312321, name: '爱因斯坦', age: '25', gender: '男生', height: '175', degree: '本科', weight: '68', industry: '互联网', position: '前端程序员', img: './einstain.jpeg'}, {_id: 232312321, name: '爱因斯坦', age: '25', gender: '男生', height: '175', degree: '本科', weight: '68', industry: '互联网', position: '前端程序员', img: './einstain.jpeg'}, {_id: 232312321, name: '爱因斯坦', age: '25', gender: '男生', height: '175', degree: '本科', weight: '68', industry: '互联网', position: '前端程序员', img: './einstain.jpeg'}, {_id: 232312321, name: '爱因斯坦', age: '25', gender: '男生', height: '175', degree: '本科', weight: '68', industry: '互联网', position: '前端程序员', img: './einstain.jpeg'}

       }
     })
   } else {
     console.log("没有性别倾向暂时");
     PortfolioModel.find({}, {}, option, function(err, docs){
       if(err) {
         console.log(err);
         res.send("Sorry, this operation failed, please try again.")
       } else {
         console.log('reply from db about list: ' + docs);
         if(!docs) {
           res.send('没有更多了')
         } else {
           res.json(docs);
         }

        //  {_id: 232312321, name: '爱因斯坦', age: '25', gender: '男生', height: '175', degree: '本科', weight: '68', industry: '互联网', position: '前端程序员', img: './einstain.jpeg'}, {_id: 232312321, name: '爱因斯坦', age: '25', gender: '男生', height: '175', degree: '本科', weight: '68', industry: '互联网', position: '前端程序员', img: './einstain.jpeg'}, {_id: 232312321, name: '爱因斯坦', age: '25', gender: '男生', height: '175', degree: '本科', weight: '68', industry: '互联网', position: '前端程序员', img: './einstain.jpeg'}, {_id: 232312321, name: '爱因斯坦', age: '25', gender: '男生', height: '175', degree: '本科', weight: '68', industry: '互联网', position: '前端程序员', img: './einstain.jpeg'}, {_id: 232312321, name: '爱因斯坦', age: '25', gender: '男生', height: '175', degree: '本科', weight: '68', industry: '互联网', position: '前端程序员', img: './einstain.jpeg'}, {_id: 232312321, name: '爱因斯坦', age: '25', gender: '男生', height: '175', degree: '本科', weight: '68', industry: '互联网', position: '前端程序员', img: './einstain.jpeg'}s

       }
     })
   }

})

router.get('/api/getdetail', function(req, res) {
  var _id = req.query._id;
  PortfolioModel.findById( ObjectId(_id), function(err, docs){
    if(err) {
      console.log(err);
      res.send("Sorry, this operation failed, please try again.")
    } else {
      console.log('reply from db about list: ' + docs);
      if(!docs) {
        res.send('没有更多了')
      } else {
        res.json(docs);
      }

    }
  })
})


module.exports = router;
