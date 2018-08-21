
import random, time

def gen(n, difficulty = 3):
    '''
    generate a quiz metrix of n x n
    '''
    matrix = Matrix(n)
    last = time.time()

    count = 0
    while not matrix.hasSolution(difficulty) and count < 100:
        show(matrix)
        count += 1
        matrix.flipOne()
        safty = 0
        print('elapsing: %s' % (time.time() - last))
        last = time.time()
        while matrix.proving() and safty < 1000:
            safty += 1

    return matrix


def show(matrix):
    answer = None
    for row in matrix.getData():
        line = ''
        for item in row:
            if not answer and item.hasOneSolution():
                answer = item.posibility[0]
                line += '? '
            elif item.isFliped:
                line += '%s ' % item.posibility
            else:
                line += '%s  ' % item.posibility
        print(line)
    print('answer is %s' % answer)

class Matrix:
    def __init__(self, n):
        self.data = []
        self.N = n
        for i in range(n):
            row = []
            for j in range(n):
                row.append(Item(n))
            self.data.append(row)

    def hasSolution(self, difficulty):
        solutionCount = 0
        for row in self.data:
            for item in row:
                if item.hasOneSolution():
                    solutionCount += 1
                    if solutionCount >= difficulty:
                        return True
        return False

    def flipOne(self):
        safty = 0
        while safty < 10000:
            safty += 1
            max = self.N - 1
            i, j = random.randint(0, max), random.randint(0, max)
            item = self.data[i][j]
            if not item.isFliped and not item.hasOneSolution():
                item.flip()
                break
        return None

    def proving(self):
        def getNewImprovement():
            for i in range(self.N):
                for j in range(self.N):
                    item = self.data[i][j]
                    if item.newImprovement():
                        return i, j, item
            return None
        m = getNewImprovement()
        if not m:
            # It is perfect, nothing need to be done
            return False
        i, j, item = m
        print('improving %s %s' % (i, j))
        num = item.posibility[0]
        item.markAsImproved()

        for index in range(self.N):
            # same row
            if index != i:
                self.data[index][j].minusPosibility(num)
            # same col
            if index != j:
                self.data[i][index].minusPosibility(num)

    def getData(self):
        return self.data[:]

class Item:
    def __init__(self, n):
        self.posibility = []
        self.improved = False
        for i in range(n):
            self.posibility.append(i)

        self.isFliped = False

    def newImprovement(self):
        '''
        Recently make posibility to one by flip or logical count
        '''
        return not self.improved and len(self.posibility) == 1

    def markAsImproved(self):
        self.improved = True

    def minusPosibility(self, i):
        if len(self.posibility) == 1:
            # cannot stand it any more
            return
        for index in range(len(self.posibility)):
            if self.posibility[index] == i:
                del self.posibility[index]
                break

    def flip(self):
        self.isFliped = True
        index = random.randint(0, len(self.posibility) - 1)
        self.posibility = [ self.posibility[index] ]
        print('flip as %s', self.posibility)

    def hasOneSolution(self):
        return not self.isFliped and len(self.posibility) == 1
