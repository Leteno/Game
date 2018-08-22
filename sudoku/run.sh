#!/bin/bash

# ensure pygame installed

type python3
if [ $? -ne 0 ]; then
    echo Please install python3
    exit 1
fi

python3 -c 'import pygame'
if [ $? -ne 0 ]; then
    echo installing pygame
    pip3 install pygame
fi

python3 ui.py