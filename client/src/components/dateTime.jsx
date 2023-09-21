import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerValue() {
  const [value, setValue] = React.useState(dayjs(""));

  const handleDateChange = (newValue) => {
    setValue(newValue); // อัปเดต state โดยใช้ค่าใหม่ที่เลือก
    console.log(handleDateChange);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePiker"]}>
        <DatePicker
          label="Basic date picker"
          value={value} // ตั้งค่าค่า value ของ DatePicker เป็นค่าใน state
          onChange={handleDateChange} // เรียกใช้ฟังก์ชัน handleDateChange เมื่อมีการเลือกวันที่ใน DatePicker
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
