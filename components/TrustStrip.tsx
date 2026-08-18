import { trust } from "@/lib/data";
import { iconMap, type IconName } from "./icons";
import Reveal from "./Reveal";

export default function TrustStrip() {
  return (
    <section className="border-b border-border bg-white">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {trust.map((item, i) => {
            const Icon = iconMap[item.icon as IconName];
            return (
              <Reveal
                key={item.title}
                delay={i * 100}
                variant="scale-up"
                className="flex flex-col items-center gap-2 px-4 py-7 text-center transition-colors hover:bg-bg-2"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="text-sm font-semibold text-text">{item.title}</h2>
                <p className="text-xs leading-relaxed text-muted">{item.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
