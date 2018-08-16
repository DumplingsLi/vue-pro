let express = require('express')

let port = 8080

let app = express()

let router = express.Router()
router.get('/', (req, res, next) => {
  req.url = '/index.html'
  next()
})

app.use(router)

let orderStoreList = require('./data/store.json')
let userList = require('./data/userList.json')
let goodsList = require('./data/goods.json')
let ratings = require('./data/ratings.json')
let seller = require('./data/seller.json')
let find = require('./data/find.json')


let routes = express.Router()


routes.get('/home', (req, res) => {
  res.json(orderStoreList)
})
routes.get('/order', (req, res) => {
    res.json(orderStoreList)
  }),
routes.get('/login', (req, res) => {
    res.json(userList)
  })
routes.get('/find', (req, res) => {
  res.json(find)
})
routes.get('/goods/:id', (req, res) => {
  res.json(goodsList)
})
routes.get('/goods/:id/orderpage', (req, res) => {
  res.json(goodsList)
})
routes.get('/goods/:id/ratings', (req, res) => {
  res.json(ratings)
})
routes.get('/goods/:id/seller', (req, res) => {
  res.json(seller)
})

app.use('/', routes)

app.use(express.static('./dist'))

module.express = app.listen(port, (err) => {
  if (err) throw err
  console.log('http://localhost:' + port + '\n');
})
