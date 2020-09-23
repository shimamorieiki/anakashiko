import urllib.request as req
import zipfile
import os.path
import MeCab
from gensim import models

# MeCabの初期化
mecab = MeCab.Tagger()
mecab.parse("")

# 保存したDoc2Vec学習モデルを読み込む
model = models.Doc2Vec.load('aozora.model')

# 分類用のzipファイルを開き中の文章を取得する


def read_book(auther, book):
    if not os.path.exists(zipname):
        req.urlretrieve(url, zipname)

    with zipfile.ZipFile(zipname, "r") as zf:
        for filename in zf.namelist():
            with zf.open(filename, "r") as f:
                return f.read().decode("shift-jis")

# 引数のテキストを分かち書きして配列にする


def split_words(text):
    node = mecab.parseToNode(text)
    wakati_words = []
    while node is not None:
        hinshi = node.feature.split(",")[0]
        if hinshi in ["名詞"]:
            wakati_words.append(node.surface)
        elif hinshi in ["動詞", "形容詞"]:
            wakati_words.append(node.feature.split(",")[6])
        node = node.next
    return wakati_words

# 引数のタイトル、urlの作品を分類する


def similar(title, url):
    zipname = url.split("/")[-1]

    words = read_book(url, zipname)
    wakati_words = split_words(words)
    vector = model.infer_vector(wakati_words)
    print("---「"+title+"」とよく似た作品は？---")
    print(model.docvecs.most_similar([vector], topn=3))
    print("")


# 各作家の作品をひとつづつ分類
similar("宮沢賢治:よだかの星", "url")
