import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

interface DropdownItem {
  label: string;
  key: string;
  color?: "default" | "danger" | "primary";
  disabled?: boolean;
}

export type DropdownProps = {
  buttonLabel: string;
  items: DropdownItem[];
};