
function downloadCorporates() {
    page=$1
    downloadPath=$2/corporates-$page.html
    echo download $downloadPath
    curl "https://www.jcr.co.jp/en/ratinglist/?m=search&c%5B0%5D=1&al=&t=0&i=&o=&w=&p=$page" -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3' -H 'Referer: https://www.jcr.co.jp/en/ratinglist/?m=search&c%5B0%5D=1&al=&t=0&i=&o=&w=&p=14' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7' -H 'Cookie: huefjkhbmzxfcg=0uVTPRvsQf_ebHvjMahXfPJuHNV-_01HO4nIANcqnJaw8eaSqlQfW88ae12FBZY4Zbpi_ertOzGYvIzhNqjYpVBKRnJoRlpVYnpvSURfZXcxOVFTZUl3MTFqd21IaTZsM3ZhOU11NklJNGs; fontsize=100; _ga=GA1.3.52425515.1555594119; _gid=GA1.3.1863248635.1555594119; token=72e004810eb2e963da6df68e850c98825d5b8b6a7c5bbd6f5aad36196bac9d44bd3b8469eb23ca8640b2aaf5264a439b941d8e9adedef2769212b0a2d1761264; TS010a43ab=01cc8a3e878edf2c7c3cf984ce535599a1f9fe445368bcab3153c2a3c126eeec764659487ae8a1c5c500c0a6c6cd20609cf168ddb9944e56276aba4e523e84b21a3fd639621eab1c5b313d99e5f5ada554b31033bd' --compressed > $downloadPath
}

function downloadFinancial() {
    page=$1
    downloadPath=$2/financial-$page.html
    echo download $downloadPath
    curl "https://www.jcr.co.jp/en/ratinglist/?m=search&c%5B0%5D=2&al=&t=0&i=&o=&w=&p=$page" -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3' -H 'Referer: https://www.jcr.co.jp/en/ratinglist' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7' -H 'Cookie: fontsize=100; _ga=GA1.3.52425515.1555594119; _gid=GA1.3.1863248635.1555594119; token=b80985d7ee9b7682aa52d5e0753ebe04f91e815c8ab4dc9b35f15b2ff9abd672f17f0f492a0bcb80e63a2fc167d54916618c005056a983e4380edaf1766b3c31; huefjkhbmzxfcg=qOrAPxwIalwSriuCGjsxkXepwJc3hZn3fSljGUxCbeJ_WM4TP9YljJtwlwf9md9CgUddVzugoPyYnV01Ckx45nFXc201WVNUUjFaeUc2emQ3LXVnT3hNWlZQUGdsdHNONTA5dS1GMHlUdjA; TS010a43ab=01cc8a3e873be9fd913bb82efda0ee47a76d2524e3d7bcf5f515593f993380b854ed69f8c2ccc29968c7d4cdcde83b927827645475742e08880ff80348f34216e17a8ec4999b319cd77175bdc990c21134e7a08565' --compressed > $downloadPath
}

function downloadStructure() {
    page=$1
    downloadPath=$2/StructureFinance-$page.html
    echo download $downloadPath
    curl "https://www.jcr.co.jp/en/ratinglist/?m=search&c%5B0%5D=3&al=&t=0&i=&o=&w=&p=$page" -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3' -H 'Referer: https://www.jcr.co.jp/en/ratinglist' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7' -H 'Cookie: fontsize=100; _ga=GA1.3.52425515.1555594119; _gid=GA1.3.1863248635.1555594119; token=b80985d7ee9b7682aa52d5e0753ebe04f91e815c8ab4dc9b35f15b2ff9abd672f17f0f492a0bcb80e63a2fc167d54916618c005056a983e4380edaf1766b3c31; huefjkhbmzxfcg=qOrAPxwIalwSriuCGjsxkXepwJc3hZn3fSljGUxCbeJ_WM4TP9YljJtwlwf9md9CgUddVzugoPyYnV01Ckx45nFXc201WVNUUjFaeUc2emQ3LXVnT3hNWlZQUGdsdHNONTA5dS1GMHlUdjA; TS010a43ab=01cc8a3e873be9fd913bb82efda0ee47a76d2524e3d7bcf5f515593f993380b854ed69f8c2ccc29968c7d4cdcde83b927827645475742e08880ff80348f34216e17a8ec4999b319cd77175bdc990c21134e7a08565' --compressed > $downloadPath
}

