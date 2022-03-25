import React, { forwardRef } from "react";
import DatePicker from "./DatePicker";

const TimePicker = forwardRef((props: any, ref: any) => (
  <DatePicker {...props} picker="time" mode={undefined} ref={ref} />
));

TimePicker.displayName = "TimePicker";

export default TimePicker;
