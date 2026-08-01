import React from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CategoryGridProps = React.ComponentProps<"div">;

const categories = [
  "The Creative",
  "The Entrepreneur",
  "The Student",
  "The Career Changer",
  "The Artist",
  "The Searcher",
];

const borderStyles = [
  "border-r border-b border-zinc-700/30", // 1. The Creative
  "border-b md:border-r border-zinc-700/30", // 2. The Entrepreneur
  "border-r md:border-r-0 border-b border-zinc-700/30", // 3. The Student
  "border-b md:border-b-0 md:border-r border-zinc-700/30", // 4. The Career Changer
  "border-r border-zinc-700/30", // 5. The Artist
  "", // 6. The Searcher
];

export function WhoIHelpGrid({ className, ...props }: CategoryGridProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x border-zinc-700/30 md:grid-cols-3",
        className
      )}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-zinc-700/30" />

      {categories.map((title, index) => (
        <div
          key={title}
          className={cn(
            "relative flex items-center justify-start md:justify-center bg-transparent px-6 py-10 md:py-12 text-left md:text-center transition-colors duration-300 hover:bg-[#141414]",
            borderStyles[index]
          )}
        >
          <span className="font-normal text-xl text-white tracking-tight md:text-2xl">
            {title}
          </span>

          {index === 0 && (
            <PlusIcon
              className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-zinc-700/30"
              strokeWidth={1}
            />
          )}

          {index === 1 && (
            <PlusIcon
              className="-right-[12.5px] -bottom-[12.5px] absolute z-10 hidden md:block size-6 text-zinc-700/30"
              strokeWidth={1}
            />
          )}

          {index === 2 && (
            <PlusIcon
              className="-right-[12.5px] -bottom-[12.5px] absolute z-10 md:hidden size-6 text-zinc-700/30"
              strokeWidth={1}
            />
          )}
        </div>
      ))}

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-zinc-700/30" />
    </div>
  );
}
