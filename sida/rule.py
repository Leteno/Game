
import random

class Rule:
    def __init__(self):
        pass
    def getData(self, a0, index):
        pass

class PlusRule(Rule):
    def __init__(self, feet):
        self.feet = feet
    def getData(self, a0, index):
        return a0 + self.feet * index
    def __str__(self):
        return 'PlusRule, feet %s' % self.feet

class MultiplyRule(Rule):
    def __init__(self, multi):
        self.multi = multi
    def getData(self, a0, index):
        result = a0
        while index > 0:
            index -= 1
            result *= self.multi
        return result
    def __str__(self):
        return 'MultiplyRule, multi %s' % self.multi

def getSequence(rule, size):
    result = []
    begin = random.randint(2, 10)
    for i in range(size):
        result.append(rule.getData(begin, i))
    return result
