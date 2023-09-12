import React, { useState } from "react";

function TimeRangePicker() {
  const [startTime, setStartTime] = useState("12:00 AM");
  const [endTime, setEndTime] = useState("12:30 AM");

  const generateTimeOptions = () => {
    const timeOptions = [];
    const amPmOptions = ["AM", "PM"];

    for (let amPm of amPmOptions) {
      for (let hours = 0; hours < 12; hours++) {
        for (let minutes = 0; minutes < 60; minutes += 30) {
          const formattedHours = hours.toString().padStart(2, "0");
          const formattedMinutes = minutes.toString().padStart(2, "0");
          const time = `${formattedHours}:${formattedMinutes} ${amPm}`;
          timeOptions.push(time);
        }
      }
    }

    return timeOptions;
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  return (
    <div className="flex space-x-4">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Start Time:</label>
        <select
          className="border rounded-md py-3 px-12 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          value={startTime}
          onChange={handleStartTimeChange}
        >
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">End Time:</label>
        <select
          className="border rounded-md py-3 px-12 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          value={endTime}
          onChange={handleEndTimeChange}
        >
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TimeRangePicker;
