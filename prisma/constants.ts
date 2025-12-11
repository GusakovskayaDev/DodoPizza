export const categories = [
  {
    name: 'Пиццы',
  },
  {
    name: 'Завтрак',
  },
  {
    name: 'Закуски',
  },
  {
    name: 'Коктейли',
  },
  {
    name: 'Кофе',
  },
  {
    name: 'Десерты',
  },
];

export const ingredients = [
  {
    name: 'Сырный бортик',
    price: 205,
    imageUrl: '/ingredients/0199152f20c570859ff617c0a6ef03d3.png'
  },
  {
    name: 'Моцарелла',
    price: 90,
    imageUrl: '/ingredients/0199ae74f2fd783b8fb21bb0af7d09e6.png'
  },
  {
    name: 'Сыры чеддер и пармезан',
    price: 79,
    imageUrl: '/ingredients/0199152f32e47035aefbe8c971c54502.png'
  },
  {
    name: 'Сыр блю чиз',
    price: 149,
    imageUrl: '/ingredients/0199153050ea707cbed48b92097e095f.png'
  },
  {
    name: 'Пряная говядина',
    price: 119,
    imageUrl: '/ingredients/01991530635b73ecb1a22658b49e1653.png'
  },
  {
    name: 'Острый перец халапенью',
    price: 59,
    imageUrl: '/ingredients/0199152c7eb27553a08f57c8c9861ac3.png'
  },
  {
    name: 'Нежный цыпленок',
    price: 79,
    imageUrl: '/ingredients/0199152e59157089adb89948280ebb10.png'
  },
  {
    name: 'Шампиньоны',
    price: 59,
    imageUrl: '/ingredients/0199152bfda5723f8bbecc43a35f83f1.png'
  },
  {
    name: 'Бекон',
    price: 79,
    imageUrl: '/ingredients/0199ae744508792995ccae4ff71e233e.png'
  },
  {
    name: 'Ветчина',
    price: 79,
    imageUrl: '/ingredients/0199152d7fd075a9b11d17f8acaf1670.png'
  },
  {
    name: 'Пекантная пепперони',
    price: 79,
    imageUrl: '/ingredients/0199152b6e6978a188ec97d9bd52e7d2.png'
  },
  {
    name: 'Острая чоризо',
    price: 79,
    imageUrl: '/ingredients/0199ae74b6d6761f972e9a60b63044bc.png'
  },
  {
    name: 'Маринованные огурчики',
    price: 59,
    imageUrl: '/ingredients/0199152e33ee7722ac038fa5bc26e630.png'
  },
  {
    name: 'Свежие томаты',
    price: 59,
    imageUrl: '/ingredients/0199152a8428737d9f6b19c1b2329749.png'
  },
  {
    name: 'Красный лук',
    price: 59,
    imageUrl: '/ingredients/0199ae747c85710abcf2950497834b01.png'
  },
  {
    name: 'Cочные ананасы',
    price: 59,
    imageUrl: '/ingredients/0199152b81587495b19ba8008c567f5d.png'
  },
  {
    name: 'Итальянские травы',
    price: 39,
    imageUrl: '/ingredients/0199152ced7677fcb0e49edd0ebf6c90.png'
  },
  {
    name: 'Сладкий перец',
    price: 59,
    imageUrl: '/ingredients/0199152da27677a7a24a41b4eddfcedd.png'
  },
  {
    name: 'Кубики брынзы',
    price: 79,
    imageUrl: '/ingredients/0199152a464a781abbc1d135f7d138aa.png'
  },
  {
    name: 'Баварские колбаски',
    price: 129,
    imageUrl: '/ingredients/019915307407729e970fee55536f6dca.png'
  },
  {
    name: 'Креветки',
    price: 229,
    imageUrl: '/ingredients/0199152abd577969bb76a8123d1a7ea1.png'
  },
  {
    name: 'Свиная шейка',
    price: 229,
    imageUrl: '/ingredients/0199e7d1cd977499a410e7a4f0495221.png'
  }
].map((obj, index) => ({ id: index + 1, ...obj}));

export const products = [
  {
    name: 'Додстер',
    imageUrl:
      '/products/01980cb92528769295aeb186fb501f8e.avif',
    categoryId: 3,
  },
  {
    name: 'Острый Додстер',
    imageUrl:
      '/products/01980cbb11e677738af9e254a413763f.avif',
    categoryId: 3,
  },
  {
    name: 'Креветки',
    imageUrl:
      '/products/01980e9159aa74ca93e7daaa7db3e9fd.avif',
    categoryId: 3,
  },
  {
    name: 'Креветки терияки',
    imageUrl:
      '/products/0198556badcf772484ba8ef325c9f09f.avif',
    categoryId: 3,
  },
  {
    name: 'Омлет с томатами',
    imageUrl:
      '/products/01988a36bbee7743a6ca0637e674fa30.avif',
    categoryId: 2,
  },
  {
    name: 'Омлет с беконом',
    imageUrl:
      '/products/01988a27ac0578b69644066f43e3d41c.avif',
    categoryId: 2,
  },
  {
    name: 'Кофе Американо',
    imageUrl:
      '/products/0198227e7648741ead340c4c96da45a4.avif',
    categoryId: 5,
  },
  {
    name: 'Кофе Капучино',
    imageUrl:
      '/products/019840b6488170018dd640026aea9961.avif',
    categoryId: 5,
  },
  {
    name: 'Кофе Латте',
    imageUrl:
      '/products/01982280dc9a778c941ba53768d94882.avif',
    categoryId: 5,
  },
  {
    name: 'Кофе Латте',
    imageUrl:
      '/products/01982280dc9a778c941ba53768d94882.avif',
    categoryId: 5,
  },
  {
    name: 'Классический молочный коктейль',
    imageUrl:
      '/products/0198227af30a72b3b2614e9da1d277a3.avif',
    categoryId: 6,
  },
  {
    name: 'Клубничный молочный коктейль',
    imageUrl:
      '/products/0199ae7135777528bca136648af27fb4.avif',
    categoryId: 6,
  },
  {
    name: 'Шоколадный молочный коктейль',
    imageUrl:
      '/products/0199864ca5fe77de868217896c71a63c.avif',
    categoryId: 6,
  },
  {
    name: 'Додобоны',
    imageUrl:
      '/products/0198ae6dbbee77e4900b92245d450a6c.avif',
    categoryId: 6,
  },
  {
    name: 'Чизкейк Нью-Йорк',
    imageUrl:
      '/products/019840ba1e6078459e4aa5777065f0bc.avif',
    categoryId: 6,
  },
  {
    name: 'Чизкейк Банановый с шоколаданым печеньем',
    imageUrl:
      '/products/0198138723e478fba518947539dbbdcb.avif',
    categoryId: 6,
  },
  {
    name: 'Маффин Соленая карамель',
    imageUrl:
      '/products/01980cc4a4aa729e88828f8db0a48711.avif',
    categoryId: 6,
  },
  {
    name: 'Маффин Три шоколада',
    imageUrl:
      '/products/01980cc4cebb707a9b91ba24195fee1d.avif',
    categoryId: 6,
  },
]