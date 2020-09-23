import MeCab
m = MeCab.Tagger()
with open('./Lyric/GLAY/DARK_RIVER.txt', 'r', encoding='utf_8') as inputf:
    intext = inputf.read()
    node = m.parseToNode(intext)
    result = []
    while node is not None:
        # 品詞分類情報取得
        hinshi = node.feature.split(',')[0]
        if hinshi in ["名詞"]:
            result.append(node.surface)
        elif hinshi in ["動詞", "形容詞", "副詞", "助動詞"]:
            result.append(node.feature.split(',')[6])
        elif hinshi in ["助詞"]:
            result.append(node.feature.split(',')[6])
        node = node.next
    print(intext)
    print("\n")
    print(m.parse(intext))
    print("\n")
    print(result)
