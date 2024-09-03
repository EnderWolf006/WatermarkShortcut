import requests
from bs4 import BeautifulSoup
import  json
dic={}
n=290
for i in range(1,n):
    print (i)
    page=i
    text = requests.get("https://airportcode.bmcx.com/" + str(page) + "__airportcode/")
    res = text.text
    soup = BeautifulSoup(res)
    arr = soup.findAll(name="table")[0].findAll(name="tr")
    for i in arr[2:]:
        t = i.findAll(name="td")
        v=""
        if t[3].string!=None:
            v=t[3].string
        dic[t[1].string] =v
s=json.dumps(dic,ensure_ascii=False)
print(s)
with open('json.json','w')as f:
    f.write(s)
