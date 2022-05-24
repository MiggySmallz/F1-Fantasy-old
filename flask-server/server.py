from flask import Flask, jsonify
from wsgiref.validate import validator
import numpy as np
import pandas as pd
import matplotlib
import matplotlib.pyplot as plt
from matplotlib.collections import LineCollection
from matplotlib import cm
import fastf1
from fastf1.core import Laps
from fastf1 import utils
from fastf1 import plotting
plotting.setup_mpl()
from timple.timedelta import strftimedelta

from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
 

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+file_path
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy()
# db.init_app(app)

# @app.after_request
# def after_request(response):
#   response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#   response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#   response.headers.add('Access-Control-Allow-Credentials', 'true')
#   return response





@app.route("/drivers")
# @cross_origin()

def drivers():
    fastf1.Cache.enable_cache('C:/Users/mnobr/Desktop/Projects/F1 Fantasy/flask-server/cache')

    abu_dhabi_race = fastf1.get_session(2022, 'Australia', 'R')

    abu_dhabi_race.load()

    abu_dhabi_race.results.Q1 = abu_dhabi_race.results.Q1.astype(object).where(abu_dhabi_race.results.Q1.notnull(), None)
    abu_dhabi_race.results.Q2 = abu_dhabi_race.results.Q2.astype(object).where(abu_dhabi_race.results.Q2.notnull(), None)
    abu_dhabi_race.results.Q3 = abu_dhabi_race.results.Q3.astype(object).where(abu_dhabi_race.results.Q3.notnull(), None)
    abu_dhabi_race.results.Time = None


    a_dictionary = {}
    
    for title in abu_dhabi_race.results.to_dict():
        if title!="DriverNumber":
            for driverNumber in abu_dhabi_race.results["DriverNumber"].tolist():
                if driverNumber not in a_dictionary:
                    a_dictionary[driverNumber] = [str(abu_dhabi_race.results[title][driverNumber])]
                else:
                    a_dictionary[driverNumber] += [str(abu_dhabi_race.results[title][driverNumber])]



        # print(abu_dhabi_race.results["DriverNumber"].tolist().index(i))
        # 
    
    # print(a_dictionary)


    # return jsonify(result= [abu_dhabi_race.results.to_dict()], columns = abu_dhabi_race.results.columns.tolist())  
    return jsonify(result= [abu_dhabi_race.results.to_dict()])
    # return jsonify(result= list(abu_dhabi_race.results.to_dict().values()))


    # return jsonify(result = list(abu_dhabi_race.results.to_dict().items()))


if __name__ == "__main__":
    app.run(debug=True)

# abu_dhabi_race.load();
# laps_r = abu_dhabi_race.laps


# driver1 = 'PER'
# driver2 = 'VER'

# ham_fastest_lap = laps_r.pick_driver(driver1).pick_fastest()
# ham_car_data = ham_fastest_lap.get_car_data()
# ver_fastest_lap = laps_r.pick_driver(driver2).pick_fastest()
# ver_car_data = ver_fastest_lap.get_car_data()

# h = ham_car_data['Time']
# v = ver_car_data['Time']

# velocityH = ham_car_data['Speed']
# velocityV = ver_car_data['Speed']
# fig, ax = plt.subplots(figsize=(12,8))
# ax.plot(h, velocityH, label=driver1, color='cyan')
# ax.plot(v, velocityV, label=driver2, color='red')

# ax.set_xlabel('Time')
# ax.set_ylabel('Speed [Km/h]')
# ax.set_title("Hamilton VS Verstappin fastest lap")
# ax.legend()
# plt.show()



