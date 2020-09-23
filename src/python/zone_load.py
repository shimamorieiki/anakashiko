import MeCab
from gensim import models
from gensim.models.doc2vec import TaggedDocument
import os
import os.path
import numpy as np
from matplotlib import pyplot as plt
from sklearn.decomposition import PCA
import pandas as pd
from matplotlib.font_manager import FontProperties
from mpl_toolkits.mplot3d.axes3d import Axes3D
from gensim import models
from gensim.models.doc2vec import TaggedDocument

# MeCabの初期化
tagger = MeCab.Tagger()
tagger.parse("")

# 保存したDoc2Vec学習モデルを読み込む
model_song = models.Doc2Vec.load(
    'C:/Users/aifor/OneDrive/programing/Python/anakashiko/song.model')
model_singer = models.Doc2Vec.load(
    'C:/Users/aifor/OneDrive/programing/Python/anakashiko/singer.model')
fp = FontProperties(
    fname=r"C:/Users/aifor/AppData/Local/Microsoft/Windows/Fonts/ipam.ttc")


def lylic_open(song):
    with open('./testsongs/'+song, 'r', encoding='utf_8') as inputf:
        intext = inputf.read()
        node = tagger.parseToNode(intext)
        result = []
        while node is not None:
            # 品詞分類情報取得
            hinshi = node.feature.split(',')[0]
            if hinshi in ["名詞", "副詞"]:
                # 表層系の取得
                result.append(node.surface)
            elif hinshi in ["動詞", "形容詞"]:
                # 形態素情報から原型情報を取得
                result.append(node.feature.split(',')[6])
            node = node.next
    return result


#　学習しなおすとなぜか正しいベクトルを示さなくなったので新しく調べるものは学習済みのベクトルを利用する
def infer_singer(singer):
    for song in os.listdir("C:/Users/aifor/Lyric/"+singer):
        with open("C:/Users/aifor/Lyric/"+singer+"/"+song, 'r', encoding='utf_8') as inputf:
            intext = inputf.read()
            node = tagger.parseToNode(intext)
            result = []
            while node is not None:
                # 品詞分類情報取得
                hinshi = node.feature.split(',')[0]
                if hinshi in ["名詞", "副詞"]:
                    # 表層系の取得
                    result.append(node.surface)
                elif hinshi in ["動詞", "形容詞"]:
                    # 形態素情報から原型情報を取得
                    result.append(node.feature.split(',')[6])
                node = node.next
    return result


# 引数のタイトル、urlの作品を分類する
def similar():
    for song in os.listdir("testsongs"):
        words = lylic_open(song)

        vector_song = model_song.infer_vector(words)
        print("---「"+song.replace('.txt', '')+"」とよく似た作品は？---")
        simlyric = model_song.docvecs.most_similar([vector_song], topn=5)
        print(simlyric)

        vector_singer = model_singer.infer_vector(words)
        print("---「"+song.replace('.txt', '')+"」は誰の曲？---")
        simsinger = model_singer.docvecs.most_similar([vector_singer], topn=10)
        print(simsinger[0])


# def corsong(singer1,singer2):
#     for song1 in os.listdir("C:/Users/aifor/Lyric/"+singer1):
#         for song2 in os.listdir("C:/Users/aifor/Lyric/"+singer2):
#             print(song1.replace('.txt',''))
#             print(song2.replace('.txt',''))
#             print("の類似度は")
#             print(model_song.docvecs.similarity(song1.replace('.txt',''),song2.replace('.txt','')))
#         # vector_song = model_song.infer_vector(words)
#         # print("---「"+song.replace('.txt','')+"」とよく似た作品は？---")
#         # simlyric = model_song.docvecs.most_similar([vector_song],topn=5)
#         # print(simlyric)
#
#         # vector_singer = model_singer.infer_vector(words)
#         # print("---「"+song.replace('.txt','')+"」は誰の曲？---")
#         # simsinger = model_singer.docvecs.most_similar([vector_singer],topn=10)
#         # print(simsinger[0])

