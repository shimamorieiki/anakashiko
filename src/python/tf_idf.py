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


def get_singer_feature_words(arg, num):
    source2_list = []
    for song in os.listdir("C:/Users/aifor/Lyric/"+arg):
        with open("C:/Users/aifor/Lyric/"+arg+"/"+song, "r", encoding='utf_8') as f:
            txt = f.read()
            source2_list.append(txt)

    # japanese_analyzer(txt)
    cv = CV(analyzer=japanese_analyzer, min_df=0.08,
            max_df=0.50, ngram_range=(1, 3))
    matrix = cv.fit_transform(source2_list)
    feature_array = np.array(cv.get_feature_names())
    tfidf_sorting = np.argsort(matrix.toarray()).flatten()[::-1]

    n = num
    top_n = feature_array[tfidf_sorting][:n]
    return top_n


def isexist(arg):
    if os.path.isdir("C:/Users/aifor/Lyric/"+arg):
        return True
    else:
        return False

# # with open("./testsongs/HOWEVER.txt", "r",encoding='utf_8') as f:
# #     txt = f.read()
# source2_list = []
# for song in os.listdir("C:/Users/aifor/Lyric/GLAY"):
#     with open("C:/Users/aifor/Lyric/GLAY/"+song, "r",encoding='utf_8') as f:
#         txt = f.read()
#         source2_list.append(txt)
# # japanese_analyzer(txt)
# cv = CV(analyzer=japanese_analyzer,min_df=0.08, max_df=0.50,ngram_range=(1,3))
# matrix = cv.fit_transform(source2_list)
# feature_array = np.array(cv.get_feature_names())
# tfidf_sorting = np.argsort(matrix.toarray()).flatten()[::-1]
#
# n = 100
# top_n = feature_array[tfidf_sorting][:n]
#
#
#
#
# print(cv.get_feature_names())
#
# word_list=" ".join(top_n)
#
# wordcloud = WordCloud(
#     stopwords={'場所','自分','人','あと','事','こと'},
#     font_step=1,max_words=300,
#     prefer_horizontal=0.99,
#     font_path='C:\Windows\Fonts\meiryo.ttc',
#     width=600, height=400,
#     background_color="white"
# ).generate(word_list)
#
# plt.figure(figsize=(100,50))
# plt.imshow(wordcloud)
# plt.axis("off")
# plt.show()
