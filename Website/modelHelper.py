import pandas as pd
import datetime
import time
import pickle
import numpy as np

class ModelHelper():
    def __init__(self):
        pass

    def makePredictions(self, poke1, poke2):
        df = pd.read_json('static/data/pokemon_datatable.json')
        cols = ['base_total', 'against_poison', 'defense', 'against_grass', 'against_ice', 'Ability__Chlorophyll',
                'against_fairy', 'Ability__Swift Swim', 'against_ground', 'attack', 'against_dark', 'Ability__Overgrow',
                'Ability__Levitate', 'against_water', 'against_rock', 'against_flying', 'hp', 'speed',
                'Ability__Pressure', 'against_fight', 'Ability__Other', 'Ability__Torrent', 'against_fire',
                'Abilities_Counts', 'against_psychic', 'against_bug', 'Ability__Swarm', 'against_ghost',
                'against_steel', 'sp_attack', 'against_dragon', 'Ability__Keen Eye', 'Ability__Sturdy',
                'against_electric', 'Ability__Blaze', 'Ability__Intimidate', 'sp_defense', 'against_normal']
        poke1_data = df.loc[df.pokedex_number == poke1, cols].reset_index(drop=True)
        poke2_data = df.loc[df.pokedex_number == poke2, cols].reset_index(drop=True)
        inp = pd.merge(poke1_data, poke2_data, left_index=True, right_index=True, suffixes=['_1', '_2'])
        filename = 'pokemon-battle-model.sav'
        xgb_load = pickle.load(open(filename, 'rb'))
        boost = xgb_load.booster_
        features = boost.feature_name()
        inp = inp.loc[:, features]
        rtn = xgb_load.predict_proba(inp)
        rtn = rtn.tolist()
        rtn = rtn[0]
        print(rtn[0])
        return (rtn[1])