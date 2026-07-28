import { trust } from "@/lib/data";
import { iconMap, type IconName } from "./icons";
import Reveal from "./Reveal";

export default function TrustStrip() {
  return (
    <section className="border-b border-border bg-white">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-5">
          {trust.map((item, i) => {
            const Icon = iconMap[item.icon as IconName];
            // 5 items in a 2-col phone grid leaves the 5th alone in the last
            // row. Span it across both columns on phones so its content
            // centres. Reset to a single column at lg so the 5-column
            // layout is unaffected.
            //
            // At md, 5 items don't fill a 3-column grid evenly — the last
            // row would have 2 items stuck against the left edge with an
            // empty 3rd column. Doubling the grid to 6 columns and giving
            // every item a 2-column span reproduces the same 3-per-row
            // look, but lets the last two items be explicitly centred
            // (1 empty column on each side) instead of left-aligned.
            const isLast = i === trust.length - 1;
            const isSecondLast = i === trust.length - 2;
            return (
              <Reveal
                key={item.title}
                delay={i * 100}
                variant="scale-up"
                className={`flex flex-col items-center gap-2 px-4 py-7 text-center transition-colors hover:bg-bg-2 md:col-span-2 lg:col-span-1 ${
                  isLast
                    ? "col-span-2 md:col-start-4 lg:col-start-auto"
                    : isSecondLast
                      ? "md:col-start-2 lg:col-start-auto"
                      : ""
                }`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-semibold text-text">{item.title}</h3>
                <p className="text-xs leading-relaxed text-muted">{item.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
