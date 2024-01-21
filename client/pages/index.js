import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [cryptos, setCryptos] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [sourceCrypto, setSourceCrypto] = useState('');
  const [amount, setAmount] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {

    axios.get('https://nextjscurrency.onrender.com/cryptocurrencies')
      .then(response => setCryptos(response.data))
      .catch(error => console.error('Error fetching cryptocurrencies:', error));


    const countryCurrencies = [
      'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'INR', 'AUD', 'CAD', 'SGD', 'NZD', 'CHF',
      'SEK', 'NOK', 'DKK', 'HKD', 'KRW', 'TRY', 'ZAR', 'BRL', 'RUB', 'MXN', 'IDR',

    ];

    setCurrencies(countryCurrencies);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();


    axios.get('https://nextjscurrency.onrender.com/convert', {
      params: {
        sourceCrypto,
        amount,
        targetCurrency,
      },
    })
      .then(response => setConvertedAmount(response.data.convertedAmount))
      .catch(error => console.error('Error converting currency:', error));
  };

  return (
    <div className={styles.body}>
      <h4 className={styles.h4}> Made By Shivani Mhatre</h4>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>DIGITAL CURRENCY CONVERTOR</h2>
          <label className={styles.label}>
            Amount:
            <input className={styles.input} type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </label>
          {/* <br /> */}
          <label className={styles.label}>
            Cryptocurrency:
            <select className={styles.select} value={sourceCrypto} onChange={(e) => setSourceCrypto(e.target.value)}>
              <option value="">Select</option>
              {cryptos.map(crypto => (
                <option key={crypto.id} value={crypto.id}>{crypto.name} ({crypto.symbol})</option>
              ))}
            </select>
          </label>
          {/* <br /> */}

          

          <label className={styles.label}>
            Target Currency:
            <select className={styles.select} value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </label>
          <br />

          <button className={styles.button} type="submit">Convert</button>
        </form>

        {convertedAmount !== null && (
          <div className={styles.converted-amount}>
            <h2 className={styles.h2}>Converted Amount:</h2>
            <p className={styles.p}>{convertedAmount} {targetCurrency}</p>
          </div>
        )}
      </div>
        
        
    </div>
  );
}

