import type { ReactNode, SVGProps } from "react";

// Thin line icons on a 24px grid. Size them in CSS; colour follows currentColor.
type IconProps = Omit<SVGProps<SVGSVGElement>, "children">;

function Icon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
);

export const BagIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 10V7a3 3 0 0 1 6 0v3" />
  </Icon>
);

export const UserIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
  </Icon>
);

export const MenuIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </Icon>
);

export const ChevronDownIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const ExternalLinkIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M14 4h6v6" />
    <path d="M20 4 11 13" />
    <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </Icon>
);

export const HeartIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 20s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7.2a4.4 4.4 0 0 1 7.5 2.7C19.5 15.4 12 20 12 20Z" />
  </Icon>
);

export const TagIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3.5 12.5 12 4h8v8l-8.5 8.5a1.4 1.4 0 0 1-2 0l-6-6a1.4 1.4 0 0 1 0-2Z" />
    <circle cx="16" cy="8" r="1.2" />
  </Icon>
);

export const MinusIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 12h14" />
  </Icon>
);

export const PlusIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const BoxIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
    <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
  </Icon>
);

export const CalendarIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M4 10h16M8 3v4M16 3v4" />
  </Icon>
);
