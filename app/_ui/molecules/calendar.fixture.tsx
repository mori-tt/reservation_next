import { CalendarNow } from "$/_ui/molecules/calendar";
// import React, { useState } from "react";

export const Fixture = {
  basic: () => <CalendarNow className="w-full" />,
  //   treeMonth: () => {
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     const [unixTime, setUnixTime] = useState(Date.now());
  //     return (
  //       <CalendarThreeMonth
  //         className="w-full"
  //         onChange={(unixTime) => setUnixTime(unixTime)}
  //         unixTime={unixTime}
  //       />
  //     );
  //   },
};

export default Fixture;
