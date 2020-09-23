import MeCab
tagger = MeCab.Tagger("")
# tagger.parse("")
# with open('./testsongs/HOWEVER.txt','r',encoding='utf_8') as inputf:
#     intext=inputf.read()
#     node = tagger.parseToNode(intext)
#     result =[]
#     while node is not None:
#         #品詞分類情報取得
#         hinshi = node.feature.split(',')[0]
#         if hinshi in ["名詞"]:
#             #表層系の取得
#             result.append(node.surface)
#         elif hinshi in ["動詞","形容詞"]:
#             #形態素情報から原型情報を取得
#             result.append(node.feature.split(',')[6])
#         node = node.next
#     print(result)
print(tagger.parse("いい絵を画くことができる"))
