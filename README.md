# Bar千手酒量心理測驗

純 HTML / CSS / JavaScript，無建置步驟、無外部套件、無登入、無資料庫。答案僅存在目前頁面記憶體，重新整理會清除。

## 免費 GitHub Pages 部署

1. 解壓縮 ZIP，在 GitHub 建立 Public 儲存庫，例如 `bar-senshu-quiz`。
2. 把本資料夾內的 `index.html`、`style.css`、`app.js`、`.nojekyll` 和整個 `assets` 資料夾上傳到儲存庫根目錄。根目錄必須直接看到 `index.html`，不要再包一層資料夾。
3. 到儲存庫 Settings → Pages，Source 選 Deploy from a branch，Branch 選 main、資料夾選 /(root)，按 Save。
4. 等部署完成，使用 Pages 顯示的 HTTPS 網址分享給客人。訪客無須 GitHub 帳號。圖片分享功能需使用支援的行動瀏覽器及 HTTPS；不支援時可下載後自行分享。

官方說明：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 使用

首頁 → 開始測驗 → 每題選一個選項，再按下一題 → 結果。可返回修改答案、下載原始結果 PNG、透過系統分享圖片、重新測驗或返回首頁。下載的原圖保持不變，不額外合成個人分數；分數顯示在結果頁。

可直接開啟 `index.html` 檢視與作答；完整分享功能請在 HTTPS 網站使用。未支援圖片分享時會提示使用下載功能；手機如開啟原圖可長按儲存。

## 原圖對應（檔名只簡化，圖片內容未修改）

| 用途 | 原始檔名末尾 | 網站路徑 |
| --- | --- | --- |
| 首頁規則 | _7.png | assets/7.png |
| QUESTION 1 | _10.png | assets/10.png |
| QUESTION 2 | _11.png | assets/11.png |
| QUESTION 3 | _9.png | assets/9.png |
| QUESTION 4 | _6.png | assets/6.png |
| QUESTION 5 | _8.png | assets/8.png |
| QUESTION 6 | _5.png | assets/5.png |
| 巨蟒 15–18 | _1.png | assets/1.png |
| 鱷魚 10–14 | _2.png | assets/2.png |
| 老虎 5–9 | _4.png | assets/4.png |
| 水豚 0–4 | _3.png | assets/3.png |

每題 A=3、B=2、C=1、D=0，六題總分 0–18。
