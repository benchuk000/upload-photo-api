module.exports = {
  PORT:        process.env.PORT || 4848,
  JWT_SECRET:  process.env.JWT_SECRET || 'secret',
  SALT_FACTOR: process.env.SALT_FACTOR,
  MONGO_URI:   process.env.MONGO_URI || 'mongodb://root:root@ds121565.mlab.com:21565/photo',
 
  AWS_KEY_ID: process.env.AWS_KEY_ID,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY
};