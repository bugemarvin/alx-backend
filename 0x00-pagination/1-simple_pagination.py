#!/usr/bin/env python3
'''
function that take two ints as tuple (*, *)
'''


import csv
import math
from typing import List


def index_range(page, page_size):
    '''
    geting the index as well as max limit
    start point page = 1 convert to index 0 = (1 - 1)
    '''
    return ((page - 1) * page_size), (page * page_size)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        '''
        print the appropriate data sets
        '''
        self.page = page
        self.page_size = page_size
        assert type(page) == int and page > 0
        assert type(page_size) == int and page_size > 0
        start_point, end_point = index_range(page, page_size)

        info = self.dataset()
        if not start_point > len(info):
            return info[start_point:end_point]
        else:
            return []
        return
