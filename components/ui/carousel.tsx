"use client";

import * as React from "react";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselApi = EmblaCarouselType;

interface CarouselProps {
  options?: EmblaOptionsType;
  plugins?: ReturnType<typeof Autoplay>[];
  className?: string;
  children?: React.ReactNode;
}

const Carousel = React.forwardRef<CarouselApi, CarouselProps>(
  ({ options, plugins, className, children }, ref) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

    React.useImperativeHandle(ref, () => emblaApi!, [emblaApi]);

    return (
      <div ref={emblaRef} className={cn("overflow-hidden", className)}>
        <div className="flex">{children}</div>
      </div>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex", className)} {...props} />
));
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
    {...props}
  />
));
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => (
  <Button
    ref={ref}
    variant={variant}
    size={size}
    className={cn("absolute h-8 w-8 rounded-full", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="sr-only">Slide anterior</span>
  </Button>
));
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => (
  <Button
    ref={ref}
    variant={variant}
    size={size}
    className={cn("absolute h-8 w-8 rounded-full", className)}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
    <span className="sr-only">Próximo slide</span>
  </Button>
));
CarouselNext.displayName = "CarouselNext";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
};
