import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";

// import { Link } from "react-router-dom";
// import { MenuOutlined } from "@ant-design/icons";

const Content = () => {
  const arbCode = `
# Python
def Arb():
  Sarb = STRIKE * (1 - 0.001)) 
    / (1 + AskPut - 'BidCall 
    + (2 * 0.0002) + (0.0002 + 0.0005))

  Profit = STRIKE +
    (BidCall - AskPut - 1 
    - (2 * 0.0002)
    - 0.0002 - 0.0005) 
    * (Price / (1 - 0.001))

  ARB = ( Profit / Price ) * 100
  AR =  ARB  / ExpiryDay `;

  const putCallParty = `
def Put_Call_Parity():
    

  C + PV(x) = P + S

    `;
  const fpCode = `
# Python
import numpy as np
from scipy.stats import norm

def Fair Price():
  # FAIR PRICE FORMULAS
  d3 = ((np.log(CLOSE / STRIKE)) 
    / (sigma * np.sqrt(T))) 
    - (0.5 * sigma * np.sqrt(T))

  #  FINALLY CALCULATING FAIR PRICES 
  ## FOR CALL & PUT
  price_call = (norm.cdf(d3)
    - (STRIKE / CLOSE) 
    * np.exp(sigma * sigma * T)
    * norm.cdf(d3 
    * - (sigma * np.sqrt(T)))) * CLOSE

  price_put = (((STRIKE / CLOSE)
    * np.exp(sigma * sigma * T)
    * norm.cdf(-d3 + (sigma * np.sqrt(T))) 
    * -norm.cdf(-d3))) * CLOSE`;

  // const [data, setData] = useState(c1);

  return (
    <div className="xs:w-full">
      <div className="text-white ml-5 divide-y-4 divide-slate-400/25 ">
        <div className="w-full h-20" id="1"></div>
        <div className="grid  grid-cols-2 gap-4 xs:grid-cols-1 " id="2">
          <div className="col-start-1 col-end-1 ">
            <p className=" my-5  text-3xl">How options work?</p>
            <p className=" text-xl indent-8 my-5  whitespace-pre-line">
              Several Basic Concepts you should know: A price is fair if both
              the buyer and the seller have zero expected profit. It equals the
              probability-weighted future outcomes. Fair Value of an option is
              equal to its expected payoff at expiration. Difference between the
              Fair and Market price is the expected profit What does the{" "}
              <em>fair price</em> mean? Among many facets of <em>fairness</em>,
              we prefer the one implying that neither party of a trade have an
              advantage over each other As the fair price of an option can be
              calculated, our tool can help our users to scan and find for
              options with not being in their fair price. We calculate fair
              prices and use the arbitrage them.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 xs:grid-cols-1" id="3">
          <div className="col-start-1 col-end-1 ">
            <p className=" my-5  text-3xl">Our Vision</p>
            <p className=" text-xl indent-8 my-5  whitespace-pre-line">
              Our Vision is to create a automatic analysing tool for all
              investors with easy and simple information and choices Buy and
              Sell Strategy Fair Price How to take profit with low risk
              arbitrage by options them.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 my-5 xs:grid-cols-1" id="4">
          <div className="col-start-1 col-end-2  ">
            <p className=" my-5 text-3xl ">
              Four Basic Legs in Options Trading
            </p>

            <table className="table-fixed text-m text-center xs:text-xs">
              <thead className="ml-2">
                <tr>
                  <th className="border border-slate-500 "></th>
                  <th className="border border-slate-500 ">CALL</th>
                  <th className="border border-slate-500 ">PUT</th>
                  <th className="border border-slate-500 ">RISK</th>
                  <th className="border border-slate-500 ">REWARD</th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td className="border border-slate-500 ">LONG</td>
                  <td className="border border-slate-500 text-left">
                    <ul>
                      <li>Holder: Purchase call option</li>
                      <li>Contract: Right to buy underlying contract</li>
                      <li> Market Position: Bullish</li>
                    </ul>
                  </td>

                  <td className="border border-slate-500 text-left">
                    <ul>
                      <li>Holder: Purchase put option</li>
                      <li>Contract: Right to sell underlying asset</li>
                      <li>Market Position: Bearish</li>
                    </ul>
                  </td>
                  <td className="border border-slate-500 ">
                    Limited to Premium
                  </td>
                  <td className="border border-slate-500 ">Unlimited</td>
                </tr>

                <tr>
                  <td className="border border-slate-500 ">SHORT</td>
                  <td className="border border-slate-500 text-left">
                    <ul>
                      <li>Writer: Sell call option</li>
                      <li>Contract: Obligated to sell underlying asset</li>
                      <li> Market Position: Bearish</li>
                    </ul>
                  </td>
                  <td className="border border-slate-500 text-left">
                    <ul>
                      <li>Writer: Sell put option</li>
                      <li>Contract: Obligated to buy underlying asset</li>
                      <li> Market Position: Bullish</li>
                    </ul>
                  </td>
                  <td className="border border-slate-500 ">Unlimited</td>
                  <td className="border border-slate-500 ">
                    Limited to Premium
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 xs:grid-cols-1" id="5">
          <div className="col-start-1 col-end-1 ">
            <p className=" my-5  text-3xl">What is arbitrage ?</p>
            <p className=" text-xl indent-8 my-5  whitespace-pre-line">
              Arbitrage trading is a trading method with much lower risks and
              stable returns than unilateral trading. Low risk of carry trades
              Carry trade portfolios are generally market-neutral or close to
              market-neutral. Market neutrality means that in portfolio
              management, most or even all of the market risk of the portfolio
              is eliminated by means of hedging and other means by
              simultaneously constructing buying and selling positions, so that
              the return of the portfolio is only related to its own
              characteristics, and not affected by it. The impact of overall
              market movements. Arbitrage is a profitable trading method whether
              in a bear market or a bull market. Since carry trades focus on
              changes in relative price levels between two financial assets,
              rather than absolute price levels, carry trade yields are not
              affected by whether the broader market rises or falls. In fact,
              according to the data of foreign and domestic futures markets, the
              profit of arbitrage trading is often proportional to the
              volatility of the market. A more attractive risk/reward ratio an
              arbitrage position can provide a more attractive risk/reward ratio
              relative to a given one-sided position. Although the profit per
              carry trade is not very high, the success rate is high, which is
              the benefit of the limited risk of the spread and the lower
              volatility characteristics. In the long run, only a small number
              of people who make unilateral transactions make a profit, it has
              the characteristics of stable income and low risk, so it has a
              more attractive return/risk ratio. In the process of fierce
              competition between long and short parties holding unilateral
              positions, arbitrageurs can often choose to intervene and make
              profits easily.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 xs:grid-cols-1" id="6">
          <div className=" col-start-1 col-end-1 ">
            <p className=" my-5 text-3xl">Arbitrage equation</p>

            <table className="table-fixed text-xl">
              <thead>
                <tr>
                  <th className="border border-slate-500 ">Name</th>
                  <th className="border border-slate-500 ">Description</th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td className="border border-slate-500 ">Price</td>
                  <td className="border border-slate-500 ">
                    The current price{" "}
                  </td>
                </tr>

                <tr>
                  <td className="border border-slate-500 ">Strike</td>
                  <td className="border border-slate-500 ">
                    Estimated delivery price for the market.
                  </td>
                </tr>

                <tr>
                  <td className="border border-slate-500 ">Profit</td>
                  <td className="border border-slate-500 ">Ideal reward</td>
                </tr>

                <tr>
                  <td className="border border-slate-500 ">Sarb</td>
                  <td className="border border-slate-500 ">
                    Ideal purchase price
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-500 ">BidCall</td>
                  <td className="border border-slate-500 ">
                    The current best bid price, null if there aren't any bids
                  </td>
                </tr>

                <tr>
                  <td className="border border-slate-500 ">AskPut</td>
                  <td className="border border-slate-500 ">
                    The current best ask price , null if there aren't any asks
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-start-2 col-end-2 mt-3 text-sm">
            {/* <p className="my-2  text-3xl" id="4">
            Coding
          </p> */}
            <p className=" text-3xl">Coding</p>
            <Highlight {...defaultProps} code={arbCode} language="py">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 my-2 xs:grid-cols-1">
          <div className="col-start-1 col-end-1 ">
            <p className=" my-5 text-3xl">Put-Call Parity</p>

            <table className="table-fixed text-m">
              <thead>
                <tr>
                  <th className="border border-slate-500 ">Name</th>
                  <th className="border border-slate-500 ">Description</th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td className="border border-slate-500 ">C</td>
                  <td className="border border-slate-500 ">
                    {" "}
                    price of the European call option
                  </td>
                </tr>

                <tr>
                  <td className="border border-slate-500 ">P</td>
                  <td className="border border-slate-500 ">
                    {" "}
                    price of the European put option
                  </td>
                </tr>

                <tr>
                  <td className="border border-slate-500 ">PV(x)</td>
                  <td className="border border-slate-500 ">
                    the present value of the strike price (x), discounted from
                    the value on the expiration date at the risk-free rate
                  </td>
                </tr>

                <tr>
                  <td className="border border-slate-500 ">S</td>
                  <td className="border border-slate-500 ">
                    spot price or the current market value of the underlying
                    asset buy call + sell put + long futures
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid col-start-2 col-end-2 mt-20">
            <Highlight {...defaultProps} code={putCallParty} language="py">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 xs:grid-cols-1" id="7">
          <div className="col-start-1 col-end-1 ">
            <p className=" my-5 text-3xl">Fair Price equation</p>

            <table className="table-fixed text-xl ">
              <thead className="ml-2">
                <tr>
                  <th className="border border-slate-500  ">Name</th>
                  <th className="border border-slate-500 ">Description</th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td className="border border-slate-500 ">Close</td>
                  <td className="border border-slate-500 ">
                    {" "}
                    The current price{" "}
                  </td>
                </tr>

                <tr>
                  <td className="border border-slate-500 ">Strike</td>
                  <td className="border border-slate-500 ">
                    Estimated delivery price for the market
                  </td>
                </tr>

                <tr>
                  <td className="border border-slate-500 ">T</td>
                  <td className="border border-slate-500 ">
                    Estimated delivery time for the market
                  </td>
                </tr>

                <tr>
                  <td className="border border-slate-500 ">DVOL</td>
                  <td className="border border-slate-500 ">
                    Candles as an array of arrays with 5 values each. The inner
                    values correspond to the timestamp in ms, open, high, low,
                    and close values of the volatility index correspondingly.
                  </td>
                </tr>

                <tr>
                  <td className="border border-slate-500 ">Price Call</td>
                  <td className="border border-slate-500 ">
                    The result for call options
                  </td>
                </tr>

                <tr>
                  <td className="border border-slate-500 ">Price Put</td>
                  <td className="border border-slate-500 ">
                    The result for put options
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full sm:col-start-2 sm:col-end-2  my-10 text-sm">
            <Highlight {...defaultProps} code={fpCode} language="py">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 xs:grid-cols-1" id="8">
          <div className="col-start-1 col-end-1 ">
            <p className=" my-5  text-3xl">
              The Probability Calculator Software
            </p>
            <p className=" text-2xl indent-4 mt-5">
              Simulate the probability of making money in your option position.
            </p>
            <p className=" text-xl indent-8   whitespace-pre-line">
              McMillan’s Probability Calculator is low-priced, easy-to-use
              software designed to estimate the probabilities that a stock will
              ever move beyond two set prices—the upside price and the downside
              price—during a given amount of time. The program uses a technique
              known as Monte Carlo Simulation to produce estimates that assess
              the probability of making money in a trade, but can also be used
              by traders to determine whether to purchase or sell stock, stock
              options, or combinations thereof.
            </p>

            <p className=" text-2xl indent-4 mt-5">
              What makes McMillan’s Probability Calculator different?
            </p>
            <p className=" text-xl indent-8   whitespace-pre-line">
              Over a number of trading days, the price of a stock may vary
              widely and still end up at or near the original purchase price.
              Many calculators are available that give the theoretical
              probability that a stock may approach certain values at the end of
              a trading period. In real trading, however, investors are
              following the price of a stock or stock options throughout the
              entire trading period. If the stock, stock options, or combination
              becomes profitable before the end of the trading period (for
              example, before the expiration of some stock options), it is
              reasonable that a trader may decide to reap part or all of those
              profits at that time. The Probability Calculator gives the
              likelihood that prices are ever exceeded during the trading
              period, not just at the end.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
