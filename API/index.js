const express = require('express')
const app = express();
const fetchCurrencyRate = require("./fetchCurrencyRate");

app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/api/rates', async function(req, res) {
    if(req.query.base && req.query.currency) {
        let response = await fetchCurrencyRate.getRate(req.query);
        res.status(200).json({"results": response});
    }else {
        res.status(400).json('query params must include base and currency');
    }

});

app.listen(3000)