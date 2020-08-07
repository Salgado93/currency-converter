import React from "react";
import { useEffect } from "react";
import "./App.css";
import CurrencyRow from "./components/CurrencyRow";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    document.title = "Convertidor de Moneda";
  }, []);
  return (
    <div className="page-container">
      <div className="content-wrap">
        <h1>Convertir</h1>
        <CurrencyRow />
        <div>=</div>
        <CurrencyRow />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
