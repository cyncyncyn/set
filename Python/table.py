####! /usr/bin/python
# -*- coding: utf-8 -*-
#
# Copyright 2014 Giménez, Christian
#
# Author: Giménez, Christian   
#
# table.py
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

'''
Table

I represent a table where the cards are showed to the Player.
'''

class Table(object) :

    def __init__(self):
        self.__cards = []
    
    def getCards():
        '''
        What cards do I have?
        '''
        return self.__cards

    def addCard(card):
        '''
        Put the card in the table.
        '''
        self.__cards.append(card)

    def addCards(lst_cards):
        '''
        Add all these cards to the table.
        '''
        for elt in lst_cards:
            self.addCard(elt)

