# Publish this portfolio to GitHub

Your code is committed locally. Follow these steps **in Terminal** (not in the browser upload UI).

## Step 1 — Log in to GitHub (one time)

GitHub CLI is installed. Run:

```bash
gh auth login
```

Choose:

1. **GitHub.com**
2. **HTTPS**
3. **Login with a web browser** (easiest)
4. Copy the code, press Enter, and approve in the browser

## Step 2 — Create the repo and push

From this folder:

```bash
cd /Users/mhawara/Desktop/portfolio

gh repo create portfolio --public --source=. --remote=origin --push
```

If GitHub says the repo already exists:

```bash
git push -u origin main
```

## If `gh repo create` fails

1. Create an empty repo manually: https://github.com/new  
   - Name: `portfolio`  
   - **Do not** add README, .gitignore, or license  

2. Push:

```bash
cd /Users/mhawara/Desktop/portfolio
git push -u origin main
```

## Remote already set

```text
origin  git@github.com:Mahmoud-Hawara/portfolio.git
```

## Common mistakes

| Problem | Fix |
|--------|-----|
| "Repository not found" | Create the repo on GitHub first (Step 2) |
| "Authentication failed" | Run `gh auth login` again |
| "remote origin already exists" | Use `git push -u origin main` only |
| Uploading via website | Use `git push` instead — large photos fail in the web UI |

## After publish

Your repo will be: **https://github.com/Mahmoud-Hawara/portfolio**

Deploy free hosting with Vercel: connect that repo at https://vercel.com/new
