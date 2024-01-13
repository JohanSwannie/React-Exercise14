import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import CurrencyInput from "./components/CurrencyInput";

function App() {
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState("aud");
  const [to, setTo] = useState("nzd");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyData = useCurrencyInfo(from);
  const options = Object.keys(currencyData);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount((amount * currencyData[to]).toFixed(2));
  };

  const clearAmounts = () => {
    setAmount(0);
    setConvertedAmount(0);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://image.slidesdocs.com/responsive-images/background/exploring-finances-through-a-3d-rendered-calculator-and-money-powerpoint-background_ef6afaa9e4__960_540.jpg)`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-xl mx-auto border-2 border-gray-300 rounded-xl p-12 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full bg-gray-600 text-center border border-white mt-3 mb-5 text-white px-4 py-4 rounded-lg">
              Currency Converter
            </div>
            <div className="w-full mb-10 p-1">
              <CurrencyInput
                label="from"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-gray rounded-md bg-red-600 text-white px-7 py-3.5"
                onClick={swap}
              >
                Swap Them Around
              </button>
            </div>
            <div className="w-full mb-1 mt-10 p-1">
              <CurrencyInput
                label="to"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
                amountDisabled
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 border-2 border-white-600 mt-3 text-white px-4 py-4 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
            <button
              className="bg-blue-500 w-full text-white border-2 border-white-600 hover:bg-blue-900 font-bold py-4 px-4 mt-3 rounded content-center"
              onClick={clearAmounts}
            >
              Clear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
