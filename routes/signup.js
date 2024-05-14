const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  res.render('signup', {
    title: 'Sign up',
  });
});

router.post('/',function(req,res,next){
    const username = req.body.username;
    const password = req.body.password;
    const repassword = req.body.repassword;
    knex("users")
        .where({name:username})
        .select("*")
        .then(function(result){
            if(result.length !== 0){//ユーザーネームが同じな時，レコードが取得できないので!==0の時に実行する
                res.render("signup",{
                    title:"Sign Up",
                    errorMessage:["このユーザーネームはすでに使用されています．"],
                })
            }
            else if(password === repassword){
                knex("users")
                    .insert({name: username,password: password})
                    .then(function(){
                        res.redirect("/");
                    })
                    .catch(function(err){
                        console.log(err);
                        res.render("signup",{
                            title:"Sign Up",
                            errorMessage:[err.sqlMessage]
                        })
                    })
            }
            else{
                res.render("signup",{
                    title:"Sign Up",
                    errorMessage:["パスワードが一致しません"],
                })
            }
        })
        .catch(function (err) {
            console.error(err);
            res.render("signup", {
              title: "Sign up",
              errorMessage: [err.sqlMessage],
            });
          });
});

module.exports = router;