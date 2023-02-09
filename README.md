# CON.3.0 -- OptionsCryptoTrade

## backend -python

> - FairPrice
> - Arbitrage
> - Indicator

### FairPrice

> 1. Use Deribit API
>
> - get_book_summary_by_currency [instrument_name]
> - get_index [currency_price]
> - get_volatility_index_data [DVOL]
>
> 2. Calcuation formula
>
> ```python
>  # FAIR PRICE FORMULAS
>  d3 = ((np.log(CLOSE / STRIKE)) / (sigma * np.sqrt(T))) - (0.5 * sigma * np.sqrt(T))
>
>  # FINALLY CALCULATING FAIR PRICES FOR CALL AND PUTS
>  price_call = (norm.cdf(d3) - (STRIKE / CLOSE) * np.exp(sigma * sigma * T) * norm.cdf(d3 - (sigma * np.sqrt(T)))) * CLOSE
>  price_put = (((STRIKE / CLOSE) * np.exp(sigma * sigma * T) * norm.cdf(-d3 + (sigma * np.sqrt(T))) - norm.cdf(-d3))) * CLOSE
> ```
>
> | Name      | Description                                                                                                                                                                      |
> | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | Close     | The current price                                                                                                                                                                |
> | Strike    | Estimated delivery price for the market.                                                                                                                                         |
> | T         | Estimated delivery time for the market.                                                                                                                                          |
> | DVOL      | Candles as an array of arrays with 5 values each. The inner values correspond to the timestamp in ms, open, high, low, and close values of the volatility index correspondingly. |
> | PriceCall | The result for call options                                                                                                                                                      |
> | PricePut  | The result for put options                                                                                                                                                       |
>
> 3. RESULT
>
> - **_IF FairPrice < bid == SHORT_**
> - **_IF FairPrice > bid == LONG_**

### Arbitrage

> 1. Use Deribit API
>
> - get_book_summary_by_currency [instrument_name]
> - get_index [currency_price]
> - get_volatility_index_data [DVOL]
>
> 2. Calcuation formula
>
> ```python
>  # ARB FORMULAS
>  Sarb = (STRIKE * (1 - 0.001)) / (1 + AskPut - BidCall + (2 * 0.0002) + (0.0002 + 0.0005))
>  Profit = STRIKE + (BidCall - AskPut' - 1 - (2 * 0.0002) - 0.0002 - 0.0005) * (Price / (1 - 0.001))
>  ARB = (Profit / Price) * 100
>  AR = ARB / ExpiryDay
> ```
>
> | Name      | Description                              |
> | :-------- | :--------------------------------------- |
> | Price     | The current price                        |
> | Strike    | Estimated delivery price for the market. |
> | Profit    | Ideal reward                             |
> | Sarb      | Ideal purchase price                     |
> | BidCall   | The current best bid price               |
> | AskPut    | The current best ask price               |
> | ExpiryDay | Estimated delivery time for the market   |

### Indicator (MACD \ RSI BBAND ....)

> 1. Use TradingView API get the result

## server - node.js

> 1. connect python & React
>
> 2. User Authentication
>
> - Password Login
> - Email Code
> - Cookie state

## fontend - React

> 1. tailwindcss
> 2. MUI / ANTD
> 3. 3D Model (Spline)

## database - mongodb

## API

> 1. Deribit
> 2. TradingView
> 3. CoinBase
