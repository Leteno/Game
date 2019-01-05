
import random, sys, time

def main():
    while True:
        print("魔镜魔镜 这道题应该选什么?")
        time.sleep(1)
        print(chr(random.randint(0, 3) + ord('A')))
        print("Press any key to continue")
        sys.stdin.readline()

if __name__ == "__main__":
    main()
