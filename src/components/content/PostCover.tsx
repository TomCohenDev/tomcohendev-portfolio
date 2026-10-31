import type { ReactElement } from "react";
import type { Post } from "./mock";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** One chalk drawing per cover type, in a 240×240 box. */
const drawings: Record<Post["cover"], ReactElement> = {
  phone: (
    <>
      <path d="M78 22C74 22 70 26 70 31L72 210C72 215 76 218 81 218L160 217C165 217 168 213 168 208L167 30C167 25 163 21 158 21Z" {...stroke} />
      <path d="M104 36L134 35" {...stroke} />
      <path d="M90 70L148 68M90 92L136 91M90 114L150 113" {...stroke} strokeWidth={4} opacity={0.7} />
      <path d="M92 150C100 140 112 140 120 150S140 160 148 150" {...stroke} stroke="#f49ac1" />
      <path d="M110 196L128 196" {...stroke} />
    </>
  ),
  flow: (
    <>
      <circle cx="44" cy="70" r="24" {...stroke} />
      <rect x="98" y="100" width="52" height="44" rx="10" {...stroke} stroke="#f2c46d" />
      <circle cx="198" cy="176" r="24" {...stroke} />
      <path d="M64 86C84 98 88 112 96 118" {...stroke} strokeDasharray="2 12" />
      <path d="M152 132C168 142 172 150 178 160" {...stroke} strokeDasharray="2 12" />
      <path d="M86 110L97 119L84 124" {...stroke} />
      <path d="M168 154L180 162L166 166" {...stroke} />
    </>
  ),
  spark: (
    <>
      <path d="M120 26C126 78 140 94 192 100C140 108 126 122 120 176C114 122 100 108 48 100C100 94 114 78 120 26Z" {...stroke} />
      <path d="M190 156C192 176 198 182 216 184C198 187 192 193 190 212C188 193 182 187 164 184C182 182 188 176 190 156Z" {...stroke} stroke="#f2c46d" />
      <path d="M50 160L54 168M36 182L44 184" {...stroke} stroke="#f49ac1" />
    </>
  ),
  store: (
    <>
      <path d="M54 82L186 80L176 206C176 211 172 214 167 214L74 215C69 215 65 211 65 206Z" {...stroke} />
      <path d="M92 82C92 50 102 34 120 34S148 50 148 81" {...stroke} />
      <path d="M120 116L121 178M98 156L121 180L144 156" {...stroke} stroke="#43b581" />
    </>
  ),
  code: (
    <>
      <path d="M78 64L30 120L80 176" {...stroke} />
      <path d="M162 64L210 120L160 176" {...stroke} />
      <path d="M136 46L104 196" {...stroke} stroke="#f49ac1" />
    </>
  ),
};

/**
 * Cover of a post, drawn in the site's chalk style. The share image of each post (phase 4) will be
 * this drawing with the title, rendered to PNG at build time.
 */
export const PostCover = ({ post, className = "" }: { post: Post; className?: string }) => (
  <svg viewBox="0 0 1200 630" aria-hidden="true" className={`block h-auto w-full bg-[#222524] ${className}`}>
    <defs>
      <pattern id={`dots-${post.slug}`} width="26" height="26" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.6" fill="rgba(224,208,193,0.09)" />
      </pattern>
    </defs>
    <rect width="1200" height="630" fill={`url(#dots-${post.slug})`} />
    <g transform="translate(470 120) scale(1.65)" className="text-[#bf95f9]">
      {drawings[post.cover]}
    </g>
    <path d="M90 560C260 548 420 566 600 556S940 546 1110 558" fill="none" stroke="rgba(224,208,193,0.25)" strokeWidth="4" strokeLinecap="round" />
  </svg>
);
