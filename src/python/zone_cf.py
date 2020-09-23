import MeCab
from gensim import models
from gensim.models.doc2vec import TaggedDocument
import os
import os.path


tagger = MeCab.Tagger()
tagger.parse("")


def lylic_open(singer, song):
    with open('C:/Users/aifor/Lyric/' + singer + '/' + song, 'r',
              encoding='utf_8') as inputf:
        intext = inputf.read()
        node = tagger.parseToNode(intext)
        result = []
        while node is not None:
            # 品詞分類情報取得
            hinshi = node.feature.split(',')[0]
            if hinshi in ["名詞", "連体詞", "副詞"]:
                result.append(node.surface)
            elif hinshi in ["動詞", "形容詞"]:
                result.append(node.feature.split(',')[6])
            elif hinshi in ["助詞"]:
                result.append(node.feature.split(',')[6])
            node = node.next

    print("------------"+song+"-----------")
    return result


def checkFileNum(path):
    ch = os.listdir(path)
    counter = 0
    for c in ch:
        counter += 1
    return counter


singers = []
documents_song = []
documents_singer = []


for singer in os.listdir("C:/Users/aifor/Lyric"):
    singers.append(singer)
    songs = []
    count = 0
    count = checkFileNum("C:/Users/aifor/Lyric/"+singer)
    if count >= 100:
        print(singer)
        for song in os.listdir("C:/Users/aifor/Lyric/"+singer):
            songs.append(song)
            words = lylic_open(singer, song)
            # TaggedDocumentの作成
            document_song = TaggedDocument(
                words, [singer + ":" +
                        song.replace('.txt', '').replace('_', ' ')]
            )
            document_singer = TaggedDocument(words, [singer])
            documents_song.append(document_song)
            documents_singer.append(document_singer)
# 作品リストをdoc2vecが読めるTaggedDocument形式にして配列に追加する


# TaggedDocumentの配列を用いてdoc2vecの学習モデルを作成
model_song = models.Doc2Vec(
    documents_song, dm=1, vector_size=300, window=5, min_count=1)
model_singer = models.Doc2Vec(
    documents_singer, dm=1, vector_size=500, window=5, min_count=1)
# Doc2Vecの学習モデルを保存
model_song.save('song_100.model')
model_singer.save('singer_100.model')

print("モデル作成完了")
