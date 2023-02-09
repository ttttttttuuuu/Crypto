from tradingview_ta import *
import re

def bs(symbol, exhcange, interval):
    exchanges = ['BINANCE', 'FTX', 'BYBIT', "KUCOIN"]
    screen = "crypto"
    sc = "BTCUSDT"
    tk = 'BINANCE'
    symbol = re.sub(r"^\s+", "", symbol)
    symbol = symbol.upper()
    handler = TA_Handler(
        symbol=symbol,  # BTCUSDT
        screener=screen,
        exchange=exhcange,  # binance
        interval=interval
    )
    analysis = handler.get_analysis()
    iten = []
    for i in analysis.indicators:
        iten.append(i)
    # print(iten)
    # strategies = ['RSI', 'MACD.macd', 'ADX']
    # for i in strategies:
    #     print("{}:".format(i), round(analysis.indicators[i], 2))

    # print(analysis.indicators)
    # print("Summary:", analysis.summary)

    return analysis.indicators, analysis.summary


# bs('BTCUSDs', 'BINANCE', '1m')
