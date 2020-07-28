The file rolesAndAssociatedPlaces.txt contains a list a 3 columns list of elements (ex. 0000032:0000002) which should be interpreted as a key:value map.
The first element is the id of one of the game's roles (ex. 0000000 may be the captain of a boat): key.
The second element is ":" and represent the separator that will be used to parse the files inside js (don't name any game place or role with a noun containing this separator). 
The third element is the id of one of the game's scenaries (ex. 0000034 may be a casinò): the value.
If you need to add a scenary you need to add it by adding a role which reference it.
If you need to add a role for an already existing scenary you can go to the bottom of the list and add a new key (which will be the the previous row's key incremented by 1),
separate it with the ":" separator and paste the already existing scenary's id after it.