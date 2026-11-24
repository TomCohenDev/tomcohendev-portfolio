---
title: "Slides That Do Things: A Complete Guide to Interactive Lessons With Claude Code"
description: "I stopped making my courses in Gamma, Google Slides and Canva. A step-by-step guide from an empty folder to a course online: a loop that runs itself, Python inside the slide, a simulation with sliders, student notes on a phone, PDF, and an AI agent that organizes the course."
slug: interactive-slides-en
lang: en
translation: interactive-slides
layout: ../../layouts/ArticleLayout.astro
author: Tom Cohen
researchedThrough: "2026-11-24"
tags: ["Teaching", "AI", "English"]
---

I stopped making my courses in Gamma, Google Slides and Canva. Today I build them with Claude Code: slides in HTML, CSS and JavaScript that actually do things. A loop that runs itself step by step, Python that students edit and run inside the slide, a hydraulic press where you drag a slider and watch the force change.

I already have 58 of these presentations at [teach.tom-cohen.com](https://teach.tom-cohen.com). In [I Replaced My Slides With Code](/blog/teach-site-en) I wrote about why I switched and what it changed in class. This post is the guide: how to build it yourself, step by step, even if you've never opened a terminal.

<figure style="margin:2.25rem auto;max-width:380px;">
<video src="/blog/interactive-slides/reel-he.mp4" poster="/blog/interactive-slides/reel-he.webp" width="540" height="960" controls playsinline preload="metadata" aria-label="A short video, in Hebrew: why I stopped making slides in Gamma, Google Slides and Canva. My old deck next to the same subject in code, a loop that runs step by step, Python inside the slide, a hydraulic press with sliders, a 3D buoy, a lesson on a phone, PDF, and an AI agent organizing the course." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">The short version, in two minutes (in Hebrew). My old and new decks are recorded from my screen, the other slides from teach.tom-cohen.com; the terminal, the editor and the Google Slides loop slide are reconstructions.</figcaption>
</figure>

## What you'll have at the end

- **One folder for the course**, with a rules file Claude reads every time, so you never explain again how you teach.
- **A lesson on loops** with a slide that runs the loop itself: the current line is highlighted, and i and sum fill a trace table on every arrow press.
- **Python that runs inside the slide.** Students change a number, press Run, and see the result.
- **A simulation with sliders**, where every number on screen is computed and checked.
- **A note for the student under every slide**, and a lesson that opens on a phone as one scrolling page.
- **A PDF** for anyone who studies on paper.
- **A course organized into units** with a home page, and a rules file any AI agent can work by.
- **An address online**, free, without buying a domain.

## Why it's worth switching

For me the big difference isn't the animation. It's that the slide is code:

- **One example, no copies.** The code on the slide is the code students run. Fix it once and it's fixed everywhere.
- **A change before class is two lines.** Want the example to be about grades instead of prices? Change two lines, or ask Claude.
- **History.** With git I can see what I changed from one semester to the next, and why.
- **Better access to the material.** Students open every lesson on their phone, with the explanation under each slide, and print when they need to.
- **An AI agent can work on the course.** It's all text files, so Claude, or any other agent, can organize units, link lessons and build pages.

The first slide takes a little time. Once there's a template and rules, it saves me hours.

## What you need

- **A paid Claude plan.** Claude Code [is included in Pro, Max, Team and Enterprise](https://code.claude.com/docs/en/setup). It isn't included in the free plan.
- **A Windows or Mac computer,** and a browser.
- **No programming knowledge.** You describe the lesson, Claude writes the code, and you check it.

Anthropic updates Claude often, so some names may look slightly different for you. The way it works stays the same.

## Step 1: open a folder and start Claude Code

There are two ways, and both work in the same folder.

**No terminal: the Claude desktop app.** Download the [Claude app](https://code.claude.com/docs/en/desktop-quickstart) for Windows or Mac and go to the **Code** tab. Choose a local environment (Local), click the folder picker, **Open folder…**, and create a new folder called `my-course`. If you want to approve every change yourself, choose the manual permission mode.

**With a terminal.** Install with one command. On Windows, in PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

And on a Mac:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Then create a folder and start Claude in it:

```bash
mkdir my-course
cd my-course
claude
```

<figure style="margin:2.25rem 0;">
<video src="/blog/interactive-slides/01-start-en.mp4" poster="/blog/interactive-slides/01-start-en.webp" width="1280" height="720" autoplay muted loop playsinline controls preload="metadata" aria-label="A terminal: create a folder called my-course, go into it and start claude. A request asks for a CLAUDE.md for a first-year C programming course in Hebrew, right to left. Claude writes the file, and it opens beside the terminal with the rules: one lesson per HTML file, 16:9 scenes, a note for the student under every scene, code always left to right." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">A folder, Claude Code, and one request that writes the course's rules file. The steps are shortened.</figcaption>
</figure>

## Step 2: tell Claude how you teach

Claude reads `CLAUDE.md` [at the start of every session](https://code.claude.com/docs/en/memory). Anything you write there once, you never repeat in a request. You can ask Claude to write it:

```text
Create CLAUDE.md for my course: C programming for first-year students. Hebrew, right to left, code left to right. One HTML file per lesson in lessons/. Under every scene, a note for the student.
```

This is roughly what comes out. You can edit it like any text file:

```markdown
# My course: C programming

First-year students. Hebrew, right to left.

- One lesson = one HTML file in lessons/
- A lesson is a list of 16:9 scenes, one idea each
- Arrow keys reveal the steps
- Under every scene: a note written for the student
- Code always left to right, in a monospace font
- Every number on screen is computed, never typed by hand
- Check the lesson on a phone before you finish
```

The most important line is "every number on screen is computed". It's what keeps a wrong number out of the classroom: Claude calculates, it doesn't type.

## Step 3: the first slide, a loop that runs itself

In Google Slides, to show how `i` changes in a loop, I duplicated a slide for every round and moved each number by hand. This is what it looks like when the slide is code:

```text
Build lessons/loops.html: a slide that traces this for-loop step by step, with a trace table for i and sum. Each arrow key press is one step. Compute the table by running the loop in JavaScript, so changing the numbers changes the table.

int sum = 0;
for (int i = 1; i <= 3; i++) {
    sum += i;
}
printf("%d", sum);
```

<figure style="margin:2.25rem 0;">
<video src="/blog/interactive-slides/02-trace-en.mp4" poster="/blog/interactive-slides/02-trace-en.webp" width="1280" height="720" autoplay muted loop playsinline controls preload="metadata" aria-label="Claude reads CLAUDE.md, writes lessons/loops.html, checks that the sum comes out 6 and opens the lesson. In the browser: a slide with the loop's code and a trace table. On every arrow press the current line is highlighted and the table fills: i is 1, 2, 3 with the condition true, sum is 1, 3, 6. When i is 4 the condition is false, and the output is 6." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">One request, and one slide that replaces nine copies. Every arrow press moves the loop one step. A simplified reconstruction; the real slide is on <a href="https://teach.tom-cohen.com/en/p/c-u6-for">teach.tom-cohen.com</a>.</figcaption>
</figure>

Open the file in your browser (double-click `lessons/loops.html`), go through every step, and check it. Not happy? Say it plainly: "the table is too small", "add a column for the condition", "start from i = 0". Claude fixes it.

And now the part that made me switch: want ten rounds instead of three? Change `3` to `10`. The table is computed from the loop itself, so it grows on its own. In Google Slides that was more slides.

## Step 4: Python that runs inside the slide

The browser can run Python with [Pyodide](https://pyodide.org), with nothing installed on students' computers. That's what lets a student change a number and press Run during class:

```text
Add a scene to lessons/lists.html with editable Python that runs in the browser with Pyodide (loaded from jsDelivr on the first Run). A Run button, a Reset button and an output box.
```

<figure style="margin:2.25rem 0;">
<video src="/blog/interactive-slides/03-python-en.mp4" poster="/blog/interactive-slides/03-python-en.webp" width="1280" height="720" autoplay muted loop playsinline controls preload="metadata" aria-label="A slide called What does the basket cost. A code editor with a list of prices 12, 30 and 8 and a loop that adds them up. The cursor presses Run, Python loads in the browser and the output is 50. Then the cursor changes 8 to 20, presses Run again, and the output is 62." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">The first run loads Python into the browser, which takes a few seconds. After that it's instant. A reconstruction; the live version is in <a href="https://teach.tom-cohen.com/en/p/intro-variables">the variables lesson</a>.</figcaption>
</figure>

Two things to know: the first time, the browser downloads Python, so you need internet in class. And if something doesn't load when you open the file by double-clicking it, ask Claude: `Start a local preview server for this folder`.

## Step 5: a simulation with sliders

This is where code starts to replace the whiteboard. In hydraulics, a student asks "what if the piston is bigger?", and instead of drawing it again, you drag:

```text
Add a scene: a hydraulic press with sliders for the small piston diameter d1, the large piston diameter d2 and the input force F1. Show the pressure, the output force and the stroke. Compute everything in physics.js, and write checks for it that run with node.
```

<figure style="margin:2.25rem 0;">
<video src="/blog/teach-site/02-press-en.mp4" poster="/blog/teach-site/02-press-en.webp" width="1280" height="720" autoplay muted loop playsinline controls preload="metadata" aria-label="A hydraulic press simulation. The cursor drags the input force from 200 to 400 newtons and the small piston diameter from 20 to 10 millimetres. The pressure, the output force and the stroke update together." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">Drag the force or the diameter, and the pressure, the output force and the stroke update together. A reconstruction of <a href="https://teach.tom-cohen.com/en/p/hyd-pascal">the press scene</a> from the course.</figcaption>
</figure>

The important part of the request is `physics.js` with checks. Every number on screen comes from one file, and that file has checks that run before you teach. When I moved this lesson over, Claude found that my old deck had the piston area as πd² instead of πd²/4. A slide copied by hand would never have caught it.

More ideas that work well the same way, all from my courses: a [3D buoy](https://teach.tom-cohen.com/en/p/buoy-3d) where you swap the liquid and materials, and a [Carnot cycle](https://teach.tom-cohen.com/en/p/carnot-cycle) with sliders for the hot and cold sources.

## Step 6: notes for students, and a lesson that opens on a phone

A 16:9 slide is too small on a phone. The fix: a written note for the student under every slide, and on a phone the lesson becomes one page you scroll:

```text
In loops.html, add a note for the student under every scene. On a phone, show the lesson as one scrolling page: each scene, then its note.
```

<figure style="margin:2.25rem 0;">
<video src="/blog/interactive-slides/04-phone-en.mp4" poster="/blog/interactive-slides/04-phone-en.webp" width="1280" height="720" autoplay muted loop playsinline controls preload="metadata" aria-label="Claude adds notes to the lesson and adapts it for phones. On the computer: the loop slide with a note for the student under it. Beside it, a phone shows the same lesson as one page: a slide, its note, the trace table, and the Python slide, scrolled by a thumb." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">The same lesson: slides with a note on a computer, one scrolling page on a phone.</figcaption>
</figure>

Write the notes for the student, not for yourself. A student who missed a class reads the same explanation the class heard, and that's what changed access to the material for my students.

## Step 7: PDF for anyone who studies on paper

No server and no library. A button that opens the print dialog, and a print stylesheet:

```text
Add a PDF button that opens the browser's print dialog, and a print stylesheet: one scene per page at 16:9, no buttons on paper, notes printed under each scene.
```

<figure style="margin:2.25rem 0;">
<video src="/blog/teach-site/04-print-en.mp4" poster="/blog/teach-site/04-print-en.webp" width="1280" height="720" autoplay muted loop playsinline controls preload="metadata" aria-label="A test page. The cursor clicks the PDF button, the print dialog opens with Save as PDF, the cursor clicks Save, and a PDF download appears." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">A PDF button that opens the browser's own print dialog. The reader chooses "Save as PDF".</figcaption>
</figure>

## Step 8: let an AI agent organize the course

After a few lessons the folder fills up. This is the second advantage of text files: an AI agent can work on the whole course, not just one slide.

```text
Organize my lessons into units, build index.html as the course page, and move the rules to AGENTS.md so any AI agent follows them.
```

<figure style="margin:2.25rem 0;">
<video src="/blog/interactive-slides/05-organize-en.mp4" poster="/blog/interactive-slides/05-organize-en.webp" width="1280" height="720" autoplay muted loop playsinline controls preload="metadata" aria-label="A file tree with seven lessons in one folder. Claude reads them, creates five units and moves the lessons into them, writes AGENTS.md and course.json, and builds a home page. The tree rearranges into units, and the course page opens with five cards: Basics, Decisions, Loops, Functions and Arrays." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">Seven files in one folder become five units with a course page. The steps are shortened.</figcaption>
</figure>

Why `AGENTS.md`? It's the rules file most coding agents look for, Codex for example. Claude Code [reads it when there's no `CLAUDE.md`](https://code.claude.com/docs/en/memory#agents-md), so the recommendation is to keep a `CLAUDE.md` with one line that imports it:

```markdown
@AGENTS.md
```

That way every agent you open in the folder works by the same rules. From here you can ask for things like "add a practice page to every unit", "find lessons without notes", or "check that every link on the course page works".

When there's something you repeat for every lesson, turn it into a [skill](https://code.claude.com/docs/en/skills): a `.claude/skills/new-lesson/SKILL.md` file with the steps, which Claude loads by itself when a task fits. [I Replaced My Slides With Code](/blog/teach-site-en) has a full example.

## Step 9: publish, for free

For students to reach the lesson, you need an address. You can host files like these for free, without buying a domain:

```text
Publish this folder for free on Cloudflare Workers static assets, and tell me the address.
```

<figure style="margin:2.25rem 0;">
<video src="/blog/teach-site/05-deploy-en.mp4" poster="/blog/teach-site/05-deploy-en.webp" width="1280" height="720" autoplay muted loop playsinline controls preload="metadata" aria-label="A terminal lists a site folder, a three-line wrangler.jsonc, and runs npx wrangler deploy. The files upload and a workers.dev address prints. A phone opens the address and scrolls through lessons in reading mode." style="display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13);background:#1d201f;"></video>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">A folder of lessons goes online with one command and opens on a phone at a free workers.dev address. The address is an example.</figcaption>
</figure>

The first time, Claude will ask you to sign in to a Cloudflare account in the browser. If you prefer GitHub, ask for `Publish this folder with GitHub Pages`. All the details, including the config file, are in [the previous post](/blog/teach-site-en).

## Day to day: a change before class

This is what normal work looks like once everything is set up:

- **"Change the example in the loops lesson from prices to grades."** Two lines, and Claude updates the note too.
- **"What did I change in this lesson since last semester?"** If you work with git, Claude reads the history and sums it up.
- **"Check that every slide in this lesson looks right on a phone."** It opens them, checks, and fixes overflow and text that's too small.

## When something doesn't work

- **Claude got a number wrong.** It happens. That's why every number is computed in one file with checks. Ask: `Add checks for every formula in physics.js and run them`. And either way, go through the lesson before you teach from it.
- **Hebrew and code get mixed up.** Code, formulas and addresses need to run left to right even on a right-to-left page. If something flips, describe what you see ("the brackets in the code are reversed"), and Claude will wrap it in `dir="ltr"`.
- **Python doesn't load.** Check the internet connection, and try through a local preview server (step 4).
- **The slide is too crowded.** Ask for "one idea per slide". It's a rule worth adding to `CLAUDE.md`.
- **Not every slide needs to be interactive.** Sometimes a picture with an arrow is exactly right, and it's fine to ask for just that.

## Where to see it for real

Every example in this post is based on real lessons at [teach.tom-cohen.com](https://teach.tom-cohen.com):

- [for and do…while loops](https://teach.tom-cohen.com/en/p/c-u6-for): the trace table, step by step.
- [Variables](https://teach.tom-cohen.com/en/p/intro-variables): Python running inside the slide.
- [Pascal's law](https://teach.tom-cohen.com/en/p/hyd-pascal): the hydraulic press with sliders.
- [A 3D buoy](https://teach.tom-cohen.com/en/p/buoy-3d) and [the Carnot cycle](https://teach.tom-cohen.com/en/p/carnot-cycle).
- [The C programming course](https://teach.tom-cohen.com/en/courses/c-programming): a whole course, organized into units.

Most of these lessons are in Hebrew. Start with one lesson, the one that's most frustrating to teach from slides. If it works, the second one goes much faster.
