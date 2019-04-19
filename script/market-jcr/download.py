#!/usr/bin/env python3

import requests


def main():
    maxPage = [14, 9, 2, 1, 2]
    for i in range(len(maxPage)):
        for p in range(maxPage[i]):
            type, page = i + 1, p + 1
            print("download %s %s" % (type, page))
            resp = download(type, page)
            print("resp.ok: %s" % resp.ok)
            save(resp.content, '%s-%s.html' % (i+1, p+1))

def save(content, filename):
    try:
        with open(filename, 'w') as f:
            f.write(content)
    except:
        with open(filename, 'wb') as f:
            f.write(content)

def download(type, page):
    url = "https://www.jcr.co.jp/en/ratinglist/?m=search&c%5B0%5D={type}&al=&t=0&i=&o=&w=&p={page}"\
        .format(type=type, page=page)

    headers = {
        "upgrade-insecure-requests": "1"
        }

    resp = requests.get(url, headers=headers)
    return resp


if __name__ == "__main__":
    main()
