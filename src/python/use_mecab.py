import MeCab
tagger = MeCab.Tagger(
    "-d /usr/lib/x86_64-linux-gnu/mecab/dic/mecab-ipadic-neologd")
print(tagger.parse("中居正広の金曜日のスマたちへ"))
