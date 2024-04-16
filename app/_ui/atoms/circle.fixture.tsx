import { Circle } from "$/_ui/atoms/circle";
import { UserPlusIcon } from "@heroicons/react/24/outline";

export const Fixture = {
  basic: (
    <Circle.Basic className="relative h-28 w-28" color="secondary">
      <UserPlusIcon className="absolute right-3 top-4 h-20 w-20 fill-none stroke-secondary-900 stroke-[.5]" />
    </Circle.Basic>
  ),
};

export default Fixture;
