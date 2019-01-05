#!/usr/local/bin/python
# -*- coding: utf-8 -*-

import fileinput, json, random, sys, time, os

def main():
    skip = readFromConfig()
    print("哎呀，今天要考试，好慌啊，怎么办? \n")
    if not skip:
        time.sleep(2)
        thinking()
        time.sleep(2)
        print("第一步：      ")
        time.sleep(5)
        print("请按回车")
        recordConfig()
        sys.stdin.read(1)

    for x in randomSequence(30):
        sys.stdout.write("    %s\r" % x)
        sys.stdout.flush()
        time.sleep(0.1)

    result = getZhanbu()
    time.sleep(1)
    print("占卜的结果出来啦:")
    time.sleep(2)
    for x in result.decode('utf8'):
        sys.stdout.write("%s" % x)
        sys.stdout.flush()
        time.sleep(1)
    print('\n嘻嘻')


def readFromConfig():
    cfgFile = 'zhanbu.cfg'
    if not os.path.exists(cfgFile):
        return False
    with open(cfgFile, 'r') as f:
        try:
            data = json.load(f)
            return data['skip_loading']
        except:
            return False

def recordConfig():
    cfgFile = 'zhanbu.cfg'
    cfg = {'skip_loading': True}
    with open(cfgFile, 'w') as f:
        json.dump(cfg, f)

def thinking():
    word = '(Em..........'
    for x in range(0, len(word)):
        sys.stdout.write('%s\r' % word[0:x])
        sys.stdout.flush()
        time.sleep(0.6)
    print(word)

def randomSequence(count=10):
    allSequence = 'HowDoYouDoJiaJiaCouldYouBeHappyWhenSeeingThis?'
    size = len(allSequence)
    result = ''
    for x in range(0, count):
        index = random.randint(0, size - 1)
        result += allSequence[index]
    return result

def getZhanbu():
    chances = [
        "诸事顺利，加油加油。",
        "逢凶化吉，苦尽甘来。",
        "多难兴邦，终有收获。"
        ]
    size = len(chances)
    index = random.randint(0, size - 1)
    return chances[index]

if __name__ == '__main__':
    main()
