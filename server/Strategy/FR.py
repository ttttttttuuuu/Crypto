import requests
import pandas as pd
from pprint import pprint
from dateutil.parser import parse
import time
import numpy as np
from scipy.stats import norm
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
    time = []
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

    # date_time_obj = datetime.strptime(date[0], '%d%b%y')
    # print(date_time_obj)
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


def CAL(symbol, date):

    DVOL = get_DVOL(symbol)
    PRICE = get_index(symbol)
    DF = get_summary(symbol, date)

    # r = Risk-free interest rate (keep it fixed value at 0.01)
    risk = 0.01

    S = int(PRICE)
    sigma = float(DVOL)
    sigma = sigma / 100

    DF = DF.dropna()

    # index
    DF.reset_index(drop=True, inplace=True)
    # GET THE EXPIRYDAY
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

    a = parse(expiry)
    b = parse(result)
#    要改時間
    ExpiryDay = (((a - b).total_seconds() / 60 / 60)) / 24 / 365

    DF['Expiry'] = ExpiryDay

    strike = []
    for i in DF['instrument']:
        strike.append(int(i.split(('-'))[2]))

    DF['Strike'] = strike
    DF = DF.sort_values(by='Strike')

    FR = []
    size = []
    # r = Risk-free interest rate (keep it fixed value at 0.01)
    risk = 0.01
    # S = Current stock price
    # Pull "S" From DeribitAPI Dashboard/API "Bitcoin Current Price on the top left corner of the dashboard"
    for i in DF['instrument']:
        strike = i.split("-")[2]
        option = i.split("-")[-1]
        if option == 'P':
            size.append('PUT')
        if option == "C":
            size.append('CALL')

        # K = Strike price
        # Pull "K" From DeribitAPI Dashboard/API "Strike"
        K = int(strike)
        T = ExpiryDay

        if K == 0 or sigma == 0:
            FR.append('-')

        # FAIR PRICE FORMULAS
        d1 = (np.log(S / K) + (risk + sigma ** 2 / 2) * T) / \
            (sigma * np.sqrt(T))
        d2 = d1 - sigma * np.sqrt(T)

        # FINALLY CALCULATING FAIR PRICES FOR CALL AND PUTS
        price_call = S * norm.cdf(d1, 0, 1) - K * \
            np.exp(-risk * T) * norm.cdf(d2, 0, 1)
        price_put = K * np.exp(-risk * T) * norm.cdf(-d2,
                                                     0, 1) - S * norm.cdf(-d1, 0, 1)

        if option == "C":
            FR.append(round(price_call, 2))
        elif option == "P":
            FR.append(round(price_put, 2))

    DF['Fair Price'] = FR
    DF['SIZE'] = size
    INV = []

    risk = 0.01
    # S = Current stock price
    # Pull "S" From DeribitAPI Dashboard/API "Bitcoin Current Price on the top left corner of the dashboard"
    for i in DF['instrument']:
        strike = i.split("-")[2]
        option = i.split("-")[-1]
        CLOSE = S
        # K = Strike price
        # Pull "K" From DeribitAPI Dashboard/API "Strike"
        STRIKE = int(strike)

        T = ExpiryDay
        if STRIKE == 0 or sigma == 0:
            INV.append(0.0)

        d3 = ((np.log(CLOSE / STRIKE)) / (sigma * np.sqrt(T))) - \
            (0.5 * sigma * np.sqrt(T))
        # print(d3, STRIKE)
        price_call_INV = (norm.cdf(d3) - (STRIKE / CLOSE) * np.exp(sigma *
                          sigma * T) * norm.cdf(d3 - (sigma * np.sqrt(T)))) * CLOSE

        price_put_INV = (((STRIKE / CLOSE) * np.exp(sigma * sigma * T)
                         * norm.cdf(-d3 + (sigma * np.sqrt(T))) - norm.cdf(-d3))) * CLOSE

        if option == "C":
            INV.append(round(price_call_INV, 2))
        elif option == "P":
            INV.append(round(price_put_INV, 2))

    DF['INV'] = INV

    p = []
    for i in range(0, DF.shape[0]):
        if DF['Fair Price'][i] < DF['bid'][i] * S:
            p.append("SHORT")

        elif DF['Fair Price'][i] > DF['ask'][i] * S:
            p.append("LONG")
        else:
            p.append("WAIT")
    DF['Alert'] = p

    INV_p = []
    for i in range(0, DF.shape[0]):
        if DF['INV'][i] < DF['bid'][i] * S:
            INV_p.append("SHORT")

        elif DF['INV'][i] > DF['ask'][i] * S:
            INV_p.append("LONG")
        else:
            INV_p.append("WAIT")
    DF['Alert_INV'] = INV_p

    Expiry = DF['Expiry'][0] * 365 * 24
    Expiry = round(Expiry, 2)
    #Expiry = '{}hours'.format(Expiry)

    DF = DF[['instrument', 'bid', 'ask',
             'Fair Price', 'INV', 'Alert', 'Alert_INV', 'SIZE']]
    Value = []
    DF = DF.drop(DF[DF['Alert'] == 'WAIT'].index)
    DF.reset_index(drop=True, inplace=True)

    for i in range(0, DF.shape[0]):
        if DF['Alert'][i] == 'LONG':
            FRP = DF['Fair Price'][i] / (S * DF['ask'][i])
            FRP = (FRP - 1) * 100
            FRP = round(FRP, 1)
            Value.append(FRP)
        elif DF['Alert'][i] == 'SHORT':
            FRP = (S * DF['bid'][i]) / DF['Fair Price'][i]
            FRP = (FRP - 1) * 100
            FRP = round(FRP, 1)
            Value.append(FRP)

    DF['Value %'] = Value

    Value_INV = []

    for i in range(0, DF.shape[0]):
        if DF['Alert_INV'][i] == 'LONG':
            FRP2 = DF['INV'][i] / (S * DF['ask'][i])
            FRP2 = (FRP2 - 1) * 100
            FRP2 = round(FRP2, 1)
            Value_INV.append(FRP2)
        elif DF['Alert_INV'][i] == 'SHORT':
            FRP2 = (S * DF['bid'][i]) / DF['INV'][i]
            FRP2 = (FRP2 - 1) * 100
            FRP2 = round(FRP2, 1)
            Value_INV.append(FRP2)
        else:
            Value_INV.append(0.0)

    DF['Value_INV %'] = Value_INV

    pabove = []
    pbelow = []
    for i in range(0, DF.shape[0]):
        strike = int(DF['instrument'][i].split('-')[2])

        data = ab(S, strike, Expiry, sigma)
        pabove.append(data[0])
        pbelow.append(data[1])
    DF['Pbelow %'] = pabove
    DF['Pabove %'] = pbelow
    DF.reset_index(drop=True, inplace=True)
    POP = []
    for i in range(0, DF.shape[0]):

        CP = DF['instrument'][i].split('-')[3]
        strike = int(DF['instrument'][i].split('-')[2])
        if DF['Alert'][i] == 'LONG':

            # BuyCALL
            if CP == 'C':
                BE_BC = strike + (DF['ask'][i]*S)
                abc = ab(S, BE_BC, Expiry, sigma)[1]  # 1：above / 0：below
        # BuyPut
            if CP == 'P':
                BE_BC = strike - (DF['ask'][i] * S)
                abc = ab(S, BE_BC, Expiry, sigma)[0]

        if DF['Alert'][i] == 'SHORT':
            # SellCall
            if CP == 'C':
                BE_BC = strike + (DF['bid'][i] * S)
                abc = ab(S, BE_BC, Expiry, sigma)[0]
        # SellPut
            if CP == 'P':
                BE_BC = strike - (DF['bid'][i] * S)
                abc = ab(S, BE_BC, Expiry, sigma)[1]
        POP.append(abc)
        # print(POP)

    DF['POP'] = POP
    return DF, expiry


