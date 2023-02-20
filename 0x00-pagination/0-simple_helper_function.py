#!/usr/bin/env python3
'''
function that take two ints as tuple (*, *)
'''


def index_range(page, page_size):
    '''
    geting the index as well as max limit
    start point page = 1 convert to index 0 = (1 - 1)
    '''
    return ((page - 1) * page_size), (page * page_size)
