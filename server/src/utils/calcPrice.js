export const calcPrice = (communicationType, numOfDays, price) => {
  let finalPrice;
  switch (communicationType) {
    case 'chat':
      finalPrice = price;
      break;
    case 'voice':
      finalPrice = Math.floor(price + (price * 20) / 100);
      break;
    case 'video':
      finalPrice = Math.floor(price + (price * 40) / 100);
      break;
  }

  finalPrice = finalPrice + (numOfDays - 10);
  return finalPrice;
};
