import requests
import bs4
import time
import os


# def getlyric(url):
#     res = requests.get(url)
#     res.raise_for_status()
#
#     soup = bs4.BeautifulSoup(res.text,"html.parser")
#
#     with open("./Lyric/一青窈/"+soup.find("td", attrs={"class": "kasi1"}).text.replace(" ", "_").replace(".", "・").replace("*", "＊").replace("?", "？").replace('"', "”").replace('/', "／").replace('<', "＜").replace('>', "＞")+'.txt','w',encoding='utf_8') as f:
#         f.write(soup.find("td", attrs={"class": "kasi_honbun"}).text)

# def getlink(root):
#     res = requests.get(root)
#     res.raise_for_status()
#
#     soup = bs4.BeautifulSoup(res.text,"html.parser")
#
#     for link in soup.find_all("a"):
#         url = link.get("href")
#
#         if url.find('showkasi') is not -1:
#             print("https://www.utamap.com"+url.replace("./","/"))
#             getlyric("https://www.utamap.com"+url.replace("./","/"))

def getsong(root, name):
    res = requests.get(root)
    res.raise_for_status()

    soup = bs4.BeautifulSoup(res.text, "html.parser")

    for link in soup.find_all("a"):
        url = link.get("href")

        if url.find('/song/') is not -1:
            getlyric("https://www.uta-net.com"+url, name)
            # print(root+url.replace("/song/","song/"))


def getsinger(root):
    res = requests.get(root)
    res.raise_for_status()

    soup = bs4.BeautifulSoup(res.text, "html.parser")

    for link in soup.find_all("a"):
        url = link.get("href")

        if url.find('/artist/') is not -1:
            name = link.text
            print("name:"+name)
            if os.path.isdir("C:/Users/aifor/Lyric/"+name.replace(":", "：").replace("*", "＊").replace("?", "？").replace('"', "”").replace('/', "／").replace('<', "＜").replace('>', "＞").replace("|", "｜")):
                pass
            else:
                getsong("https://www.uta-net.com"+url, name)


def getlyric(url, singer):
    res = requests.get(url)
    res.raise_for_status()

    soup = bs4.BeautifulSoup(res.text, "html.parser")
    title = soup.find("h2").text
    kashi = soup.find("div", attrs={"id": "kashi_area"}).text
    path = "C:/Users/aifor/Lyric/"+singer.replace(":", "：").replace("*", "＊").replace("?", "？").replace(
        '"', "”").replace('/', "／").replace('<', "＜").replace('>', "＞").replace("|", "｜")+"/"
    os.makedirs(path, exist_ok=True)

    if os.path.exists(path+title.replace(":", "：").replace(" ", "_").replace(".", "・").replace("*", "＊").replace("?", "？").replace('"', "”").replace('/', "／").replace('<', "＜").replace('>', "＞")+'.txt'):
        pass
    else:
        with open(path+title.replace(":", "：").replace(" ", "_").replace(".", "・").replace("*", "＊").replace("?", "？").replace('"', "”").replace('/', "／").replace('<', "＜").replace('>', "＞")+'.txt', 'w', encoding='utf_8') as f:
            f.write(kashi)
