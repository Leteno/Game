#!/bin/bash

function download() {
    year=$1
    month=$2
    day=$3
    file=$4/$year-$month-$day.csv
    curl --fail 'http://market.jsda.or.jp/eigo/html/saiken/kehai/downloadResult_e.php' -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'Origin: http://market.jsda.or.jp' -H 'Upgrade-Insecure-Requests: 1' -H 'Content-Type: application/x-www-form-urlencoded' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3' -H 'Referer: http://market.jsda.or.jp/eigo/html/saiken/kehai/downloadResult_e.php' -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7' -H 'Cookie: _ga=GA1.3.1728485720.1555517116; _gid=GA1.3.235196588.1555517116; __utma=127485458.1728485720.1555517116.1555517116.1555517116.1; __utmc=127485458; __utmz=127485458.1555517116.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmt=1; __utmb=127485458.3.10.1555517116; _dc_gtm_UA-23572208-3=1' --data "dataType=ER&dlDateYear=$year&dlDateMon=$month&dlDateDay=$day&dataForm=csv&dl=Download" --compressed > $file && {
	echo "success add to file: $file"
    } || {
	echo "file add to file: $file"
    }
}

main() {
    if [ -e build ]; then
	rm -rf build/
    fi
    mkdir build
    year=2018
    for month in $(seq 4 12); do
	for day in $(seq 1 31); do
	    download $year $month $day build
	done
    done

    year=2019
    for month in $(seq 1 4); do
	for day in $(seq 1 31); do
	    download $year $month $day build
	done
    done
}

main