let url

if(process.env.NODE_ENV === 'development') {
  url = 'http://localhost:8082/api/messages'
}

if(process.env.NODE_ENV === 'production') {
  url = 'https://collective-api-bees.herokuapp.com/api/messages'
}

module.exports = url