import { Button } from "./button";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export const Fixture = {
  back: (
    <Button.Back>
      <ChevronLeftIcon className="h-5 w-5" />
    </Button.Back>
  ),
  basic: () => <Button.Basic>Button.Basic</Button.Basic>,
  primary: <Button.Basic color="primary">Button.Basic</Button.Basic>,
  secondary: <Button.Basic color="secondary">Button.Basic</Button.Basic>,
};
export default Fixture;
