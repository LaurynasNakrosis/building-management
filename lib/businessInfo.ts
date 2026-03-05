export function getBusinessContactInformation() {
  return {
    firstName: process.env.BUSINESS_FIRST_NAME ?? '',
    lastName: process.env.BUSINESS_LAST_NAME ?? '',
    phone: process.env.BUSINESS_PHONE ?? '',
    email: process.env.BUSINESS_EMAIL ?? '',
    address: {
      houseNumber: process.env.BUSINESS_HOUSE_NUMBER ?? '',
      roadName: process.env.BUSINESS_ROAD_NAME ?? '',
      city: process.env.BUSINESS_CITY ?? '',
      country: process.env.BUSINESS_COUNTRY ?? '',
      postCode: process.env.BUSINESS_POSTCODE ?? '',
    },
  };
}
