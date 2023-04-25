const JWT_CODE = 'Kodzima';
const URL_REGEX = /(http|https):\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const NAME_EN_REGEX = /^[a-zA-Z0-9 ]+$/;
const NAME_RU_REGEX = /^[а-яА-ЯёЁ0-9 ]+$/;
const MONGO_ADRESS = 'mongodb://127.0.0.1/bitfilmsdb';

module.exports = {
  JWT_CODE,
  URL_REGEX,
  NAME_EN_REGEX,
  NAME_RU_REGEX,
  MONGO_ADRESS,
};
