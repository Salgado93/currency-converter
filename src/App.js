import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import CurrencyRow from "./components/CurrencyRow";
import Footer from "./components/Footer";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromMoneda, setFromMoneda] = useState();
  const [toMoneda, setToMoneda] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [cantidad, setCantidad] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toCantidad, fromCantidad;
  if (amountInFromCurrency) {
    fromCantidad = cantidad;
    toCantidad = cantidad * exchangeRate || 0;
  } else {
    toCantidad = cantidad;
    fromCantidad = cantidad / exchangeRate;
  }
  useEffect(() => {
    document.title = "Convertidor de Moneda";
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const primeraMoneda = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromMoneda(data.base);
        setToMoneda(primeraMoneda);
        setExchangeRate(data.rates[primeraMoneda]);
      });
  }, []);

  useEffect(() => {
    if (fromMoneda != null && toMoneda != null) {
      fetch(`${BASE_URL}?base=${fromMoneda}&symbols=${toMoneda}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toMoneda]));
    }
  }, [fromMoneda, toMoneda]);

  function handleFromAmountChange(e) {
    setCantidad(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(e) {
    setCantidad(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div className="page-container">
      <div className="content-wrap">
        <h2>Cooperativa La Reyna</h2>
        <h2>Convertir</h2>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromMoneda}
          onChangeCurrency={(e) => setFromMoneda(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          cantidad={fromCantidad}
        />
        <div className="equals">=</div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toMoneda}
          onChangeCurrency={(e) => setToMoneda(e.target.value)}
          onChangeAmount={handleToAmountChange}
          cantidad={toCantidad}
        />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
