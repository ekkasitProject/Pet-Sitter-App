export function calculateDuration(startTime, endTime) {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const timeDifference = endDate - startDate;
  const hours = timeDifference / 3600000;
  //   const minutes = Math.floor((timeDifference % 3600000) / 60000);
  // return `${hours} hours: ${minutes} minutes`;
  return `${hours} hours`;
}

export function formatDate(date) {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.toLocaleString("default", { month: "short" });
  const year = newDate.getFullYear();

  return `${day} ${month} ${year}`;
}

export function formatTime(time) {
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedDate = new Date(time).toLocaleString("en-US", options);
  return formattedDate;
}

/*
export function formatTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour format to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Add leading zero to minutes if needed
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${period}`;
}
*/

//แก้โค้ดในbookingHistory กับ bookingModalด้วย