function downloadPublicSector() {
    page=$1
    downloadPath=$2/PublicSector-$page.html
    echo download $downloadPath
    curl "https://www.jcr.co.jp/en/ratinglist/?m=search&c%5B0%5D=4&al=&t=0&i=&o=&w=&p=$page" -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3' -H 'Referer: https://www.jcr.co.jp/en/ratinglist' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7' -H 'Cookie: fontsize=100; _ga=GA1.3.52425515.1555594119; _gid=GA1.3.1863248635.1555594119; token=b80985d7ee9b7682aa52d5e0753ebe04f91e815c8ab4dc9b35f15b2ff9abd672f17f0f492a0bcb80e63a2fc167d54916618c005056a983e4380edaf1766b3c31; huefjkhbmzxfcg=qOrAPxwIalwSriuCGjsxkXepwJc3hZn3fSljGUxCbeJ_WM4TP9YljJtwlwf9md9CgUddVzugoPyYnV01Ckx45nFXc201WVNUUjFaeUc2emQ3LXVnT3hNWlZQUGdsdHNONTA5dS1GMHlUdjA; TS010a43ab=01cc8a3e873be9fd913bb82efda0ee47a76d2524e3d7bcf5f515593f993380b854ed69f8c2ccc29968c7d4cdcde83b927827645475742e08880ff80348f34216e17a8ec4999b319cd77175bdc990c21134e7a08565' --compressed > $downloadPath
}

function  downloadSovereigns() {
    page=$1
    downloadPath=$2/Sovereigns-$page.html
    echo download $downloadPath
    curl "https://www.jcr.co.jp/en/ratinglist/?m=search&c%5B0%5D=5&al=&t=0&i=&o=&w=&p=$page" -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3' -H 'Referer: https://www.jcr.co.jp/en/ratinglist' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7' -H 'Cookie: fontsize=100; _ga=GA1.3.52425515.1555594119; _gid=GA1.3.1863248635.1555594119; token=b80985d7ee9b7682aa52d5e0753ebe04f91e815c8ab4dc9b35f15b2ff9abd672f17f0f492a0bcb80e63a2fc167d54916618c005056a983e4380edaf1766b3c31; huefjkhbmzxfcg=qOrAPxwIalwSriuCGjsxkXepwJc3hZn3fSljGUxCbeJ_WM4TP9YljJtwlwf9md9CgUddVzugoPyYnV01Ckx45nFXc201WVNUUjFaeUc2emQ3LXVnT3hNWlZQUGdsdHNONTA5dS1GMHlUdjA; TS010a43ab=01cc8a3e873be9fd913bb82efda0ee47a76d2524e3d7bcf5f515593f993380b854ed69f8c2ccc29968c7d4cdcde83b927827645475742e08880ff80348f34216e17a8ec4999b319cd77175bdc990c21134e7a08565' --compressed > $downloadPath
}


function main() {
    if [ -e "build/" ]; then
	rm -rf "build"
    fi
    mkdir build

    for corpPage in $(seq 1 14); do
	downloadCorporates $corpPage build
    done

    for finanPage in $(seq 1 14); do
	downloadFinancial $finanPage build
    done

    for structurePage in $(seq 1 14); do
	downloadStructure $structurePage build
    done

    for publicPage in $(seq 1 14); do
	downloadPublicSector $publicPage build
    done

    for sovPage in $(seq 1 14); do
	downloadSovereigns $sovPage build
    done
}

main