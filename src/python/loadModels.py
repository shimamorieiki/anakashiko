from gensim import models


# MeCabの初期化
if __name__ == '__main__':

    model_song = models.Doc2Vec.load(
        '/home/tk/Documents/prog/anakashiko-DATA/models/song.model')
    model_singer = models.Doc2Vec.load(
        '/home/tk/Documents/prog/anakashiko-DATA/models/singer.model')

    print(model_singer.docvecs.most_similar("嵐", topn=20))
