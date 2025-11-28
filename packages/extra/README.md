# MusicFree 前端添加额外功能

> 仅适用于 Desktop ！！

## 特性
+ 歌单导出为 JSON 文件
+ 下载音乐时自动下载歌词

## 准备
> 在 MusicFree v0.0.8 下测试通过，其他版本可能需要自行摸索

+ 拷贝以下代码保存为 `patch.sh` 文件，放置到程序目录下
  ```bash
  #!/bin/bash

  DAY=$(date +"%Y%m%d_%H%M")

  APP="$1"
  if [ -z $APP ]; then
      APP=.
  fi

  WWW="$APP/resources/app/.webpack/renderer/main_window"
  if ! [ -d $WWW ]; then
      echo 'Directory not found: ' $WWW
      exit 1
  fi

  WWW=$(realpath "$WWW")

  pushd "$WWW" > /dev/null

  if ! [ -f index.html-original ]; then
      cp -fv index.html index.html-original
  fi

  if ! [ -f index.js-original ]; then
      cp -fv index.js index.js-original
  fi

  URL=$2
  if [ -z $URL ]; then
      URL=https://billy-poon.github.io/musicfree/packages/extra/dist/extra.js
  fi

  sed -e "s|</body>|<script src='$URL'></script>&|" "$WWW/index.html" index.html-original > index.html

  sed -e 's|t.ee=new a.default,|window.$downloaderEmitter=&|' "$WWW/index.js" index.js-original > index.js

  popd > /dev/null
  ```
+ 运行 `patch.sh` 脚本，在程序启动时加载额外的代码
  ```bash
  chmod +x ./patch.sh

  ./patch.sh
  ```

## 歌单导出为 JSON 文件

在主窗口左侧歌单列表上右键点击歌单，在菜单中选择 “导出歌单”，然后指定保存位置即可。

## 下载音乐时自动下载歌词

歌词下载是自动进行的，当音乐下载完成后，会在音乐文件目录下生成同名的 `.lrc` 歌词文件
