# Novelgame(Tate-gaki) sample project
[![MIT License](https://img.shields.io/github/license/famibee/SKYNovel_uc.svg)](LICENSE)
![](https://img.shields.io/badge/platform-windows%20%7C%20macos-lightgrey.svg)

[![dependencies](https://david-dm.org/famibee/SKYNovel/status.svg)](https://david-dm.org/famibee/SKYNovel)
[![dependencies](https://david-dm.org/famibee/SKYNovel/dev-status.svg)](https://david-dm.org/famibee/SKYNovel?type=dev)

![logo.svg](https://github.com/famibee/SKYNovel/blob/master/test/icon.svg)

[CHANGELOG.md](CHANGELOG.md)

---
## description（説明）

[梶井基次郎「桜の樹の下には」](https://www.aozora.gr.jp/cards/000074/card427.html)をノベルゲーム化したものです。

![桜の樹の下には](build/manual_th.jpg)

## usage（使用法）

### インストールと環境設定
1. [Node.js と npm](https://nodejs.org/en/)（必ずLTSを）をインストールしておく。
	* 一度マシンを再起動してください。npmへのパスが通ります。
	* （windowsのみ）管理者権限で PowerShell を起動し、【npm i -g windows-build-tools】を実行。「All done!」まで待つ。
2. このページ右上の緑ボタン「Clone or download」をクリック。「Download ZIP」をクリック。
3. ダウンロードしたzipを解凍すると、プロジェクト入りのフォルダになる。
4. [Visual Studio Code](https://code.visualstudio.com/)でこの「フォルダを開く」。
	* [Visual Studio Code [vsCode] 日本語化](https://qiita.com/ntkgcj/items/e77331932c7983dea830)
5. メニューの【ターミナル】-【新しいターミナル】で下部にターミナルが開く。
6. ターミナルで「npm i」、Enter。
	* （webフォルダができれば成功です）

### 普段の開発（PCアプリ版）
1. メニューの【ターミナル】-【タスクの実行】で「npm: start」を選択。
	* 「今後このタスクの出力をスキャンしない」を選択。（以後は聞かれなくなる）
2. サンプルアプリが起動します。

### 普段の開発（ブラウザ版、PCアプリ版を作りたい人も手軽な開発手段として推奨）
1. メニューの【ターミナル】-【タスクの実行】で「npm: web」を選択。
	* 「今後このタスクの出力をスキャンしない」を選択。（以後は聞かれなくなる）
2. 自動でブラウザを開き、フォルダ内ファイル一覧を表示するので、「web.htm」をクリック。
3. ブラウザ版が起動します。

### 配布用アプリパッケージ作成（PCアプリ版）
1. メニューの【ターミナル】-【タスクの実行】で「npm: pack:win」を選択。（Macなら pack:mac）
	* Windows版はWindows OS 上でのみ、Mac版は macOS 上でのみ、作成可能です。
	* Wineというのを使う方法もあるようです。【[ElectronアプリをMac上でWindows向けにビルドする - DRYな備忘録](http://otiai10.hatenablog.com/entry/2017/10/26/174912)】
2. build/ 下に（Windowsでは）「桜の樹の下には Setup.exe」が生成されています。これを配布します。
	* （Macでは）「桜の樹の下には-1.0.0.dmg」が生成されています。これを配布します。

### タスクの説明
- npm start ... Electronでアプリとして起動します。
- npm web ... ローカルサーバーを起動し、ブラウザ版を起動できます。
- npm pack:win ... アプリパッケージを作成します。（Macなら pack:mac）

## License ... [MIT](LICENSE)

## Famibee is ?
- [WebSite : 電子演劇部](https://famibee.blog.fc2.com/)
- [Github](https://github.com/famibee/SKYNovel)
- [npm](https://www.npmjs.com/package/skynovel)
- Twitter ([夕街昇雪](https://ugainovel.blog.fc2.com/))
