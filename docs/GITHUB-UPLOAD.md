# Upload the source project to GitHub

## Recommended: VS Code terminal / Git

1. Sign in to GitHub and create a **new public repository** named `finals-mevn`.
2. Leave **Add README**, **Add .gitignore**, and **Choose a license** unchecked because this project already has its own files.
3. Copy the actual repository URL into `GitHub-Link.txt` and save it.
4. Open a terminal in the extracted `finals-mevn` directory.
5. Run:

```sh
git init
git add .
git status
git commit -m "Add MEVN student management CRUD application"
git branch -M main
```

Check `git status` before committing: `.env` and `node_modules` must not be staged. The provided `.gitignore` excludes both. Do not force-add them.

6. Replace `YOUR_USERNAME` below with your GitHub username, and use the repository name you actually created:

```sh
git remote add origin https://github.com/YOUR_USERNAME/finals-mevn.git
git push -u origin main
```

Sign in if Git requests authentication. If Git requests your author identity, configure your own name and email with `git config user.name "Your Name"` and `git config user.email "your-email@example.com"`, then repeat the commit.

If you see `src refspec main does not match any`, check that the commit succeeded before pushing. If `origin already exists`, inspect it with `git remote -v` and correct it with `git remote set-url origin YOUR_ACTUAL_REPOSITORY_URL` only if needed.

7. Open the repository page and verify that README, backend, frontend, and package files are visible. The root `package.json` should be at the repository root, not inside an extra nested folder.
8. Open the repository in a signed-out/private window to verify public visibility.

## Alternative: GitHub website upload

For the simplest source upload, use the fresh extracted project **before installing dependencies**. Create a public repository, choose upload files, and drag the contents of `finals-mevn` into it. Include `.gitignore` and both `.env.example` files. Upload source files, not the ZIP. Never drag in real `.env` files or `node_modules`.

## Final assignment ZIP

GitHub source upload and the Canvas ZIP are separate deliverables. For Canvas, include the source folder, the completed `GitHub-Link.txt`, and your screen recording. Exclude `node_modules`, `.git`, and real `.env` files. Keep `.env.example` and `package-lock.json`.
