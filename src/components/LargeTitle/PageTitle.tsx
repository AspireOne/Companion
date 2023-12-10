import Title from "@components/ui/Title";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export const PageTitle = (
  props: PropsWithChildren<{ className?: string; size?: "md" | "lg" }>,
) => {
  const sizesLg = "text-3xl sm:text-4xl md:text-5xl lg:text-6xl";
  const sizesMd = "text-2xl sm:text-3xl md:text-4xl lg:text-5xl";

  return (
    <Title className={twMerge(props.size === "md" ? sizesMd : sizesLg, props.className)}>
      {props.children}
    </Title>
  );
};
