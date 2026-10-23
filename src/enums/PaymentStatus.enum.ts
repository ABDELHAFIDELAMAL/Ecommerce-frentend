
  git add .
  git commit -m "feat : complete project structure and productService"
  git push origin angular-branch
  git switch main
  git pull origin main
  git merge angular-branch into main
  git push origin main
