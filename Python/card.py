####! /usr/bin/python
# -*- coding: utf-8 -*-
#
# Copyright 2014 Giménez, Christian
#
# Author: Giménez, Christian   
#
# card.py
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
Card

I'm just a card :-)
'''

class Card(object) :

    forms = {'oval', 'diamond', 'squiggle'} # See Set(game) at Wikipedia (English)
    nums = {1,2,3}
    colors = {'green', 'red', 'purple'}
    fills = { 'solid', 'striped', 'open'}

    def __init__(self, form, color, num, fill) :
        self.__fill = fill
        self.__form = form
        self.__color = color
        self.__num = num


    def getNum(self):
        return self.__num

    def getColor(self):
        return self.__color

    def getForm(self):
        return self.__form

    def getFill(self):
        return self.__fill

    def evalSet(self, card2, card3):
        '''
        Same as evaluoSet. 

        I return True when card2, card3 and me make a set.
        '''
        if (evalProps(card2, card3) or allDiferent(card2, card3)):
            return true
        else:
            return false


    def __cmp__(self,other):
        if (other.getNum() == self.__num) and (other.getFill() == self.__fill) and (other.getForm() == self.__form) and (other.getColor() == self.__color):
            return 0
        else:
            return 1

    def __str__(self):
        return form + " " + color + " " + num
