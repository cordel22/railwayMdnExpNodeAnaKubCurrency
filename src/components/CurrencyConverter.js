
import { useState } from 'react'
import ExchangeRate from './ExchangeRate'
import axios from 'axios'

const CurrencyConverter = () => {
	const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
	const [ chosenPrimaryCurrency, setChosenPrimaryCurrency ] = useState('BTC')
	const [ chosenSecondaryCurrency, setChosenSecondaryCurrency ] = useState('BTC')
	const [amount, setAmount] = useState(1)
	//	const [exchangeRate, setExchangeRate] = useState(0)
	/*
	const [primaryCurrencyExchanged, setPrimaryCurrencyExchanged] = useState('BTC')
	const [secondaryCurrencyExchanged, setSecondaryCurrencyExchanged] = useState('BTC')
	*/
	const [exchangedData, setExchangedData] = useState({
		primaryCurrency: 'BTC',
		secondaryCurrency: 'BTC',
		exchangeRate: 0
	})
	const [result, setResult] = useState(0)
  
  console.log(chosenPrimaryCurrency)
   
  console.log(chosenSecondaryCurrency)
  
  console.log(amount)
  
  const convert = () => {
	  
/*
const options = {
  method: 'GET',
  url: 'https://alpha-vantage.p.rapidapi.com/query',
  params: {
    interval: '5min',
    function: 'TIME_SERIES_INTRADAY',
    symbol: 'MSFT',
    datatype: 'json',
    output_size: 'compact'
  },
  headers: {
    'X-RapidAPI-Key': '1bedd33a7bmsh412773e47664cc3p19bb9djsn252c65851c22',
    'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
*/
const options = {
  method: 'GET',
  /* url: 'https://alpha-vantage.p.rapidapi.com/query', */
  url: 'http://localhost:8000/convert',
  params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
  /*
  headers: {
    'X-RapidAPI-Key': '1bedd33a7bmsh412773e47664cc3p19bb9djsn252c65851c22',
    'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
  }	*/
};

axios.request(options).then((response) => {
	console.log(response.data);
	/* console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']); */
	//	setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
	setResult(response.data/* ['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount */)
	//	setPrimaryCurrencyExchanged(chosenPrimaryCurrency)
	//	setSecondaryCurrencyExchanged(chosenSecondaryCurrency)
	setExchangedData({
			primaryCurrency: chosenPrimaryCurrency,
		secondaryCurrency: chosenSecondaryCurrency,
		exchangeRate: response.data/* ['Realtime Currency Exchange Rate']['5. Exchange Rate'] */
	})
}).catch((error) => {
	console.error(error);
});
  }
  
  return (
    <div className="currency-converter">
		
		<h2>CurrencyConverter</h2>
		<div>
			<table className="input-box">
				<tbody>
					<tr>
						<td>Primary Currency</td>
						<td>
							<input
								type="number"
								name="currency-amount-1"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
							/>
						</td>
						<td>
							<select
								value={chosenPrimaryCurrency}
								name="currency-option-1"
								className="currency-options"
								onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
							>
							{currencies.map( (currency, _index) => (<option key={_index}>{currency}</option>))}
							</select>
						</td>
					</tr>
					<tr>
						<td>Secondary Currency</td>
						<td>
							<input
								type="number"
								name="currency-amount-2"
								value={result}
								disabled={true}
							/>
						</td>
						<td>
							<select
								value={chosenSecondaryCurrency}
								name="currency-option-2"
								className="currency-options"
								onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
							>
							{currencies.map( (currency, _index) => (<option key={_index}>{currency}</option>))}
							</select>
						</td>
					</tr>
				</tbody>
			</table>
			
			<button id="convert-button" onClick={convert}>Convert</button>
		</div>
		<ExchangeRate 
			//	exchangeRate = {exchangeRate}
			exchangedData = {exchangedData}
			//	chosenPrimaryCurrency={primaryCurrencyExchanged}
			//	chosenSecondaryCurrency={secondaryCurrencyExchanged}
		/>
    </div>
  );
}

export default CurrencyConverter;
