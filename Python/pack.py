####! /usr/bin/python
# -*- coding: utf-8 -*-
#
# Copyright 2014 Giménez, Christian
#
# Author: Giménez, Christian   
#
# Pack.py
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

from card import *

'''
Pack

A Pack of cards.
'''

class Pack(object):
    
    def __init__(self):
        '''
        Create the instance, initialize and fill().
        '''
        self.__cards = []
        fill()
        
    def fill(self):
        '''
        Fill me with Cards.
        '''
        for form in Card.forms:
            for num in Card.nums:
                for fill in Card.fills:
                    for color in Card.colors:
                        c = Card(form,color,num,fill)
                        self.__cards.append(c)
    
    def count(self):
        '''
        How much Cards do I have?
        '''
        return self.__cards.count()


    def shuffle(self):
        '''
        Shuffle the cards.

        TODO !!!
        '''
        # TODO!
        return True

    def takeTop(self):
        '''
        Return the top of the Pack and take it out.

        Do you remember pop() from a stack? this is the same! :-P
        '''
        return self.__cards.pop()

    def __contains__(self, card):
        return card in self.__cards
     
    # 
    # I don't feel this is right to add, you're cheating! :-P
    #
    # def __getitem__(self,i):
    #     return self.__cards[i]
        
    def __str__(self):
        return "Pack with " + self.__cards.count() + " card(s)"
