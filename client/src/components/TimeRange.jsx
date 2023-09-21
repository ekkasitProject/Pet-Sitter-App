import React, { useState } from "react";

function TimeRangePicker() {
  const [startTime, setStartTime] = useState("12:00 AM");
  const [endTime, setEndTime] = useState("12:30 AM");
  const [selectedTimes, setSelectedTimes] = useState([]);

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
    const selectedEndTime = e.target.value;

    // Check if selected end time is greater than or equal to the start time
    if (compareTimes(selectedEndTime, startTime) >= 0) {
      setEndTime(selectedEndTime);
    }
  };

  const handleTimeSelection = (e) => {
    const selectedTime = e.target.value;

    // Check if the selected time is not in the selectedTimes array
    if (!selectedTimes.includes(selectedTime)) {
      setSelectedTimes([...selectedTimes, selectedTime]);
    }
  };

  // Helper function to compare two time strings (HH:mm AM/PM)
  const compareTimes = (time1, time2) => {
    const time1Parts = time1.split(" ");
    const time2Parts = time2.split(" ");

    const time1AMPM = time1Parts[1];
    const time2AMPM = time2Parts[1];

    if (time1AMPM !== time2AMPM) {
      // If the AM/PM is different, compare based on it
      return time1AMPM.localeCompare(time2AMPM);
    } else {
      // If the AM/PM is the same, compare based on the time in 24-hour format
      const time1WithoutAMPM = time1Parts[0];
      const time2WithoutAMPM = time2Parts[0];

      return time1WithoutAMPM.localeCompare(time2WithoutAMPM);
    }
  };

  return (
    <div className="flex space-x-4">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Start Time:</label>
        <select
          className="border rounded-md py-3 px-12 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white"
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
          className="border rounded-md py-3 px-12 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white"
          value={endTime}
          onChange={handleEndTimeChange}
        >
          {generateTimeOptions().map((time) => (
            <option
              key={time}
              value={time}
              disabled={selectedTimes.includes(time)}
            >
              {time}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TimeRangePicker;
