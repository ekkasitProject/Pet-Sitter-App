export function calculateDuration(startTime, endTime) {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const timeDifference = endDate - startDate;
  const hours = timeDifference / 3600000;

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
