
import generator

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
    matrix = generator.gen(5, 1)
    show(matrix)

if __name__ == '__main__':
    main()
