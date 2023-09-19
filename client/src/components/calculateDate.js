export const changeDate = (date) => {
  const newDate = new Date(date).toLocaleDateString();
  const newTime = new Date(date).toLocaleTimeString();
  return `${newDate} | ${newTime}`;
};

export const changeTime = (date) => {
  const newDate = new Date(date).toLocaleDateString();
  return `${newDate}`;
};

export function calculateDuration(startTime, endTime) {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const timeDifference = endDate - startDate;
  const hours = Math.floor(timeDifference / 3600000);
  //   const minutes = Math.floor((timeDifference % 3600000) / 60000);
  // return `${hours} hours: ${minutes} minutes`;
  return `${hours} hours`;
}
