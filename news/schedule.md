# Daily news: the steps of a run

The T3 scheduled task on the Vienna VPS runs these steps every morning at 07:00 Israel time.
Its prompt says which checkout and branch to use; do everything in that checkout, on that branch.
`<date>` is today in Israel (`TZ=Asia/Jerusalem date +%F`).

1. **Stop early when there is nothing to do.**
   - If `news/PAUSED` exists, stop and reply "paused" and the file's text.
   - Run `git pull --ff-only`. If it fails, stop and report the error.
   - If `news/issues/<date>.json` already exists, stop and reply "already published".
2. **Fetch.** Run `node news/scripts/fetch.mjs`. It writes `news/desk/<date>/items.json` and prints which feeds failed.
   If every feed failed it exits with 1: stop and report.
3. **Choose.** Read `news/skill/SKILL.md`, then `news/desk/<date>/items.json` and the issues of the last 7 days in `news/issues/`.
   Choose 4 to 6 stories, up to 12 flashes and up to 12 releases by the rules in SKILL.md. Open the source page of everything you choose
   and write from it, not from the feed text.
   You may add up to 2 stories you found by web search, each with its real source URL.
4. **Write** `news/desk/<date>/picks.json` in the format in SKILL.md.
5. **Check.** Run `node news/scripts/publish.mjs`. When it lists problems, fix them in `picks.json` and run it again.
   A story or flash whose source does not answer is dropped or replaced. If fewer than 3 good stories are left, stop: nothing is published, report why.
6. **Build.** If `node_modules` is missing, run `npm ci`. Then `npm run build` and `node scripts/check-site.mjs`.
   If either fails, do not commit: run `git checkout -- news/issues` and report the error.
7. **Publish.** Commit only the issue file and push:

   ```sh
   git add news/issues/<date>.json
   git commit -m "feat(news): issue <date>"
   git push
   ```

   If the push is rejected, run `git pull --rebase` once and push again.
8. **Check the live page.** On `main`, Cloudflare deploys within a few minutes: open `https://tomcohen.dev/news` until it shows the first headline
   (try every minute, up to 10 minutes). On another branch there is no live page; skip this step.
9. **Report** in the T3 thread, in Hebrew:
   - the link (`https://tomcohen.dev/news`, or the branch name);
   - the headlines;
   - feeds that failed, stories that were dropped, and anything else that went wrong.

Never publish anything that did not pass `publish.mjs`. Never edit an issue that is already published; a correction is a new commit that changes
only that issue file, made by Tom or at his request.
