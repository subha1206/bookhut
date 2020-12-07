const convertDate = (date) => {
  let options = {
    // weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  if (date) {
    const cvtDate = new Date(date);
    return cvtDate.toLocaleDateString('en-US', options);
  }
  return 'Invalid';
};

export default convertDate;
