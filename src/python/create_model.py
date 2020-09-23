# import zipfile
import os.path
import urllib.request as req
import MeCab
from gensim import models
from gensim.models.doc2vec import TaggedDocument

# MeCabの初期化
mecab = MeCab.Tagger()
mecab.parse("")

# 学習対象とする青空文庫のリスト
# ここをどうにかして自動で検索できるようにできるとだいぶ助かる
list = [
    {"auther": {
        "name": "人物名",
        "url": "データのurl"},
     "books": [
        {"後は各データごとに処理しないといけない"}
    ]},
    {"二人目も以下同様にする"}
]

# 作品リストを取得してループ処理に回す


def book_list():
    for novelist in list:
        auther = novelist["auther"]
        yield auther, book

# zipファイルを開いて中の文章を取得する


def read_book(auther, book):
    zipname = book["zipname"]
    # zipファイルがなければ取得する
    if not os.path.exists(zipname):
        req.urlretrieve(auther["url"]+zipname, zipname)
    zipfile = book["zipname"]

    # zipファイルを開く
    with zipfile.ZipFile(zipname, "r") as zf:
        # zipファイルに含まれているファイルを開く
        for filename in zf.namelist():
            with zf.open(filename, "r") as f:
                # 今回読むファイルはsjis なので指定してデコード
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


# 作品リストをdoc2vecが読めるTaggedDocument形式にして配列に追加する
documents = []

# 作品リストをループで回す
for auther, book in book_list:
    # 作品の文字列を取得
    words = read_book(auther, book)
    # 作品の文字列を分かち書きに
    wakati_words = split_words(words)
    # TaggedDocumentの作成
    document = TaggedDocument(
        wakati_words, [auther["name"] + ":" + book["name"]])
    documents.append(document)

# TaggedDocumentの配列を用いてdoc2vecの学習モデルを作成
model = models.Doc2Vec(documents, dm=1, vector_size=300, window=5, min_count=1)

# Doc2Vecの学習モデルを保存
model.save('aozora.model')

print("モデル作成完了")
