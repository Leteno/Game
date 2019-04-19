#!/usr/bin/env python3

import os, re
from bs4 import BeautifulSoup

def main():
    targetFile = "targetFile.csv"
    removeFile(targetFile)
    machine = re.compile("([0-9])*-.*")
    for file in os.listdir('build'):
        m = machine.match(file)
        if not m:
            print("ERROR: skip %s" % file)
            continue
        type = getProperType(m.group(1))
        file = os.path.join('build', file)
        with open(file, 'r') as f:
            data = retrieveCSVData(f.read())
            if not data:
                print("ERROR: cannot find proper data from %s" % file)
                continue
            appendToFile(targetFile, data, type)

def removeFile(targetFile):
    if os.path.exists(targetFile):
        os.remove(targetFile)

def getProperType(index):
    array = [-1, "Corporates", "Financial Institutions", "Structured Finance", "Public Sector", "Sovereigns and Supranationals"]
    return array[int(index)]
def retrieveCSVData(content):
    soup = BeautifulSoup(content)
    result = []
    for tr in soup.find_all('tr'):
        thisLayer = []
        tds = tr.find_all('td')
        if tds:
            for td in tds:
                thisLayer.append(td.string)
            result.append(thisLayer)
    return result

def appendToFile(targetFile, data, type):
    cleanMachine = re.compile('(.*)\s*/.*')
    with open(targetFile, 'a') as f:
        for item in data:
            string = ""
            for i in item:
                m = cleanMachine.match(i)
                if m:
                    i = m.group(1)
                string += i + ','
            string += type + ',\n'
            f.write(string)

if __name__ == '__main__':
    main()
