# -*- coding: utf-8 -*-
"""
Created on Sat Apr 16 02:12:16 2016

@author: jihunkim
"""

import requests
import json
import os 

u_a = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36"

player_ids_url = 'http://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2015-16&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight='

response = requests.get(player_ids_url, headers={"USER-AGENT":u_a})

headers = response.json()['resultSets'][0]['headers']
player_ids = response.json()['resultSets'][0]['rowSet']

#player id, player name, team id, team abbreviation, fg%, rebounds, assists, points
players = map(lambda x : (x[0], x[1].encode('utf'), x[2], x[3].encode('utf'), x[12], x[21], x[22], x[29]), player_ids)

url = 'http://stats.nba.com/stats/shotchartdetail?Period=0&VsConference=&LeagueID=00&LastNGames=0&TeamID=0&Position=&Location=&ContextMeasure=FGA&DateFrom=&StartPeriod=&DateTo=&OpponentTeamID=0&ContextFilter=&RangeType=&Season=2014-15&AheadBehind=&EndRange=&VsDivision=&PointDiff=&RookieYear=&GameSegment=&Month=0&ClutchTime=&StartRange=&EndPeriod=&SeasonType=Regular+Season&SeasonSegment=&GameID=&PlayerID=%s&Outcome=%s'

for player in players:
    player_id = str(player[0])
    player_name = player[1].replace(' ','_')
    player_games_all = url % (player_id, '')
    r = requests.get(player_games_all, headers={"USER-AGENT":u_a})
    
    with open('shot_chart_data_15_16/'+player_name+'_all.json','w') as outfile:
        json.dump(r.json(), outfile)

print "done"