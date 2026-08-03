import { assetPath } from '../utils/assetPath';

export const flavours = [
  {
    id: 'chocolate',
    name: 'Chocolate',
    tagline: 'Velvet cocoa cloud',
    description:
      'A rich, creamy chocolate milkshake finished with a glossy cocoa swirl and whipped cream.',
    price: 'Rs 850',
    image: assetPath('/assets/shakes/chocolate.png'),
    splash: assetPath('/assets/splashes/chocolate-splash.png'),
    ingredients: [
      {
        image: assetPath('/assets/ingredients/chocolate-piece.png'),
        alt: 'Chocolate shavings',
        className: 'ingredient chocolate',
        style: { left: '12%', top: '14%' },
      },
      {
        image: assetPath('/assets/ingredients/ice-cube.png'),
        alt: 'Iced cubes',
        className: 'ingredient cube',
        style: { right: '12%', top: '16%' },
      },
    ],
    background: '#ffcf9b',
    secondary: '#7d3b2b',
    textColor: '#2f1a14',
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    tagline: 'Berry bliss in a glass',
    description:
      'Fresh strawberry notes and a silky finish make this shake feel like summer in a cup.',
    price: 'Rs 895',
    image: assetPath('/assets/shakes/strawberry.png'),
    splash: assetPath('/assets/splashes/strawberry-splash.png'),
    ingredients: [
      {
        image: assetPath('/assets/ingredients/strawberry.png'),
        alt: 'Fresh strawberry garnish',
        className: 'ingredient strawberry',
        style: { left: '10%', top: '18%' },
      },
      {
        image: assetPath('/assets/ingredients/ice-cube.png'),
        alt: 'Ice cubes',
        className: 'ingredient cube',
        style: { right: '14%', top: '20%' },
      },
    ],
    background: '#ffa7c2',
    secondary: '#bc4d6a',
    textColor: '#3d1422',
  },
  {
    id: 'vanilla',
    name: 'Vanilla',
    tagline: 'Soft, sweet and timeless',
    description:
      'A mellow vanilla shake with a creamy body and a polished, café-style finish.',
    price: 'Rs 790',
    image: assetPath('/assets/shakes/vanilla.png'),
    splash: assetPath('/assets/splashes/milk-splash.png'),
    ingredients: [
      {
        image: assetPath('/assets/ingredients/ice-cube.png'),
        alt: 'Ice cube garnish',
        className: 'ingredient cube',
        style: { left: '10%', top: '16%' },
      },
      {
        image: assetPath('/assets/ingredients/mint-leaf.png'),
        alt: 'Mint leaf',
        className: 'ingredient mint',
        style: { right: '9%', top: '12%' },
      },
    ],
    background: '#fbe6b7',
    secondary: '#a26f3d',
    textColor: '#352311',
  },
  {
    id: 'mint',
    name: 'Mint',
    tagline: 'Cool, bright and refreshing',
    description:
      'Bright mint and smooth dairy come together in a brisk, garden-fresh shake.',
    price: 'Rs 825',
    image: assetPath('/assets/shakes/mint.png'),
    splash: assetPath('/assets/splashes/milk-splash.png'),
    ingredients: [
      {
        image: assetPath('/assets/ingredients/mint-leaf.png'),
        alt: 'Mint leaf garnish',
        className: 'ingredient mint',
        style: { left: '12%', top: '13%' },
      },
      {
        image: assetPath('/assets/ingredients/ice-cube.png'),
        alt: 'Cooling ice cubes',
        className: 'ingredient cube',
        style: { right: '12%', top: '17%' },
      },
    ],
    background: '#dcefcf',
    secondary: '#3f6447',
    textColor: '#183223',
  },
  {
    id: 'mango',
    name: 'Mango',
    tagline: 'Tropical sunshine',
    description:
      'Juicy mango and a swirl of cream create a lush, sunlit treat with a bright finish.',
    price: 'Rs 880',
    image: assetPath('/assets/shakes/mango.png'),
    splash: assetPath('/assets/splashes/caramel-ribbon.png'),
    ingredients: [
      {
        image: assetPath('/assets/ingredients/mango-piece.png'),
        alt: 'Mango slice',
        className: 'ingredient mango',
        style: { left: '10%', top: '16%' },
      },
      {
        image: assetPath('/assets/ingredients/ice-cube.png'),
        alt: 'Ice cube accent',
        className: 'ingredient cube',
        style: { right: '10%', top: '15%' },
      },
    ],
    background: '#ffd26a',
    secondary: '#ae5a2a',
    textColor: '#40220d',
  },
  {
    id: 'oreo',
    name: 'Oreo',
    tagline: 'Crunchy, creamy and bold',
    description:
      'A playful mix of cookie crumble and velvety cream with a classic finish.',
    price: 'Rs 865',
    image: assetPath('/assets/shakes/oreo.png'),
    splash: assetPath('/assets/splashes/chocolate-splash.png'),
    ingredients: [
      {
        image: assetPath('/assets/ingredients/oreo-cookie.png'),
        alt: 'Oreo cookie',
        className: 'ingredient oreo',
        style: { left: '10%', top: '16%' },
      },
      {
        image: assetPath('/assets/ingredients/chocolate-piece.png'),
        alt: 'Chocolate accent',
        className: 'ingredient chocolate',
        style: { right: '12%', top: '14%' },
      },
    ],
    background: '#ffb66d',
    secondary: '#5c2c20',
    textColor: '#2b130d',
  },
];
