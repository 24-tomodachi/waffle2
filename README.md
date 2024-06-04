# 環境構築
## 必須
1. リポジトリをクローンする
```sh
git clone git@github.com:24-tomodachi/waffle2.git
cd waffle2
```

2. ライブラリのインストール
```sh
npm i
```

3. リポジトリ直下に `.env.development.local` ファイルを作成
- 中身は [これ](https://discord.com/channels/1227430023808417822/1245541355229413386/1245541386204479569) をコピー

4. 起動する
```sh
npm run dev
```

5. ブラウザから表示する
http://localhost:3000

## 任意
### テスト環境を構築する
- 前提環境
  - Docker Desktop をインストールする（[参考](https://zenn.dev/seiya0/articles/tech-docker-desktop-for-win-install)）
  - [supabase](https://supabase.com/) にアカウントを作成する

- CLIからログインする
```sh
npx supabase login
```
- `Press Enter to open browser and login automatically` と表示されるので、Enter
  - ブラウザが起動するので、さっき作成したアカウントでログイン
  - `You are now logged in. Happy coding!` と表示されたら OK

- CLI とプロジェクトを紐づける<br>
  - プロジェクトにsupabaseアカウントを追加する必要があるので、 よつまで連絡してください
```
npx supabase link --project-ref btomwxhenxidjudolnzs
```

- ローカルにデータベースを構築する
```
npx supabase start
```
  - 成功するとログが表示されるので、以下の値をメモ
    - `API URL`
    - `anon key`

- 環境変数ファイルを作成する<br>
  - `.env.test.local` を作成し、以下のように記入（<>はさっきメモした値）
```
# supabase
SUPABASE_URL=<API URL>
SUPABASE_KEY=<anon key>
SUPABASE_DB_PASSWORD=
```

- テストを実行してみる
```
npm run test
```
  - テストが実行され、すべて通っている（passed）なら OK
