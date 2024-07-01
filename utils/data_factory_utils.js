export const generateRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomDecimal = (min, max) => {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
};

export const getRandomElement = (...array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// fyStartMonth and fyEndMonth defaults to 1 and 12 respectively (calendar year) if not specified
// Assumes "Indicator if the financial year will follow the year of start or end month. Possible Values are ''S'' and ''E''" SystemParameter is 'E'
export const generateDateRangeWithinFY = (
  fy,
  fyStartMonth = 1,
  fyEndMonth = 12
) => {
  // Get the number of days in a month
  const daysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  let fyStart;

  // Fiscal Year follows Calendar Year (Jan 1 - Dec 31)
  if (fyStartMonth === 1 && fyEndMonth === 12) {
    // Define the start date of the fiscal year
    fyStart = new Date(`${fy}-${fyStartMonth < 10 ? '0' : ''}${fyStartMonth}`);
  }
  // Fiscal Year doesn't follow Calendar Year
  else if (fyStartMonth === fyEndMonth + 1) {
    // Define the start date of the fiscal year
    fyStart = new Date(
      `${fy - 1}-${fyStartMonth < 10 ? '0' : ''}${fyStartMonth}`
    );
  } else {
    throw new Error('Invalid Fiscal Year start and end months');
  }
  // Define the end date of the fiscal year
  const fyEnd = new Date(
    `${fy}-${fyStartMonth < 10 ? '0' : ''}${fyEndMonth}-${daysInMonth(
      fy,
      fyEndMonth
    )}`
  );

  // console.log('FY Start', fyStart);
  // console.log('FY End', fyEnd);

  // Calculate the number of milliseconds for fyStart and fyEnd
  const fyStartTimestamp = fyStart.getTime();
  const fyEndTimestamp = fyEnd.getTime();

  // Generate two random timestamps within the fiscal year
  const randomTimestamp1 =
    Math.random() * (fyEndTimestamp - fyStartTimestamp) + fyStartTimestamp;
  const randomTimestamp2 =
    Math.random() * (fyEndTimestamp - fyStartTimestamp) + fyStartTimestamp;

  // console.log('Random timestamp 1:', randomTimestamp1);
  // console.log('Random timestamp 2:', randomTimestamp2);

  // Convert milliseconds timestamp to date and ensure that randomDate2 will never be earlier than randomDate1
  const randomDate1 = new Date(Math.min(randomTimestamp1, randomTimestamp2));
  const randomDate2 = new Date(Math.max(randomTimestamp1, randomTimestamp2));

  //Convert the date to DD/MM/YYYY format
  const formattedDate1 = randomDate1.toLocaleDateString('en-GB');
  const formattedDate2 = randomDate2.toLocaleDateString('en-GB');

  // console.log('Period From:', formattedDate1);
  // console.log('Period To:', formattedDate2);

  return {
    dateFrom: formattedDate1,
    dateTo: formattedDate2,
  };
};
