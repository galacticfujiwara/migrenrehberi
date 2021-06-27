const mongoose = require('mongoose');
require('mongoose-type-email');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const dateFormat = require('dateformat');
const now = new Date();
const UserSchema = new Schema({
  KullaniciAdi: {
    type: String,
     
    maxlength: 50,
  },
  Sifre: {
    type: String,
   
    maxlength: 75,
  },
  Email: {
    type: String,

    maxlength: 75,
    unique: true,
  },
  Kilo: Number,
  Boy: Number,
  Yas: Number,
  Aile: {
    type: String,

    maxlength: 75,
  },
  NeKadardir: {
    type: String,

    maxlength: 75,
  },
  Alkol: {
    type: String,

    maxlength: 75,
  },
  Sigara: {
    type: String,

    maxlength: 75,
  },
  Meslek: {
    type: String,

    maxlength: 75,
  },
  MedeniDurum: {
    type: String,
  },
  Sf12Puan: {
    type: String,
  },
  MidasPuan: {
    type: String,
  },
  UykusuzlukPuan: {
    type: String,
  },
  AnksiyetePuan: {
    type: String,
  },
  DepresyonPuan: {
    type: String,
  },
  UKisaFormPuan: {
    type: String,
  },
  MigrenGunlugu: [
    {
      agriTipleri: String,
      tetikleyiciler: String,
      ilaclar: String,
      agriYerleri: String,
      semptomlar: String,
      created_date: {type: String, default: dateFormat(now, 'dd/mm/yyyy')},
    },
  ],

  Cinsiyet: String,
});
UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('users', UserSchema);
