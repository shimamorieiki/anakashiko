from sklearn.feature_extraction.text import CountVectorizer as CV
import MeCab
import os
import os.path
import numpy as np
import re
from wordcloud import WordCloud
from matplotlib import pyplot as plt
from sklearn.decomposition import PCA
import pandas as pd
import csv
import math

tagger = MeCab.Tagger()
tagger.parse("")

ph = re.compile('[\u3041-\u309F]+')  # 平仮名の正規表現
pk = re.compile('[\u30A1-\u30FF]+')  # カタカナの正規表現
pa = re.compile('[a-zA-Zａ-ｚＡ-Ｚ]+')
pc = re.compile('[一-龥]+')


def japanese_analyzer(str):
    node = tagger.parseToNode(str)
    result = []
    while node is not None:
        # 品詞分類情報取得
        hinshi = node.feature.split(',')[0]
        if hinshi in ["名詞"]:
            if len(node.surface) is 1 and not pc.fullmatch(node.surface):
                pass
            elif pa.fullmatch(node.surface):
                pass
            elif node.surface == "?\u3000":
                pass
            elif node.feature.split(',')[1] == "一般":
                result.append(node.surface)
        elif hinshi in ["動詞", "形容詞"]:
            if node.feature.split(',')[1] == "自立" and not ph.fullmatch(node.surface):
                result.append(node.feature.split(',')[6])
        node = node.next
    return result


def get_tf_idf(arg):
    word_index_list = []
    word_list = []
    word_frequency_list = []
    lyric_importance_list = []
    file_num = checkFileNum("C:/Users/aifor/Lyric/"+arg)

    for song in os.listdir("C:/Users/aifor/Lyric/"+arg):
        counter = 0
        with open("C:/Users/aifor/Lyric/"+arg+"/"+song, "r", encoding='utf_8') as f:
            txt = f.read()
        for word in japanese_analyzer(txt):
            word_list.append([word, song.replace('.txt', '')])
            if (word in word_index_list):
                pass
            else:
                word_index_list.append(word)
    # print(word_list)
    # print(word_index_list)

    for word in word_index_list:
        use_in_x_num_songs_counter = 0
        use_in_x_time_in_same_song_counter = 0
        use_x_times_in_total_counter = 0
        song_name = []
        for item in word_list:
            if word in item:
                use_x_times_in_total_counter = use_x_times_in_total_counter + 1
                song_name.append(item[1])
        word_frequency_list.append([word, use_x_times_in_total_counter, (
            use_x_times_in_total_counter/file_num), list(set(song_name))])

    # print(word_frequency_list)
    for value in word_frequency_list:
        lyric_importance_list.append(culc_tf_idf(value))

    sorted_importance_list = sorted(lyric_importance_list)
    sorted_importance_list.reverse()
    with open("C:/Users/aifor/LyricWordsFrequency/"+arg+"_lwf.csv", "w", encoding='utf_8') as f:
        for value in sorted_importance_list:
            f.write(str(value[0])+"/"+value[1]+"/"+str(value[2]
                                                       )+"/"+str(value[3])+"/"+str(value[4])+"\n")


def all_lwf():
    word_index_list = []
    word_list = []
    word_frequency_list = []
    lyric_importance_list = []
    appeared_word_list = []
    for singer in os.listdir("C:/Users/aifor/LyricWordsFrequency"):
        print(str(singer.replace('_lwf.csv', '')))

        csv_file = open("C:/Users/aifor/LyricWordsFrequency/" +
                        singer, "r", encoding='utf_8', errors="", newline="")
        f = csv.reader(csv_file, delimiter="/", doublequote=True,
                       lineterminator="\r\n", quotechar='"', skipinitialspace=True)

        counter = 0
        for row in f:
            word_list.append([row[1], row[2], row[4]])

    print(len(word_list))
    all_lwf_index = []
    lookcounter3 = 0

    for index in word_list:
        lookcounter3 = lookcounter3 + 1
        print(str(len(word_list))+":"+str(lookcounter3)+"\n")
        all_lwf_index.append(index[0])

    all_lwf_index = list(set(all_lwf_index))

    print(len(all_lwf_index))
    lookcounter = 0
    for item in word_list:  # 言葉と登場回数、登場曲数が歌手ごとにまとめられているリスト
        print(str(len(word_list))+":"+str(lookcounter)+"\n")
        if item[0] in appeared_word_list:  # もしwflに文字が存在していれば
            windex = appeared_word_list.index(item[0])
            word_frequency_list[windex][1] = int(
                word_frequency_list[windex][1])+int(item[1])
            word_frequency_list[windex][2] = int(
                word_frequency_list[windex][2])+int(item[2])
        else:
            word_frequency_list.append(item)
            appeared_word_list.append(item[0])
            lookcounter = lookcounter + 1

    print(len(word_frequency_list))
    lookcounter2 = 0
    with open("C:/Users/aifor/result/allsongs_lwf.csv", "w", encoding='utf_8') as f:
        for value in word_frequency_list:
            lookcounter2 = lookcounter2 + 1
            print(str(len(word_frequency_list))+":"+str(lookcounter2)+"\n")
            f.write(value[0]+"/"+str(value[1])+"/"+str(value[2])+"\n")


def checkFileNum(path):
    ch = os.listdir(path)
    counter = 0
    for c in ch:
        counter += 1
    return counter


def culc_tf_idf(value):
    importance = [len(value[3])*value[2], value[0],
                  value[1], value[3], len(value[3])]
    return importance


def culc_all_lwf(value):
    importance = [len(value[3])*value[2], value[0], value[1]]
    return importance


def isexist(arg):
    if os.path.isdir("C:/Users/aifor/Lyric/"+arg):
        return True
    else:
        return False


def get_lwf_file(singer, num):
    csv_file = open("C:/Users/aifor/LyricWordsFrequency/"+singer +
                    "_lwf.csv", "r", encoding='utf_8', errors="", newline="")
    f = csv.reader(csv_file, delimiter="/", doublequote=True,
                   lineterminator="\r\n", quotechar='"', skipinitialspace=True)

    counter = 0
    result = []

    if num == -1:
        for row in f:
            result.append(row)
    else:
        for row in f:
            if counter >= num:
                break
            result.append(row)
            counter = counter+1
    return result


def read_all_lwf():
    csv_file = open("C:/Users/aifor/result/allsongs_lwf.csv",
                    "r", encoding='utf_8', errors="", newline="")
    f = csv.reader(csv_file, delimiter="/", doublequote=True,
                   lineterminator="\r\n", quotechar='"', skipinitialspace=True)

    content = []
    for row in f:
        content.append(row)

    return content


def make_all_lwf_index():
    index = []
    for row in read_all_lwf():
        index.append(row[0])

    return index

#
# all_lwf()


singer = "GREEEEN"
lwf = get_lwf_file(singer, -1)
# print("処理前")
# for i in lwf:
#     print(str(i[0])+":"+str(i[1]))

all_lwf_index = make_all_lwf_index()
all_lwf_content = read_all_lwf()
asong = 250000
osong = checkFileNum("C:/Users/aifor/Lyric/"+singer)
# print(all_lwf_index)
# print(all_lwf_content)
for item in lwf:
    index_num = all_lwf_index.index(item[1])
    songs_num = int(all_lwf_content[index_num][1])
    times_num = int(all_lwf_content[index_num][2])
    item[0] = float(float(item[0]) / math.sqrt(songs_num * times_num / asong))

slwf = sorted(lwf, reverse=True)
print("処理後")

for i in slwf:
    if (int(i[4])/osong) >= 0.05:
        print(str(i[0])+":"+str(i[1]))
