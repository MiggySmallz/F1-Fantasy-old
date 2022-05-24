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

import json



def raceStats():
    fastf1.Cache.enable_cache('C:/Users/mnobr/Desktop/Projects/F1 Fantasy/flask-server/cache')

    abu_dhabi_race = fastf1.get_session(2022, 'Australia', 'R')

    abu_dhabi_race.load()

    abu_dhabi_race.results.Q1 = abu_dhabi_race.results.Q1.astype(object).where(abu_dhabi_race.results.Q1.notnull(), None)
    abu_dhabi_race.results.Q2 = abu_dhabi_race.results.Q2.astype(object).where(abu_dhabi_race.results.Q2.notnull(), None)
    abu_dhabi_race.results.Q3 = abu_dhabi_race.results.Q3.astype(object).where(abu_dhabi_race.results.Q3.notnull(), None)
    
    # print(abu_dhabi_race.results.columns.tolist())
    # for title in abu_dhabi_race.results.columns.tolist():
    #     print(abu_dhabi_race.results[title].tolist())

    
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
    
    

    rows = []
    for index, row in abu_dhabi_race.results.values.tolist().iterrows():
        rows.append({
                'customer': row['customer'],
                'item1': row['item1'],
                'item2': row['item2'],
                'item3': row['item3'],
                })

    print(rows)




    
 



    

raceStats()




