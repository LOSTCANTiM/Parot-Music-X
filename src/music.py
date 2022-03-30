import sys
import youtube_dl
import os
import shutil
import json

def getSong(link):
    YDL_OPTS = {
        "format": "bestaudio"
    }

    with youtube_dl.YoutubeDL(YDL_OPTS) as ydl:
        ydl.extract_info(link, download=True)
        info = ydl.extract_info(link, download=False)

    print('finished downloading')
    files = os.listdir(os.getcwd())
    for file in files:
        if '.mp3' in file:
            os.rename(file, f"{info['title']}.mp3")
            shutil.move(f"{os.getcwd()}\\{info['title']}.mp3", f"{os.getcwd()}\\src\\audios")
        if '.m4a' in file:
            os.rename(file, f"{info['title']}.m4a")
            shutil.move(f"{os.getcwd()}\\{info['title']}.m4a", f"{os.getcwd()}\\src\\audios")
        if '.webm' in file:
            os.rename(file, f"{info['title']}.webm")
            shutil.move(f"{os.getcwd()}\\{info['title']}.webm", f"{os.getcwd()}\\src\\audios")
        if '.wav' in file:
            os.rename(file, f"{info['title']}.wav")
            shutil.move(f"{os.getcwd()}\\{info['title']}.wav", f"{os.getcwd()}\\src\\audios")


if sys.argv[1] == 'cpj':
    print('connection stable between python and js')
elif sys.argv[1] == 'files':
    print('checking files')
else:
    getSong(sys.argv[1])


sys.stdout.flush()