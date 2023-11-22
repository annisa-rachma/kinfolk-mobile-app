const BASE_URL_USER = process.env.USER_URL || "http://localhost:4001"
const BASE_URL_PRODUCT = process.env.APP_URL || "http://localhost:4002"

console.log('masuk')

module.exports = {BASE_URL_PRODUCT, BASE_URL_USER}