def zscore(x, axis=None):
    xmean = x.mean(axis=axis, keepdims=True)
    xstd = np.std(x, axis=axis, keepdims=True)
    zscore = (x-xmean)/xstd
    return zscore


def vecComp(vec):
    # 主成分分析する
    zvec = zscore(vec)
    pca = PCA(n_components=2)
    pca.fit(zvec)
    # 分析結果を元にデータセットを主成分に変換する
    transformed = pca.fit_transform(zvec)
    # print("主成分分析を行った後のベクトル")
    # print(transformed)
    print("主成分の次元ごとの寄与率を出力する")
    print(pca.explained_variance_ratio_)
    # 主成分をプロットする

    return transformed


def map_plot(vec, list):
    # fig, ax = plt.subplots()
    # df.plot(0,1,kind='scatter',ax=ax)
    #
    # for k, v in df.iterrows():
    #     ax.annotate(k,xy=(v[0],v[1]),size=20)
    # plt.scatter(vec[:, 0], vec[:, 1])
    #
    # plt.xlabel('pc1')
    # plt.ylabel('pc2')
    # plt.show()

    # df = pd.DataFrame(vec)

    # 散布図を表示、各点の色にvalueを指定する

    # df.title('歌手',fontproperties = fp)
    df = pd.DataFrame(vec, index=list)
    fig, ax = plt.subplots()
    df.plot(0, 1, kind='scatter', ax=ax)

    for k, v in df.iterrows():
        ax.annotate(k, xy=(v[0], v[1]), size=10, fontproperties=fp)

    plt.show()


def checkFileNum(path):
    ch = os.listdir(path)
    counter = 0
    for c in ch:
        counter += 1
    return counter


def checkSongsNum(singer):
    ch = os.listdir("C:/Users/aifor/Lyric/"+singer)
    counter = 0
    for c in ch:
        counter += 1
    return counter


def simsinger(singer):

    singer_list = []
    singerdata = np.array([])

    singerdata = np.append(singerdata, model_singer.docvecs[singer])
    singer_list.append(singer)

    for alike_singer in model_singer.docvecs.most_similar(singer, topn=30):
        singer_list.append(alike_singer[0])
        singerdata = np.append(
            singerdata, model_singer.docvecs[alike_singer[0]])

    # map_plot(vecComp(singerdata.reshape(-1, 500)),singer_list)
    return vecComp(singerdata.reshape(-1, 500))


def get_most_alike_20_singers(singer):
    return model_singer.docvecs.most_similar(singer, topn=20)


def main_component_analysis_2(singer):
    return simsinger(singer)

# print("歌手の類似度検索を行います")
# val = input('調べたい歌手名を入力してください: ')
# while val != "end":
#     simsinger(val)
#     # print(model_singer.docvecs.similarity(val,"AAA"))
#     # print(model_singer.docvecs.most_similar(val))
#     # vecComp(model_singer.docvecs[val])
#     # print(model_singer.docvecs.most_similar(positive=[val,"ゆず"],topn=3))
#     # print(model_singer.docvecs.most_similar(positive=[val,u"ゆず"],topn=3))
#     val = input('調べたい歌手名を入力してください: ')
# print("終了します")


# similar()
# corsong("鬼束ちひろ","ゆず")


# singer_counter=0
# singerdata=np.array( [] )
# singer_list=[]
# for singer in os.listdir("C:/Users/aifor/Lyric/"):
#     if  checkFileNum("C:/Users/aifor/Lyric/"+singer+"/") > 100:
#         print(singer)
#         singer_counter = singer_counter+1
#         singerdata = np.append(singerdata,model_singer.docvecs[singer])
#         singer_list.append(singer)
#         if singer_counter>30:
#             break
#
# map_plot(vecComp(singerdata.reshape(-1, 500)),singer_list)
