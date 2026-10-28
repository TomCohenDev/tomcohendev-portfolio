/**
 * Hand-drawn Hebrew letters for the homepage hero, drawn as marker strokes so they can "write themselves"
 * (the same idea as the English HandwritingMVP.tsx, which uses traced paths).
 *
 * Each letter is a list of strokes in the order a hand would draw them, in a box `w` wide.
 * The writing line: letters hang from y=34 to the baseline at y=98; ל rises to y=6 and ק drops to y=128.
 * `writeWord` lays a phrase out right to left (Latin words left to right) and adds a little wobble,
 * so it reads as handwriting rather than a font.
 */
type Letter = { w: number; strokes: string[] };

const LETTERS: Record<string, Letter> = {
  א: { w: 54, strokes: ["M6 32 C18 52 34 74 50 98", "M47 30 C48 44 42 54 30 62", "M24 60 C12 70 9 84 9 98"] },
  ב: { w: 50, strokes: ["M5 34 C20 33 32 32 38 34 C43 36 44 42 44 50 L44 96", "M52 98 C36 98 18 98 4 97"] },
  ד: { w: 48, strokes: ["M4 34 C20 34 34 33 48 33", "M38 34 C39 56 39 78 39 100"] },
  ו: { w: 16, strokes: ["M3 37 C6 32 11 32 12 38 C12 60 12 80 12 100"] },
  ט: { w: 50, strokes: ["M28 50 C30 40 22 33 14 36 C9 38 8 46 8 56 L8 80 C8 94 16 99 27 99 C40 99 46 92 46 78 L46 32"] },
  י: { w: 16, strokes: ["M3 35 C8 31 13 32 13 38 C13 46 12 52 10 58"] },
  כ: { w: 46, strokes: ["M5 34 L26 34 C38 34 43 42 43 54 L43 80 C43 92 36 98 25 98 L5 98"] },
  ל: { w: 44, strokes: ["M7 6 C7 18 7 30 8 42 C9 46 12 48 18 48 L32 48 C40 48 42 54 40 62 C37 76 30 88 22 100"] },
  ם: { w: 48, strokes: ["M8 34 L40 34 C44 34 44 38 44 42 L44 98 L8 98 C7 76 7 54 8 34"] },
  מ: { w: 52, strokes: ["M6 34 C10 56 12 76 12 98", "M10 40 C14 34 20 33 30 33 C42 33 46 40 46 52 L46 98 L24 98"] },
  נ: { w: 30, strokes: ["M4 34 C14 33 22 34 24 40 L24 90 C24 96 21 98 15 98 L3 98"] },
  ס: { w: 48, strokes: ["M4 34 L44 34 C46 62 42 86 32 94 C24 100 14 98 10 88 C6 76 6 56 8 36"] },
  ע: { w: 50, strokes: ["M45 32 C46 60 38 84 22 94 C14 98 8 98 3 98", "M9 32 C12 52 20 66 32 76"] },
  פ: { w: 46, strokes: ["M5 34 L26 34 C38 34 43 42 43 54 L43 80 C43 92 36 98 25 98 L5 98", "M7 36 C6 46 10 54 18 54"] },
  צ: { w: 48, strokes: ["M7 32 C12 56 30 72 40 80 C46 86 46 96 38 98 L4 98", "M43 32 C44 44 38 54 28 60"] },
  ק: { w: 46, strokes: ["M5 34 L32 34 C40 34 43 40 43 48 L43 94", "M9 54 C9 80 9 104 9 128"] },
  ר: { w: 42, strokes: ["M4 34 L26 34 C35 34 39 40 39 50 L39 100"] },
  ש: { w: 56, strokes: ["M50 32 C52 68 46 90 30 97 C18 102 8 92 6 70 C5 56 5 44 6 32", "M28 32 C27 50 30 64 38 78"] },
  ת: { w: 50, strokes: ["M4 34 L32 34 C41 34 45 40 45 50 L45 100", "M13 36 C13 60 13 82 13 96 C13 99 10 100 5 100"] },
  A: { w: 46, strokes: ["M4 100 L23 32 L42 100", "M11 76 L35 76"] },
  I: { w: 12, strokes: ["M6 32 L6 100"] },
};

const GAP = 9;
const SPACE = 28;
const PAD = 8;
export const HAND_HEIGHT = 138;

export type HandStroke = { d: string; transform: string };

// Small, repeatable wobble per letter: the same word always looks the same.
const wobble = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x) - 0.5;
};

export const writeWord = (text: string) => {
  const words = text.split(" ");
  const widthOf = (word: string) =>
    [...word].reduce((sum, ch) => sum + LETTERS[ch].w, 0) + GAP * (word.length - 1);
  const width = words.reduce((sum, word) => sum + widthOf(word), 0) + SPACE * (words.length - 1) + PAD * 2;

  const strokes: HandStroke[] = [];
  let right = width - PAD;
  let n = 0;
  for (const word of words) {
    const letters = [...word];
    const ltr = /^[A-Za-z]+$/.test(word);
    // Hebrew letters go right to left; a Latin word keeps its own left-to-right order inside the line.
    let x = ltr ? right - widthOf(word) : right;
    for (const ch of letters) {
      const { w, strokes: paths } = LETTERS[ch];
      const left = ltr ? x : x - w;
      const dy = wobble(n, 1) * 5;
      const rotate = wobble(n, 2) * 5;
      const transform = `translate(${left.toFixed(1)} ${dy.toFixed(1)}) rotate(${rotate.toFixed(1)} ${w / 2} 66)`;
      for (const d of paths) strokes.push({ d, transform });
      x = ltr ? x + w + GAP : x - w - GAP;
      n++;
    }
    right -= widthOf(word) + SPACE;
  }
  return { width, strokes };
};

export const supported = (text: string) => [...text].every((ch) => ch === " " || ch in LETTERS);
