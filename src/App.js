// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

const host = "api.frankfurter.app";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState("output");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      async function getRate() {
        setIsLoading(true);
        const res = await fetch(
          `https://${host}/latest?amount=${amount}&from=${from}&to=${to}`
        );
        const data = await res.json();
        setResult(data.rates[to]);
        setIsLoading(false);
      }
      if (from === to) return setResult(amount);
      getRate();
    },
    [host, amount, from, to]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={isLoading}
      />
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {result} {to}
      </p>
    </div>
  );
}
