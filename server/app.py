from flask import Flask, jsonify, request, render_template
import pandas as pd
from Strategy import FR
from Strategy import ARB
from Strategy import BasicStrategy as BS

app = Flask(__name__)
print('running')

# test data
stores = [{
    'name': 'My Store',
    'items': [{'name': 'my item', 'price': 15.99}]
}]
# get /store test


@app.route('/store')
def get_stores():
    return jsonify({'stores': stores})


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/FR/<string:symbol>/<string:date>/<string:level>')
def get_strategies(symbol, date, level):

    dates = FR.get_Date(symbol, level)
    df = FR.INV(symbol, date)
    dvol = FR.get_DVOL(symbol)
    # if strategy == 'FR':
    #     df = FR.FairPrice(symbol, date)
    # else:
    #     df = FR.INV(symbol, date)
    try:
        DF = df[0].fillna(value=0)
        TD = DF.to_dict('records')
    except Exception as e:
        TD = []
    return jsonify({'df': TD, 'dates': dates, 'expiry': df[1],'dvol':dvol})


@app.route('/ARB/<string:symbol>/<string:date>/<string:exchange>/<string:level>')
def get_arb(symbol, date, exchange, level):

    dates = FR.get_Date(symbol, level)

    df = ARB.get_ARB(symbol, date, exchange)

    dvol = FR.get_DVOL(symbol)

    try:
        DF = df[0].fillna(value=0)
        TD = DF.to_dict('records')
    except Exception as e:
        TD = []
    return jsonify({'df': TD, 'dates': dates, 'expiry': df[1],'dvol':dvol })


@app.route('/BASIC/<string:symbol>/<string:exchange>/<string:interval>')
def get_basic(symbol, exchange, interval):
    # try:
    data = BS.bs(symbol, exchange, interval)

    # except Exception as e:
    #     data = ['err', 'err']

    return jsonify({'analysis': data[0], 'summary': data[1]})


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)
