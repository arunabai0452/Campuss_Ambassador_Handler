import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";

import { DropDownIcon } from "./icons";

import { DropdownProps } from "@/types";

export const DropDownComponent: React.FC<DropdownProps> = ({ buttonLabel, items }) => (
  <Dropdown>
    <DropdownTrigger>
      <Button
        startContent={<DropDownIcon className="rounded-none" />}
        variant="bordered"
      >
        {buttonLabel}
      </Button>
    </DropdownTrigger>
    <DropdownMenu
      aria-label="Example with disabled actions"
      disabledKeys={["edit", "delete"]}
      {...items.map((item) => (
        <DropdownItem key={item.key} color={item.color}>
          {item.label}
        </DropdownItem>
      ))}
    />
  </Dropdown>
);