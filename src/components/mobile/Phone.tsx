import type { CSSProperties, ReactNode } from "react";

/**
 * A modern phone drawn in CSS. The screen is a size container, so everything inside is sized in cqw
 * and the same screen works at any phone width. `statusDark` switches the status bar to dark text
 * for light screens; `android` draws a punch-hole camera and flatter corners instead of the island.
 */
export const Phone = ({
  children,
  className = "",
  style,
  statusDark = false,
  android = false,
  label,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  statusDark?: boolean;
  android?: boolean;
  label?: string;
}) => (
  <div
    role={label ? "img" : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : true}
    className={`m-phone relative aspect-[9/19.2] ${android ? "is-android" : ""} ${className}`}
    style={style}
  >
    {/* Side buttons */}
    {!android && (
      <>
        <span aria-hidden="true" className="absolute -left-[1.6%] top-[17%] h-[5%] w-[1.8%] rounded-l-sm bg-[#3b3e3d]" />
        <span aria-hidden="true" className="absolute -left-[1.6%] top-[25%] h-[9%] w-[1.8%] rounded-l-sm bg-[#3b3e3d]" />
        <span aria-hidden="true" className="absolute -left-[1.6%] top-[36%] h-[9%] w-[1.8%] rounded-l-sm bg-[#3b3e3d]" />
      </>
    )}
    <span aria-hidden="true" className="absolute -right-[1.6%] top-[22%] h-[8%] w-[1.8%] rounded-r-sm bg-[#3b3e3d]" />
    <span aria-hidden="true" className="absolute -right-[1.6%] top-[33%] h-[13%] w-[1.8%] rounded-r-sm bg-[#3b3e3d]" />

    <div className="m-phone-body absolute inset-0 rounded-[15%/7%] p-[3.2%]">
      <div aria-hidden="true" className="relative h-full w-full overflow-hidden rounded-[12.5%/5.8%] bg-black [container-type:inline-size]">
        {children}
        {/* Status bar and Dynamic Island sit above every screen. */}
        <div
          dir="ltr"
          className={`pointer-events-none absolute inset-x-0 top-0 z-30 flex h-[12cqw] items-center justify-between px-[8cqw] text-[3.6cqw] font-semibold ${
            statusDark ? "text-[#1d201f]" : "text-white"
          }`}
        >
          <span>9:41</span>
          <span className="flex items-center gap-[1.2cqw]">
            <span className="flex items-end gap-[0.5cqw]">
              {[1.2, 1.8, 2.4, 3].map((h) => (
                <span key={h} className="w-[0.8cqw] rounded-[0.3cqw] bg-current" style={{ height: `${h}cqw` }} />
              ))}
            </span>
            <span className="relative h-[2.8cqw] w-[5.6cqw] rounded-[0.9cqw] border-[0.35cqw] border-current p-[0.35cqw] opacity-90">
              <span className="block h-full w-[78%] rounded-[0.4cqw] bg-current" />
            </span>
          </span>
        </div>
        {android ? (
          <div className="pointer-events-none absolute left-1/2 top-[3.2cqw] z-30 h-[4.6cqw] w-[4.6cqw] -translate-x-1/2 rounded-full bg-black ring-[0.6cqw] ring-[#111]" />
        ) : (
          <div className="pointer-events-none absolute left-1/2 top-[2.6cqw] z-30 h-[7.6cqw] w-[28cqw] -translate-x-1/2 rounded-full bg-black" />
        )}
        <div className="pointer-events-none absolute bottom-[1.8cqw] left-1/2 z-30 h-[1.1cqw] w-[34cqw] -translate-x-1/2 rounded-full bg-white/60 mix-blend-difference" />
        {/* Glass glare */}
        <div className="pointer-events-none absolute inset-0 z-40 bg-[linear-gradient(115deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.03)_28%,transparent_42%)]" />
      </div>
    </div>
  </div>
);
