var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_product',
  password: 'admin',
  port: 5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {
  // pool.query('SELECT NOW()', (err, res) => {
  //   console.log(err, res)
  //   pool.end()
  // });

  res.render('index', { title: 'Express' });
});

router.get('/getData01', function(req, res, next) {

  pool.query('SELECT * from product_info', (err, respone) => {
    res.send(respone.rows);
    // pool.end()
  });
  // res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Express' });
});

router.post('/add', function(req, res, next) {
  const product_name = req.body.product_name;
  const product_price = req.body.product_price;
  const image = req.body.image;

  pool.query("INSERT INTO product_info(product_name, product_price, image) VALUES ($1, $2, $3)",
  [product_name, product_price, image], (err, result)=>{
    if (err) {
      console.log(err);
    } else {
      console.log(result);    
      res.send(result.rowCount);
    }
  });
});

module.exports = router;
