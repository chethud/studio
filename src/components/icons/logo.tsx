import type { SVGProps } from 'react';

export function LearnifyLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="40"
      height="40"
      aria-label="Learnify Logo"
      {...props}
    >
      <rect width="100" height="100" rx="20" fill="hsl(var(--primary))" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="60"
        fontWeight="bold"
        fill="hsl(var(--primary-foreground))"
      >
        L
      </text>
    </svg>
  );
}