CAL("BTC", "14OCT22")


def FairPrice(symbol, date):
    try:
        data = CAL(symbol, date)
        df = data[0]
        df = df[['instrument', 'bid', 'ask', 'Fair Price',
                'Alert', 'Value %', 'Pbelow %', 'Pabove %', 'SIZE']]
        df['id'] = df.index
        df.replace([np.inf, -np.inf], np.nan, inplace=True)
    except Exception as e:
        df = []
    if len(df['instrument']) == 0:
        df = []
    return df, data[1]


def INV(symbol, date):
    try:
        data = CAL(symbol, date)
        df = data[0]
        df = df[['instrument', 'bid', 'ask', 'INV',
                'Alert_INV', 'Value_INV %', 'Pbelow %', 'Pabove %', 'SIZE']]

        df.columns = ['instrument', 'bid', 'ask', 'Fair Price',
                      'Alert', 'Value %', 'Pbelow %', 'Pabove %', 'SIZE']
        df['id'] = df.index
        df.replace([np.inf, -np.inf], np.nan, inplace=True)
    except Exception as e:
        df = []
    if len(df['instrument']) == 0:
        df = []
    return df, data[1]


def ab(price, strike, time, value):
    import math

    p = price
    q = strike
    t = time / 24 / 365
    v = value

    vt = v * math.sqrt(t)
    lnpq = math.log(q / p)
    d1 = lnpq / vt

    y = math.floor(1 / (1 + .2316419 * abs(d1)) * 100000) / 100000
    z = math.floor(.3989423 * math.exp(-((d1 * d1) / 2)) * 100000) / 100000
    y5 = 1.330274 * math.pow(y, 5)
    y4 = 1.821256 * math.pow(y, 4)
    y3 = 1.781478 * math.pow(y, 3)
    y2 = .356538 * math.pow(y, 2)
    y1 = .3193815 * y
    x = 1 - z * (y5 - y4 + y3 - y2 + y1)
    x = math.floor(x * 100000) / 100000

    if d1 < 0:
        x = 1 - x

    pabove = math.floor(x * 1000) / 10
    pbelow = math.floor((1 - x) * 1000) / 10

    return pabove, pbelow


# print(INV("BTC",'14JUN22'))
