const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

router.get('/getUserDetails/:user_id', (req, res, next) => {
  const promise = User.findById(req.params.user_id);
  promise
    .then(user => {
      if (!user)
        res.json({
          data: '',
          status: 204,
          message: 'UserRoutes not found',
          error: '',
          message_tr: 'Kullanıcı Detayı Bulunmadı',
        });
      res.json({
        data: user,
        status: 200,
        message: 'UserRoutes Detail pass',
        error: '',
        message_tr: 'Kullanıcı Detayı',
      });
    })
    .catch(err => {
      res.json({
        data: '',
        status: 204,
        message: 'UserRoutes Detail failed',
        error: err,
        message_tr: 'Kullanıcı Detayı Başarısız',
      });
    });
});

router.post('/setsf12/', (req, res, next) => {
 
  const {Sf12Puan, token} = req.body;
  console.log('sf12 body',req.body)
  var userID = '';
  jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
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
      user.Sf12Puan = Sf12Puan;
      console.log(user.Sf12Puan);
      user.save().then(() => {
        console.log('Sf12Puan güncellendi ' + Sf12Puan);
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
router.post('/setmidas', (req, res, next) => {
  const {MidasPuan, token} = req.body;
  var userID = '';
  jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
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
          message: 'MidasPuan  not found',
          error: '',
          message_tr: 'MidasPuan kullanıcı bulunamadı.',
        });
      user.MidasPuan = MidasPuan;
      console.log(user.MidasPuan);
      user.save().then(() => {
        console.log('MidasPuan güncellendi ' + MidasPuan);
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
router.post('/setuykusuzluk', (req, res, next) => {
  const {UykusuzlukPuan, token} = req.body;
  var userID = '';
  jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
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
      user.UykusuzlukPuan = UykusuzlukPuan;
      console.log(user.UykusuzlukPuan);
      user.save().then(() => {
        console.log('UykusuzlukPuan güncellendi ' + UykusuzlukPuan);
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
router.post('/setanksiyeteDepresyon', (req, res, next) => {
  const {AnksiyetePuan, DepresyonPuan, token} = req.body;
  var userID = '';
  jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
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
      user.AnksiyetePuan = AnksiyetePuan;
      user.DepresyonPuan = DepresyonPuan;

      user.save().then(() => {
        console.log('Anksiyete DepresyonPuan güncellendi ' + AnksiyetePuan);
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
  

 
router.post('/setUk', (req, res, next) => {
  const {UKisaFormPuan, token} = req.body;
  var userID = '';
  jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
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
          message: 'UKisaFormPuan  not found',
          error: '',
          message_tr: 'UKisaFormPuan kullanıcı bulunamadı.',
        });
      user.UKisaFormPuan = UKisaFormPuan;
      console.log(user.UKisaFormPuan);
      user.save().then(() => {
        console.log('UKisaFormPuan güncellendi ' + MidasPuan);
      });

      res.json({
        data: user,
        status: 200,
        message: 'Set UKisaFormPuan  pass',
        error: '',
        message_tr: 'UKisaFormPuan tamam',
      });
    })
    .catch(err => {
      res.json({
        data: '',
        status: 204,
        message: 'UKisaFormPuan  failed',
        error: err,
        message_tr: 'Kullanıcı UKisaFormPuan Başarısız',
      });
    });
});

router.post('/addBasagrisi', (req, res, next) => {
  const { token} = req.body;
  var userID = '';
  jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
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

  const {
    agriTipleri,
    tetikleyiciler,
    ilaclar,
    agriYerleri,
    semptomlar,
  } = req.body;
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
          message: 'Update UserRoutes not found',
          error: '',
          message_tr: 'Güncellenecek kullanıcı bulunamadı.',
        });

      let MigrenGunlugu = {
        agriTipleri,
        tetikleyiciler,
        ilaclar,
        agriYerleri,
        semptomlar,
      };
      console.log('MigrenGunlugu', MigrenGunlugu);
      user.MigrenGunlugu.push(MigrenGunlugu);
      console.log('User', user);

      user.save().then(() => {
        console.log('günlük kayıt');
      });

      res.json({
        data: user,
        status: 200,
        message: 'Update UserRoutes pass',
        error: '',
        message_tr: 'Kullanıcı Güncelleme',
      });
    })
    .catch(err => {
      res.json({
        data: '',
        status: 204,
        message: 'Update UserRoutes failed',
        error: err,
        message_tr: 'Kullanıcı Güncelleme Başarısız',
      });
    });
});

module.exports = router;
