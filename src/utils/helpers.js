const cleanBusinessData = (businesses) => {
  return businesses.filter(business =>
    business.name &&
    business.address &&
    business.name.length > 1 &&
    business.address.length > 5
  );
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  cleanBusinessData,
  delay
};