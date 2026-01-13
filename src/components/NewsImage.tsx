"use client";

import { useState } from "react";
import Image from "next/image";
import { Newspaper } from "lucide-react";

interface NewsImageProps {
  src?: string;
  alt: string;
}

export function NewsImage({ src, alt }: NewsImageProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-secondary/50 text-muted-foreground">
        <Newspaper className="w-10 h-10 opacity-20" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, 300px"
      onError={() => setError(true)}
    />
  );
}
