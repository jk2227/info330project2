import csv


def getAllStars(): 
  season_players_map = {}
  players = [] 
  year = 0
  with open('allstar.csv') as csvfile:
    for row in csvfile:
      lst = row.split(',')
      if lst[0] == 'EAST': #extract year
        if year != 0: 
          key = str(int(year)-1)+"-"
          to = int(year) % 100
          if to < 10:
          	key +='0'
          key += str(to)
      	  season_players_map[key] = players 
        players = [] 
        year = lst[2]
      else: 
    	  if lst[0] != '':
    	    players.append(lst[0])
    	  if lst[3] != '':
    	    players.append(lst[3])

  return season_players_map




