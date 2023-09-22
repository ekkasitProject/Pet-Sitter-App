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
  const options = { hour: "numeric", minute: "2-digit", hour12: true };
  return new Date(time).toLocaleTimeString("en-US", options);
}

//แก้โค้ดในbookingHistory กับ bookingModalด้วย
