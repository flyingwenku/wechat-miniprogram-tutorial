# 第 8 章 · 把代码放上 GitHub

GitHub 是全球最大的代码托管平台。把代码放上去有三个好处：

- 💾 **备份**：电脑坏了代码不丢
- 🌍 **开源分享**：别人能看、能学、能 Star
- 🔗 **给教程一个家**：本教程的配套代码就放在这里

---

## 8.1 仓库已经建好了

本教程的配套仓库地址是：

> 🔗 <https://github.com/flyingwenku/wechat-miniprogram-tutorial>

你跟着做时，也可以自己建一个（右上角「+」→ New repository，名字随意，选 Public 公开）。

<div class="note">

本仓库里**同时放了三样东西**：小程序代码 + 本教程的 Markdown 文档 + 用 docsify 生成的静态网页（在 `docs/` 目录）。GitHub Pages 可以直接拿 `docs/` 当网站发布，读者点开就是一本在线书。

</div>

---

## 8.2 小白版：把代码推上去

如果你没用过 Git，照下面步骤（在电脑上装好 Git 后，在 `miniprogram-tutorial` 文件夹里右键「Git Bash Here」）：

```bash
# 1. 告诉 Git 你是谁（只第一次需要，填你自己的昵称和邮箱）
git config --global user.name  "你的昵称"
git config --global user.email "你的邮箱@example.com"

# 2. 初始化并关联远程仓库
git init
git remote add origin git@github.com:flyingwenku/wechat-miniprogram-tutorial.git

# 3. 把当前所有代码加进来
git add .

# 4. 写一句本次提交说明
git commit -m "feat: 初版小程序教程（控件+案例+题库+硬件）"

# 5. 推送到 GitHub
git push -u origin main
```

<div class="note">

📷 **图待补**：代码推上 GitHub 后，浏览器打开仓库主页的样子（显示 README 和 `docs/` 文件夹）。

</div>

<div class="warn">

⚠️ 第一次连接 GitHub 可能提示「无法验证主机密钥」或要你填账号密码。这是正常的，按提示选「Yes / 继续」即可。如果用 SSH 方式，需先把自己电脑的 SSH 公钥加到 GitHub 账户里（GitHub 帮助文档有图文步骤）。

</div>

---

## 8.3 以后怎么更新

每次让 AI 改完、你在工具里验收通过后：

```bash
git add .
git commit -m "fix: 修了 XX 问题"
git push
```

就这么简单，不用记复杂命令。

---

## 8.4 本章小结 & 下一步

- ✅ 知道了 GitHub 是干嘛的、为什么放上去
- ✅ 学会了 `add / commit / push` 三板斧（小白够用）
- ✅ 知道本仓库同时含代码 + 教程 + 网页

最后一步：把你手里的「测试号版本」变成「真正属于你的小程序」。

> ➡️ [第 9 章 · 脱敏替换指南](09-replace.md)
