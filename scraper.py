# -*- coding: utf-8 -*-
"""
Created on Sat Apr 16 02:12:16 2016

@author: jihunkim
"""

import requests
import json
import os 
from allstar_reader import getAllStars 

u_a = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36"
#seasons= ['','2011-12', '2012-13', '2013-14', '2014-15', '2015-16']
season_players_map = getAllStars()


temp = ['2015-16']
shots = {} 
for season in season_players_map.keys():
    print season 
    player_ids_url = 'http://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=%s&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight=' % season 
    response = requests.get(player_ids_url, headers={"USER-AGENT":u_a})
    #player id, player name, team id, team abbreviation, fg%, rebounds, assists, points
    print player_ids_url
    unmapped_players = filter(lambda x: x[1] and x[1].encode('utf') in season_players_map[season] , response.json()['resultSets'][0]['rowSet'])
    players = map(lambda x: (x[0], x[1].encode('utf'), x[2], x[3].encode('utf'), x[12], x[21], x[22], x[29]), unmapped_players)
    
    url = 'http://stats.nba.com/stats/shotchartdetail?Period=0&VsConference=&LeagueID=00&LastNGames=0&TeamID=0&Position=&Location=&ContextMeasure=FGA&DateFrom=&StartPeriod=&DateTo=&OpponentTeamID=0&ContextFilter=&RangeType=&Season=%s&AheadBehind=&EndRange=&VsDivision=&PointDiff=&RookieYear=&GameSegment=&Month=0&ClutchTime=&StartRange=&EndPeriod=&SeasonType=Regular+Season&SeasonSegment=&GameID=&PlayerID=%s&Outcome=%s'

    player_map = {} 

    for player in players:
        player_id = str(player[0])
        player_games_all = url % (season, player_id, '')
        r = requests.get(player_games_all, headers={"USER-AGENT":u_a})
        shot_data = r.json()['resultSets'][0]['rowSet']
        shot_data = map(lambda x: (x[17], x[18], x[20]), shot_data)
        player_map[player_id] = [player[1], player[2], player[3], shot_data]
    
    shots[season] = player_map 

with open('dictionary.json', 'w') as writer:
        json.dump(json.dumps(shots), writer)
print "done"