const express = require('express');
const router = express.Router();
const knex = require("../db/knex");

router.get('/', function (req, res, next) {
  res.render('signin', {
    title: 'Sign in',
  });
});

router.post('/',function(req,res,next){
    const username = req.body.username;
    const password = req.body.password;

    knex("users")
        .where({
            name:username,
            password:password,//パスワードと名前が等しいという条件
        })
        .select("*")
        .then(function(result){
            if(result.length === 0){
                res.render("signin",{
                    title:"Sign In",
                    errorMessage:["ユーザーが見つかりません"],
                });
            }else{
                res.redirect("/");
            }
        })
        .catch(function (err) {
            console.error(err);
            res.render("signin", {
              title: "Sign in",
              errorMessage: [err.sqlMessage],
              isAuth: false,
            });
        });
});

module.exports = router;