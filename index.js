

const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(cors())

app.get('/', (req, res) => {
	res.json('real mofukkaz')
})

app.get('/convert', (req, res) => {
	const apiUrl = 'https://www.alphavantage.co/query?';
	const toCurrency = req.query.to_currency;
	const fromCurrency = req.query.from_currency;
	//	const toCurrency = 'JPY';
	//	const fromCurrency = 'USD';
	const apiKey = '1bedd33a7bmsh412773e47664cc3p19bb9djsn252c65851c22';
	
	
	console.log('toCurrency', toCurrency)
	console.log('fromCurrency', fromCurrency)
	
//	const options = {
//  method: 'GET',
  //	url: 'https://alpha-vantage.p.rapidapi.com/query',
  //	url: 'https://www.alphavantage.co/query?',
  //	params: {from_currency: fromCurrency/* chosenPrimaryCurrency */, function: 'CURRENCY_EXCHANGE_RATE', to_currency: toCurrency/* chosenSecondaryCurrency */},
  //	experiment:
//  ,
  /*
  headers: {
    'X-RapidAPI-Key': '1bedd33a7bmsh412773e47664cc3p19bb9djsn252c65851c22',
    'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
  }
  */
//};

/*axios.request(options)*/
axios.get(apiUrl, {
	params: {
	  function: 'CURRENCY_EXCHANGE_RATE',
	  from_currency: fromCurrency,
	  to_currency: toCurrency,
	  apikey: apiKey
	  }
})
.then((response) => {
	//	res.json(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
	//	console.log(response.data);
	if (response.data && response.data['Realtime Currency Exchange Rate']) {
	  res.json(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
	} else {
	  res.status(500).json({error: 'Invalid API response'});
	}
}).catch((error) => {
	console.error(error);
});
})


app.get('/news', (req, res) => {
	/*	res.json('real mofukkaz')	*/
	const options = {
	  method: 'GET',
	  url: 'https://crypto-news-live3.p.rapidapi.com/news/cryptonews.com',
	  headers: {
		//	'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
		'X-RapidAPI-Key': '1bedd33a7bmsh412773e47664cc3p19bb9djsn252c65851c22',
		'X-RapidAPI-Host': 'crypto-news-live3.p.rapidapi.com'
	  }
};

axios.request(options).then((response) => {
	/* console.log(response.data);
	setArticles(response.data) */
	res.json(response.data)
	
}).catch((error) => {
	console.error(error);
});
})



//	app.listen(process.env.PORT || 8000, () => console.log(`Server is running on port ${process.env.PORT || PORT}`))

module.exports = app;
