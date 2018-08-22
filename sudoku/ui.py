
import pygame, time, math, sys
from pygame.locals import *

import generator
from res import Res

BLACK = (  0,   0,   0)
WHITE = (255, 255, 255)
WINDOWWIDTH, WINDOWHEIGHT = 550, 400

def show(matrix):
    answer = None
    for row in matrix.getData():
        line = ''
        for item in row:
            if not answer and item.hasOneSolution():
                answer = item.posibility[0]
                line += '? '
            elif item.isFliped:
                assert len(item.posibility) == 1, 'strange item: %s' % item
                line += '%s ' % item.posibility[0]
            else:
                line += '  '
        print(line)
    print('answer is %s' % answer)

def main():
    pygameScene()

def pygameScene():
    matrixSize, difficulty = 5, 1
    pygame.init()
    SURF = pygame.display.set_mode((WINDOWWIDTH, WINDOWHEIGHT))
    FPSCLOCK = pygame.time.Clock()
    FPS = 20
    pygame.display.set_caption('Sudoku Quiz')

    resource = Res()
    font = pygame.font.Font('freesansbold.ttf', 24)
    matrix = generator.gen(matrixSize, difficulty)
    optionPositions = genOptionPositions(matrixSize)
    assert resource.size >= len(matrix.data), 'not enough res for such a big matrix'
    lastTime = time.time()
    gamestate = GameState()
    while True:
        checkForQuit()
        SURF.fill(BLACK)
        answer = renderMatrix(matrix, SURF, resource)
        renderOptions(matrix, SURF, resource, optionPositions)
        renderTime(SURF, font, lastTime)
        renderScore(SURF, font, gamestate.score)
        interceptMouseClick(gamestate, optionPositions, answer)
        if gamestate.state == GameState.NEXT:
            renderAnswer(SURF, FPSCLOCK, answer, resource)
        if gamestate.state == GameState.NEXT:
            matrix = generator.gen(matrixSize, difficulty)
            lastTime = time.time()
        gamestate.state = GameState.NORMAL
        pygame.display.update()
        FPSCLOCK.tick(FPS)

def checkForQuit():
    for event in pygame.event.get(QUIT):
        terminate()
    for event in pygame.event.get(KEYUP):
        if event.key == K_ESCAPE:
            terminate()
        pygame.event.post(event)

def terminate():
    pygame.quit()
    sys.exit()

def genOptionPositions(size):
    '''
    left-top
    '''
    result = []

    fromX, fromY = 20, 300
    width, gap = 42, 20

    for i in range(size):
        x = fromX + (width + gap) * i
        y = fromY
        result.append((x, y))
    return result

def renderMatrix(matrix, SURF, resource):
    answer = None
    fromX, fromY = 20, 20
    width, height, gap = 42, 42, 1

    surf = None
    data = matrix.getData()
    for i in range(len(data)):
        row = data[i]
        line = ''
        for j in range(len(row)):
            item = row[j]
            if not answer and item.hasOneSolution():
                answer = item.posibility[0]
                surf = resource.getRes('?')
            elif item.isFliped:
                surf = resource.getRes(item.posibility[0])
            else:
                surf = resource.getRes('empty')
            rect = surf.get_rect()
            top, left = fromX + j * (width + gap), fromY + i * (height + gap)
            rect.topleft = (top, left)
            SURF.blit(surf, rect)
    return answer

def renderOptions(matrix, SURF, resource, optionPositions):
    size = len(matrix.getData())
    for i in range(size):
        surf = resource.getRes(i)
        rect = surf.get_rect()
        rect.topleft = optionPositions[i]
        SURF.blit(surf, rect)

def renderTime(SURF, font, lastTime):
    currentTime = time.time()
    gap = math.floor(currentTime - lastTime)
    surf = font.render('time: %s' % gap, 1, WHITE)
    rect = surf.get_rect()
    rect.topleft = (300, 100)
    SURF.blit(surf, rect)

def renderScore(SURF, font, score):
    surf = font.render('score: %s' % score, 1, WHITE)
    rect = topleft = (300, 200)
    SURF.blit(surf, rect)

def interceptMouseClick(gamestate, optionPositions, answer):
    optionSize = 42
    rect = Rect(0, 0, optionSize, optionSize)

    for event in pygame.event.get():
        if event.type == MOUSEBUTTONDOWN:
            for i in range(len(optionPositions)):
                rect.topleft = optionPositions[i]
                if rect.collidepoint(event.pos):
                    # guest answer is i ?
                    if answer == i:
                        gamestate.score += 1
                    gamestate.state = GameState.NEXT

def renderAnswer(SURF, clock, answer, resource):
    surf = resource.getRes(answer)
    rect = surf.get_rect()
    rect.topleft = (400, 300)
    SURF.blit(surf, rect)
    pygame.display.update()
    clock.tick(200)
    t0 = time.time()
    while time.time() - t0 < 2:
        # pause 2 seconds, ugly
        pass

class GameState:
    NEXT = 0
    NORMAL = 1
    def __init__(self):
        self.state = GameState.NORMAL
        self.score = 0

if __name__ == '__main__':
    main()
