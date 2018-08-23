
import random

import rule as r

class Quiz:
    def reset(self, size):
        pass
    def getProblemDesc(self):
        pass
    def getAnswer(self):
        pass
    def getSecret(self):
        pass

class IncreasingQuiz:
    '''
    such as: 1 3 5 7 9
    '''
    def __init__(self):
        self.sequence = []

    def reset(self, size):
        feet = random.randint(2, 9)
        self.rule = r.PlusRule(feet)
        self.sequence = r.getSequence(self.rule, size)
        self.problemSlot = random.randint(0, size - 1)

    def getProblemDesc(self):
        question = 'what is the guilv of the following sequence?\n%s'
        sentence = ''
        for i in range(len(self.sequence)):
            if i != self.problemSlot:
                sentence += '%s ' % self.sequence[i]
            else:
                sentence += '? '
        return question % sentence
    def getAnswer(self):
        return self.sequence[self.problemSlot]

    def getSecret(self):
        return str(self.rule)
