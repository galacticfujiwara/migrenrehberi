const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
//TÜm kayıtları listeleme


router.get("/testt", (req, res, next) => {
  res.json({
    data: "deneme veri",
    status: 200,
    message: "Set Approve  pass",
    error: "",
    message_tr: "Approve tamam",
  });
});

router.get('/verifyToken/:token', (req, res) => {
  const token =
    req.headers['token'] ||
    req.body.token ||
    req.query.token ||
    req.params.token;

  if (token) {
    jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
      if (err) {
        res.json({
          status: 401,
          message: 'Token Geçersiz',
        });
      } else {
        req.decode = decoded;
        res.json({
          status: 200,
          message: 'Token Accept',
          message_tr: 'Token Geçerli',
          data: decoded,
        });
        next();
      }
    });
  } else {
    res.json({
      status: 401,
      message: 'Tekrar giriş yapınız',
    });
  }
});
//TEST
router.post('/userInfo', (req, res, next) => {
  const {token} = req.body;
  var userID = '';
  console.log('user ınfo req.body',req.body)
  jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
    console.log('user ınfo tokendecoded ',decoded)

    if (err) {
      res.json({
        status: 401,
        message: 'Token Geçersiz',
      });
    } else {
      var bilgiler = decoded;
      userID = decoded.id;
      console.log('bilgiler', bilgiler);
    }
  });
  const promise = User.findByIdAndUpdate(
    userID,
    //buda post ile gelen data
    {new: true},
  );
  promise
    .then(user => {
      if (!user)
        res.json({
          data: '',
          status: 204,
          message: 'Set Approve  not found',
          error: '',
          message_tr: 'Onaylacak kullanıcı bulunamadı.',
        });
     
      res.json({
        data: user,
        status: 200,
        message: 'Set Approve  pass',
        error: '',
        message_tr: 'Approve tamam',
      });
    })
    .catch(err => {
      res.json({
        data: '',
        status: 204,
        message: 'Approve  failed',
        error: err,
        message_tr: 'Kullanıcı Approve Başarısız',
      });
    });
});
router.get('/geTAU', (req, res, next) => {
  const {token} = req.body;
  var userID = '';
  console.log('user ınfo req.body',req.body)

  const promise = User.find(
   {},
   
  );
  promise
    .then(user => {
  
     
      res.json({
        data: user,
        status: 200,
        message: 'Set Approve  pass',
        error: '',
        message_tr: 'Approve tamam',
      });
    })
    .catch(err => {
      res.json({
        data: '',
        status: 204,
        message: 'Approve  failed',
        error: err,
        message_tr: 'Kullanıcı Approve Başarısız',
      });
    });
});

//Token oluşturma
router.post('/authenticateUser', (req, res) => {
  const {KullaniciAdi, Sifre} = req.body;
  console.log('KullaniciAdi: ' + KullaniciAdi + ' Sifre:' + Sifre);
  //Kullanıcı adı ile token oluşturuyoruz, ileride eposta ile olabilir
  User.findOne(
    {
      $or: [
        {
          KullaniciAdi: KullaniciAdi,
        },
        {
          Email: KullaniciAdi,
        },
      ],
    },
    (err, user) => {
      if (err) throw err;
      console.log(user);
      if (!user) {
        res.json({
          data: '',
          status: 204,
          message: 'KullaniciAdi or Sifre Wrong',
          error: '',
          message_tr: 'Kullanıcı Adı veya Şifre yanlış',
        });
      } else {
        bcrypt.compare(Sifre, user.Sifre).then(result => {
          if (!result) {
            res.json({
              data: '',
              status: 204,
              message: 'KullaniciAdi or Sifre Wrong',
              error: '',
              message_tr: 'Kullanıcı Adı veya Şifre yanlış',
            });
          } else if (user.isMailConfirmed === false) {
            res.json({
              data: '',
              status: 204,
              message: 'Not Verified mail address',
              error: '',
              message_tr: 'Email onayı gerekli',
            });
          } else {
           
            const id= user._id
            const payload = {
              KullaniciAdi,
             id
            };
            console.log('KEREMuserID payloada',payload)

            const token = jwt.sign(payload, req.app.get('api_secret_key'), {
              expiresIn: '3655d',
            });
            res.json({
              status: 200,
              data: token,
              message: 'Auth approved',
              error: '',
              message_tr: 'Giriş Başarılı',
              user,
              success:true
            });
          }
        });
      }
    },
  );
});
//Kayıt olma
router.post('/userRegister', (req, res, next) => {
  const {
    KullaniciAdi,

    Email,
    Sifre,
    Kilo,
    Boy,
    Yas,
    Aile,
    NeKadardir,
    Cinsiyet,
    Alkol,
    Sigara,
    Meslek,
    MedeniDurum
  } = req.body;
  bcrypt.hash(Sifre, 10).then(hash => {
    const user = new User({
      KullaniciAdi,
      Sifre,
      Email,
      Sifre: hash,
      Kilo,
      Boy,
      Yas,
      Aile,
      NeKadardir,
      Cinsiyet,
      Alkol,
      Sigara,
      Meslek,
      MedeniDurum
    });
    User.findOne(
      {
        Email,
      },
      (err, user) => {
        if (user) {
          res.json({
            data: '',
            status: 204,
            message: 'Email Already Exist',
            error: err,
            message_tr: 'Email kayıtlı',
          });
        }
      },
    ).catch(err => {
      res.json({
        data: '',
        status: 204,
        message: 'Email Already Exist ',
        error: err,
        message_tr: 'Email kayıtlı',
      });
    });
    User.findOne(
      {
        KullaniciAdi,
      },
      (err, user) => {
        if (user) {
          res.json({
            data: '',
            status: 204,
            message: 'KullaniciAdi Already Exist',
            error: err,
            message_tr: 'Kullanıcı adı Kayıtlı',
          });
        }
      },
    ).catch(err => {
      res.json({
        data: '',
        status: 204,
        message: 'KullaniciAdi Already Exist ',
        error: err,
        message_tr: 'Kullanıcı adı Kayıtlı',
      });
    });

    const promise = user.save();
    promise.then(data => {
      res.json({
        data: data,
        status: 200,
        message: 'Succesfully registered check your email',
        error: '',
        message_tr: 'Kayıt başarılı, Email adresinizi kontrol ediniz',
      });

      /*
      const payload={
        Username
      };
      const token=jwt.sign(payload,req.app.get('api_secret_key'),{
        expiresIn:'2d'
      });

      const url='http://localhost:3000/confirmemail/'+token;

      const mailOptions={
        from:'krmytr44@gmail.com',
        to:Email,
        subject:'Spordkit Mail onayı',
        text:'Epostanızı onaylamak için tıklayınız '+url
      };
      transporter.sendMail((mailOptions),(error,info)=>{
        if(error){
          console.log('Mail fail');
          res.json({
            data:'',
            status:204,
            message:'Sending mail failed. ',
            error:error,
            message_tr:'Email gönderimi başarısız'
          });

        }else{
          console.log('Mail pass');
          res.json({
            data:'',
            status:204,
            message:'Mail sent. '+info.response,
            error:'',
            message_tr:'Email Gönderildi'
          })

        }
      });
    }).catch((err)=>{
      res.json({
        data:'',
        status:204,
        message:'Email can not send.',
        error:err,
        message_tr:'Email gönderirken hata oluştu.'
      });
*/
    });
  });
});


module.exports = router;
