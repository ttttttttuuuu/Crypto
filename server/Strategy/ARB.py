import requests
import pandas as pd
from pprint import pprint
from dateutil.parser import parse
import time
import numpy as np
from scipy.stats import norm
from tradingview_ta import *
from datetime import datetime


def get_Date(currency, level):
    bid = []
    ask = []
    instrument = []
    url = "https://www.deribit.com/api/v2/public/get_book_summary_by_currency"

    params = {

        "currency": currency,
        "kind": "option"
    }

    res = requests.get(url, params=params).json()['result']
    date = []
    for i in range(0, len(res)):
        date.append(res[i]['instrument_name'].split('-')[1])

    date = set(date)
    date = list(date)

    for i in date:
        time.append(datetime.strptime(i, '%d%b%y'))
    df = pd.DataFrame()
    df['date'] = date
    df['time'] = time
    df = df.sort_values(by=['time'])
    df.reset_index(inplace=True, drop=True)
    date = df['date'].tolist()
    if level != 'F':
        date = date[0:3]
    return date


def get_summary(currency, Date):
    bid = []
    ask = []
    instrument = []
    url = "https://www.deribit.com/api/v2/public/get_book_summary_by_currency"

    params = {

        "currency": currency,
        "kind": "option"
    }

    res_BTC = requests.get(url, params=params).json()
    for i in range(0, len(res_BTC['result'])):
        if res_BTC['result'][i]['instrument_name'].split('-')[1] == Date:
            instrument.append(res_BTC['result'][i]['instrument_name'])
            bid.append(res_BTC['result'][i]['bid_price'])
            ask.append(res_BTC['result'][i]['ask_price'])
    df = pd.DataFrame()
    df['instrument'] = instrument
    df['bid'] = bid
    df['ask'] = ask
    return df


def get_index(currency):

    url = "https://www.deribit.com/api/v2/public/get_index?currency="+currency

    res = requests.get(url).json()['result'][currency]
    return res


def get_DVOL(currency):

    url = "https://www.deribit.com/api/v2/public/get_volatility_index_data?currency={}&start_timestamp={}&end_timestamp={}&resolution=1".format(
        currency, int((time.time() - 60)*1000), int(time.time()*1000))
    # params = {
    #     "currency": currency,
    #     "start_timestamp": int(time.time() - 3600),
    #     "end_timestamp": int(time.time()),
    #     "resolution": "1"
    # }
    res = requests.get(url).json()['result']['data'][0][1]

    return res


def get_ARB(symbol, date, exchange):
    DVOL = get_DVOL(symbol)
    PRICE = get_index(symbol)
    DF = get_summary(symbol, date)

    risk = 0.01

    S = int(PRICE)
    sigma = float(DVOL)
    sigma = sigma / 100

    DF = DF.dropna()
    # index
    DF.reset_index(drop=True, inplace=True)

    I = DF['instrument'][0].split('-')[1]
    import datetime
    i = datetime.datetime.strptime(I, '%d%b%y')
    i = str(i)
    i = i.split(' ')[0]
    # print(i)
    expiry = ' 16:00:00'
    expiry = i + expiry

    localtime = time.localtime()
    result = time.strftime("%Y-%m-%d %H:%M:%S", localtime)
    # print(result)

    a = parse(expiry)
    b = parse(result)
#    要改時間
    ExpiryDay = (((a - b).total_seconds() / 60 / 60)-8) / 24 / 365

    DF['Expiry'] = ExpiryDay

    strike = []
    for i in DF['instrument']:
        strike.append(int(i.split(('-'))[2]))

    DF['Strike'] = strike
    DF = DF.sort_values(by='Strike')

    Expiry = DF['Expiry'][0] * 365 * 24
    Expiry = round(Expiry, 2)

    DF = DF[['instrument', 'bid', 'ask']]
    Value = []
    DF.reset_index(drop=True, inplace=True)

    # # GET EXPIRY PRICE
    df2 = DF
    # # GET EXPIRY PRICE
    df3 = df2['instrument'].str.split('-').str.get(2)
    list1 = []
    for i in df3:
        df4 = int(i)
        list1.append(df4)
    df2["STRIKE"] = list1

    # DataClear
    dfFinal = df2[["instrument", "bid", "ask", "STRIKE"]]

    dfCP = dfFinal['instrument'].str.split('-').str.get(3)
    dfFinal["CP"] = dfCP
    print(dfFinal)
    # Option Call
    Call = dfFinal['CP'] == "C"
    dfCall = dfFinal[Call]
    dfCall.rename(columns={
        'bid': 'BidCall',
        'ask': 'AskCall',
    }, inplace=True)

    # Options PUT
    Put = dfFinal['CP'] == "P"
    dfPut = dfFinal[Put]
    dfPut.rename(columns={'bid': 'BidPut',
                          'ask': 'AskPut',
                          }, inplace=True)

    # Combine CALL AND PUT
    DF = pd.merge(dfCall, dfPut, how='left', on=['STRIKE'])
    DF.dropna(axis=0, how='any', inplace=True)
    DF2 = DF[["BidCall", "AskCall", "STRIKE", "BidPut", "AskPut"]]

    if symbol == "BTC":
        s = "BTCUSDT"
    elif symbol == "ETH":
        s = "ETHUSDT"

     # TOTAL
    # for i in exchanges:
    handler = TA_Handler(
        symbol=s,  # BTCUSDT
        screener='crypto',
        exchange=exchange,  # binance
        interval='1m'
    )
    analysis = handler.get_analysis()
    price = analysis.indicators['close']

    # Calculate
    DF2["Sarb"] = (DF2["STRIKE"] * (1 - 0.001)) / (
        1 + DF2['AskPut'] - DF2['BidCall'] + (2 * 0.0002) + (0.0002 + 0.0005))

    DF2['Price'] = price
    DF['Price'] = price

    DF['Profit'] = DF["STRIKE"] + (
        DF['BidCall'] - DF['AskPut'] - 1 - (2 * 0.0002) - 0.0002 - 0.0005) * (
        DF['Price'] / (1 - 0.001))

    DF2['ARB'] = (
        DF['Profit'] / DF['Price']) * 100
    DF2['AR'] = DF2['ARB'] / ExpiryDay
    DF2['AR'] = DF2['AR'].round()
    DF2['id'] = DF2.index
    DF2 = DF2.round({"Sarb": 2, "AR": 2, "ARB": 2})

    return DF2, expiry


# print(get_ARB("BTC", '18MAY22', ["FTX"]))
