
import random, sys

from quiz import *

quizs = [
    IncreasingQuiz()
]

def startQuiz():
    q = getQuiz()
    print(q.getProblemDesc())
    userAnswer = sys.stdin.readline()
    if userAnswer == '%s\n' % q.getAnswer():
        congratulation()
    else:
        onWrongAnswer(q)
    print('')

def getQuiz():
    s = random.randint(0, len(quizs) - 1)
    q = quizs[s]
    size = random.randint(5, 6)
    q.reset(size)
    return q

def congratulation():
    print("Yeah, you're right!")

def onWrongAnswer(q):
    print('The answer is %s' % q.getAnswer())
    print('The trick is %s' % q.getSecret())
