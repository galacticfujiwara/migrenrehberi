const mongoose = require('mongoose');
require('mongoose-type-email');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const dateFormat = require('dateformat');
const now = new Date();
const UserSchema = new Schema({
  KullaniciAdi: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  Sifre: {
    type: String,
    minlength: 3,
    maxlength: 75,
  },
  Email: {
    type: String,
    minlength: 1,
    maxlength: 75,
    unique: true,
  },
  Kilo: Number,
  Boy: Number,
  Yas: Number,
  Aile: {
    type: String,
    minlength: 1,
    maxlength: 75,
  },
  NeKadardir: {
    type: String,
    minlength: 1,
    maxlength: 75,
  },
  Alkol: {
    type: String,
    minlength: 1,
    maxlength: 75,
  },
  Sigara: {
    type: String,
    minlength: 1,
    maxlength: 75,
  },
  Meslek: {
    type: String,
    minlength: 1,
    maxlength: 75,
  },
  MedeniDurum: {
    type: String,
    minlength: 1,
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
      Baslangic: String,
      Bitis: String,
      created_date: {type: String, default: dateFormat(now, 'dd/mm/yyyy')},
    },
  ],
  EgzersizGunlugu: [
    {
      EgzersizYaptim: String,
      created_date: {type: String, default: dateFormat(now, 'dd/mm/yyyy')},
    },
  ],

  Cinsiyet: String,
});
UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('users', UserSchema);
