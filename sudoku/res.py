
import pygame
from pygame.locals import *

class Res:
    def __init__(self):
        self.data = {}
        self.size = 5
        for i in range(self.size):
            image = pygame.image.load('%s.jpg' % i)
            self.data[i] = image
        self.data['?'] = pygame.image.load('?.jpg')
        self.data['empty'] = pygame.image.load('empty.jpg')
    def getRes(self, id):
        if id not in ['?', 'empty'] and id >= self.size:
            id = id % self.size
        return self.data[id]
