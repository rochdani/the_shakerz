export const BUSINESS_LOCATION = {
  name: 'The Shakerz',
  address: 'Brown Road, Jaffna',
  latitude: 9.671868,
  longitude: 80.024913,
  googleMapsUrl:
    'https://www.google.com/maps/place/the+shakerz/data=!4m2!3m1!1s0x3affabca6b5468d9:0xa6bf80ab23660544',
  phoneDisplay: '+94 76 764 5665',
  phoneHref: '+94767645665',
  whatsappNumber: '94767645665',
  openingHours: [
    { days: 'Mon–Thu', hours: '11:00–21:00' },
    { days: 'Fri–Sun', hours: '11:00–22:00' },
  ],
};

export const business = {
  name: BUSINESS_LOCATION.name,
  tagline: 'Freshly blended, beautifully served.',
  address: BUSINESS_LOCATION.address,
  openingHours: BUSINESS_LOCATION.openingHours.map(
    ({ days, hours }) => `${days}: ${hours}`,
  ),
  phone: BUSINESS_LOCATION.phoneDisplay,
  whatsapp: BUSINESS_LOCATION.phoneDisplay,
  phoneHref: `tel:${BUSINESS_LOCATION.phoneHref}`,
  whatsappHref: `https://wa.me/${BUSINESS_LOCATION.whatsappNumber}`,
  mapsUrl: BUSINESS_LOCATION.googleMapsUrl,
  storyTitle: 'Freshly prepared milkshakes with premium ingredients and a warm local welcome.',
  storyBody:
    'We handcraft every shake with seasonal fruit, rich dairy and playful toppings. Our shop is all about care, flavour and a little extra sparkle for every visit.',
};
