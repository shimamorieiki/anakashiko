import os


# def lyric_open(song):
#     with open('./edit/'+song,'r',encoding='utf_8') as f:
#         data_lines = f.read()
#
#     # 文字列置換
#     data_lines = data_lines.replace("<br>", "\n")
#     data_lines = data_lines.replace('<td style="padding-left:30px;" class="noprint kasi_honbun">', "")
#     data_lines = data_lines.replace("<!-- 歌詞 end -->","")
#     data_lines = data_lines.replace("</td>","")
#
#     # 同じファイル名で保存
#     with open('./edit/'+song,'w',encoding='utf_8') as f:
#         f.write(data_lines)
#
#
# for song in os.listdir("edit"):
#     lyric_open(song)

def lyric_open(url, song):
    with open(url+song, 'r', encoding='utf_8') as f:
        data_lines = f.read()
        print(data_lines)

    # 文字列置換
    data_lines = data_lines.replace('\n', ' ')

    # 同じファイル名で保存
    with open(url+song, 'w', encoding='utf_8') as f:
        f.write(data_lines)


for song in os.listdir("./Lyric/あいみょん/"):
    lyric_open("./Lyric/あいみょん/", song)

for song in os.listdir("./Lyric/ゆず/"):
    lyric_open("./Lyric/ゆず/", song)

for song in os.listdir("./Lyric/奥華子/"):
    lyric_open("./Lyric/奥華子/", song)
