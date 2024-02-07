import { Geldeinlage, MockedResponse, Projekt } from '../types/types';

// e.g. 0,00 -> 0.00
export const toNumber = (numberString: string) => {
  return Number(numberString.replace(',', '.'));
};

export const sortProjects = (projects: Projekt[]) =>
  projects.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

export const formatAmount = (amount: string) => {
  if (amount === '') {
    return '0,00';
  }
  // Remove any non-numeric characters
  const numericValue = amount.replace(/[^\d,]/g, '');
  // Split the numeric value into integer and decimal parts
  const [integerPart, decimalPart] = numericValue.split(',');
  // Format the integer part with thousands separators
  const formattedIntegerPart = parseInt(integerPart, 10).toLocaleString(
    'de-DE'
  );
  // Combine the formatted integer part and the decimal part with a comma
  const formattedValue = `${formattedIntegerPart},${decimalPart}`;

  return formattedValue;
};

/* local storage functions */

export const saveFunding = async (
  funding: Geldeinlage,
  selectedProject: Projekt
): Promise<MockedResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!funding.id) {
        funding.id = Math.floor(Math.random() * 1000).toString(); // random id from 0 to 999
      }
      if (!funding.projekt) {
        funding.projekt = selectedProject.id;
      }
      const combinedId = `${selectedProject.id}_${funding.id}`;
      localStorage.setItem(combinedId, JSON.stringify(funding)); // existing entries will be overridden
      resolve({ status: 200 });
    }, 1000);
  });
};

// usually we would do a SQL query WHERE 'funding.projekt = projekcId'
export const loadFundingsByProject = (projectId: string) => {
  // Retrieve all keys from local storage
  const keys = Object.keys(localStorage);

  // Filter keys that include the desired id
  const filteredKeys = keys.filter((key) => key.includes(`${projectId}`));

  // Retrieve items corresponding to filtered keys
  const fundings: Geldeinlage[] = filteredKeys
    .map((key) => {
      const item = localStorage.getItem(key);

      if (!item) {
        return undefined;
      }
      return JSON.parse(item);
    })
    .filter((item) => item !== undefined);

  return fundings;
};
