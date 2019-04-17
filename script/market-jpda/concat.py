#!/usr/bin/env python3
#coding=utf-8
import os, sys

def main():
    sourceDir = 'build/'
    resultFile = "laopo.csv"
    files = os.listdir(sourceDir)
    for file in sorted(files):
        fullPath = os.path.join(sourceDir, file)
        if not os.path.isfile(fullPath) or not fullPath.endswith('csv'):
            continue
        with open(resultFile, 'ab') as f:
            with open(fullPath, 'rb') as r:
                content = r.read()
                if content.startswith(b'<!DOCTYPE html>'):
                    continue
                f.write(content)

if __name__ == '__main__':
    main()
