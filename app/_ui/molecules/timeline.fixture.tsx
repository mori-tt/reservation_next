import { TimelineBase } from "$/_ui/molecules/timeline";

export const Fixture = {
  basic: () => (
    <TimelineBase
      className="w-full"
      disabledTimeList={["14:00"]}
      reservedTimeList={["10:00"]}
    />
  ),
};

export default Fixture;
