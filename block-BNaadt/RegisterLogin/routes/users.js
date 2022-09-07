var express = require('express');
var router = express.Router();

var User = require('../model/UserDB');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});


router.get('/Register',(req, res, next) => {
  res.render('Register');
});


router.post('/Register',(req, res, next) => {
  User.create(req.body,(err, user) => {
    if (err) return next(err);
    console.log(req.body);
    res.redirect('/users/Login');
  })
});

router.get('/Login',(req, res, next) => {
  res.render('Login');
});


router.post('/Login',(req, res, next) => {
    var {email, password} = req.body;
    if(!email || !password){
         next();
    }
    console.log(email,password);
    res.redirect("/users/Login")
    
    User.findOne({ email },(err, user) => {
      if(err) return next(err);

      if(!user) {
        res.redirect('/users/Login');
      }
      //compaire password
      user.verfiypassword(password, (err, result) => {
        console.log(err, result);
      })
    })

    req.session.userId = user.id;
    res.redirect('/users');
});
module.exports = router;

