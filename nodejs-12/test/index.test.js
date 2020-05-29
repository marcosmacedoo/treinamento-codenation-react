const { products } = require('../src/data/products')
const {
	getShoppingCart,
	getProductsById,
	getPromotion,
	getProductsOnSale,
	getTotalPriceWithoutDiscount,
	extractPromotionPrices,
} = require('../src')

const exemplo1Mock = {
	products: [
		{ name: 'DISNEY CRUELLA© T-SHIRT', category: 'T-SHIRTS' },
		{ name: 'KNIT JOGGING PANTS', category: 'PANTS' },
		{ name: 'ASYMMETRICAL LEATHER SLIDE HEELS', category: 'SHOES' },
		{ name: 'SOFT FLAP BACKPACK', category: 'BAGS' },
	],
	promotion: 'FULL LOOK',
	totalPrice: '404.96',
	discountValue: '75.00',
	discount: '15.63%',
}

const exemplo2Mock = {
	products: [
		{ name: 'RUBBERIZED PRINTED T-SHIRT', category: 'T-SHIRTS' },
		{ name: 'CONTRAST SLOGAN T-SHIRT', category: 'T-SHIRTS' },
		{ name: 'KNIT JOGGING PANTS', category: 'PANTS' },
		{ name: 'MENSWEAR PANTS', category: 'PANTS' },
	],
	promotion: 'DOUBLE LOOK',
	totalPrice: '504.95',
	discountValue: '25.00',
	discount: '4.72%',
}

const exemplo3Mock = {
	products: [
		{ name: 'PINK PANTHER™ T-SHIRT', category: 'T-SHIRTS' },
		{ name: 'DISNEY CRUELLA© T-SHIRT', category: 'T-SHIRTS' },
		{ name: 'RUBBERIZED PRINTED T-SHIRT', category: 'T-SHIRTS' },
		{ name: 'CONTRAST SLOGAN T-SHIRT', category: 'T-SHIRTS' },
	],
	promotion: 'SINGLE LOOK',
	totalPrice: '524.96',
	discountValue: '10.00',
	discount: '1.87%',
}

const exemplo4Mock = {
	products: [
		{ name: 'PINK PANTHER™ T-SHIRT', category: 'T-SHIRTS' },
		{ name: 'RUBBERIZED PRINTED T-SHIRT', category: 'T-SHIRTS' },
		{ name: 'CONTRAST SLOGAN T-SHIRT', category: 'T-SHIRTS' },
		{ name: 'KNIT JOGGING PANTS', category: 'PANTS' },
		{ name: 'ASYMMETRICAL LEATHER SLIDE HEELS', category: 'SHOES' },
		{
			name: 'SLINGBACK KITTEN HEEL SHOES WITH METAL DETAIL',
			category: 'SHOES',
		},
	],
	promotion: 'TRIPLE LOOK',
	totalPrice: '784.94',
	discountValue: '130.00',
	discount: '14.21%',
}

describe('Get Shopping Cart', () => {
	it('Deve retornar um carrinho de compras a partir do array de IDs do exemplo 1', () => {
		const cart = getShoppingCart([120, 230, 310, 490], products)

		expect(cart).toEqual(exemplo1Mock)
	})

	it('Deve retornar um carrinho de compras a partir do array de IDs do exemplo 2', () => {
		const cart = getShoppingCart([130, 140, 230, 260], products)

		expect(cart).toEqual(exemplo2Mock)
	})

	it('Deve retornar um carrinho de compras a partir do array de IDs do exemplo 3', () => {
		const cart = getShoppingCart([110, 120, 130, 140], products)

		expect(cart).toEqual(exemplo3Mock)
	})

	it('Deve retornar um carrinho de compras a partir do array de IDs do exemplo 4', () => {
		const cart = getShoppingCart([110, 130, 140, 230, 310, 330], products)

		expect(cart).toEqual(exemplo4Mock)
	})
})

describe('getProductsById', () => {
	it('Deve retornar os produtos de id: 110 e 120', () => {
		expect(getProductsById([110, 120], products)).toEqual([
			{
				id: 110,
				name: 'PINK PANTHER™ T-SHIRT',
				category: 'T-SHIRTS',
				regularPrice: 124.99,
				promotions: [
					{
						looks: ['SINGLE LOOK', 'DOUBLE LOOK'],
						price: 124.99,
					},
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 109.99,
					},
				],
			},
			{
				id: 120,
				name: 'DISNEY CRUELLA© T-SHIRT',
				category: 'T-SHIRTS',
				regularPrice: 114.99,
				promotions: [
					{
						looks: ['SINGLE LOOK', 'DOUBLE LOOK'],
						price: 109.99,
					},
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 99.99,
					},
				],
			},
		])
	})

	it('Deve retornar somente o produto de id 110', () => {
		expect(getProductsById([110], products)).toEqual([
			{
				id: 110,
				name: 'PINK PANTHER™ T-SHIRT',
				category: 'T-SHIRTS',
				regularPrice: 124.99,
				promotions: [
					{
						looks: ['SINGLE LOOK', 'DOUBLE LOOK'],
						price: 124.99,
					},
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 109.99,
					},
				],
			},
		])
	})
})

describe('getPromotion', () => {
	it('retorna a promoção FULL LOOK', () => {
		const promotion = getPromotion(products)

		expect(promotion).toEqual('FULL LOOK')
	})

	it('retorna a promoção SINGLE LOOK', () => {
		const promotion = getPromotion([
			{
				id: 110,
				name: 'PINK PANTHER™ T-SHIRT',
				category: 'T-SHIRTS',
				regularPrice: 124.99,
				promotions: [
					{
						looks: ['SINGLE LOOK', 'DOUBLE LOOK'],
						price: 124.99,
					},
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 109.99,
					},
				],
			},
		])

		expect(promotion).toEqual('SINGLE LOOK')
	})

	it('retorna a promoção DOUBLE LOOK', () => {
		const promotion = getPromotion([
			{
				id: 110,
				name: 'PINK PANTHER™ T-SHIRT',
				category: 'T-SHIRTS',
				regularPrice: 124.99,
				promotions: [
					{
						looks: ['SINGLE LOOK', 'DOUBLE LOOK'],
						price: 124.99,
					},
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 109.99,
					},
				],
			},
			{
				id: 210,
				name: 'BELTED CIGARETTE PANTS',
				category: 'PANTS',
				regularPrice: 124.99,
				promotions: [
					{
						looks: ['SINGLE LOOK'],
						price: 124.99,
					},
					{
						looks: ['DOUBLE LOOK'],
						price: 104.99,
					},
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 94.99,
					},
				],
			},
		])

		expect(promotion).toEqual('DOUBLE LOOK')
	})

	it('retorna a promoção TRIPLE LOOK', () => {
		const promotion = getPromotion([
			{
				id: 110,
				name: 'PINK PANTHER™ T-SHIRT',
				category: 'T-SHIRTS',
				regularPrice: 124.99,
				promotions: [
					{
						looks: ['SINGLE LOOK', 'DOUBLE LOOK'],
						price: 124.99,
					},
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 109.99,
					},
				],
			},
			{
				id: 210,
				name: 'BELTED CIGARETTE PANTS',
				category: 'PANTS',
				regularPrice: 124.99,
				promotions: [
					{
						looks: ['SINGLE LOOK'],
						price: 124.99,
					},
					{
						looks: ['DOUBLE LOOK'],
						price: 104.99,
					},
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 94.99,
					},
				],
			},
			{
				id: 320,
				name: 'ANIMAL PRINT HIGH HEELED SHOES',
				category: 'SHOES',
				regularPrice: 129.99,
				promotions: [
					{
						looks: ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK'],
						price: 119.99,
					},
					{
						looks: ['FULL LOOK'],
						price: 109.99,
					},
				],
			},
		])

		expect(promotion).toEqual('TRIPLE LOOK')
	})
})

describe('getProductsOnSale', () => {
	it('Aplicando promoção FULL LOOK nos produtos de ids: 110, 210', () => {
		const productsTest = [
			{
				id: 110,
				name: 'PINK PANTHER™ T-SHIRT',
				category: 'T-SHIRTS',
				regularPrice: 124.99,
				promotions: [
					{
						looks: ['SINGLE LOOK', 'DOUBLE LOOK'],
						price: 124.99,
					},
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 109.99,
					},
				],
			},
			{
				id: 210,
				name: 'BELTED CIGARETTE PANTS',
				category: 'PANTS',
				regularPrice: 124.99,
				promotions: [
					{
						looks: ['SINGLE LOOK'],
						price: 124.99,
					},
					{
						looks: ['DOUBLE LOOK'],
						price: 104.99,
					},
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 94.99,
					},
				],
			},
		]

		expect(getProductsOnSale(productsTest, 'FULL LOOK')).toEqual([
			{
				id: 110,
				name: 'PINK PANTHER™ T-SHIRT',
				category: 'T-SHIRTS',
				regularPrice: 124.99,
				promotions: [
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 109.99,
					},
				],
			},
			{
				id: 210,
				name: 'BELTED CIGARETTE PANTS',
				category: 'PANTS',
				regularPrice: 124.99,
				promotions: [
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 94.99,
					},
				],
			},
		])
	})

	it('Aplicando promoção SINGLE LOOK nos produtos de ids: 140, 170', () => {
		const productsTest = [
			{
				id: 140,
				name: 'CONTRAST SLOGAN T-SHIRT',
				category: 'T-SHIRTS',
				regularPrice: 149.99,
				promotions: [
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 129.99,
					},
				],
			},
			{
				id: 170,
				name: 'TOP WITH VOLUMINOUS SLEEVES',
				category: 'T-SHIRTS',
				regularPrice: 49.99,
				promotions: [
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 39.99,
					},
				],
			},
		]

		expect(getProductsOnSale(productsTest, 'SINGLE LOOK')).toEqual([
			{
				id: 140,
				name: 'CONTRAST SLOGAN T-SHIRT',
				category: 'T-SHIRTS',
				regularPrice: 149.99,
				promotions: [],
			},
			{
				id: 170,
				name: 'TOP WITH VOLUMINOUS SLEEVES',
				category: 'T-SHIRTS',
				regularPrice: 49.99,
				promotions: [],
			},
		])
	})
})

describe('getTotalPriceWithoutDiscount', () => {
	it('Testando com os produtos de id: 140 e 170', () => {
		const productsTest = [
			{
				id: 140,
				name: 'CONTRAST SLOGAN T-SHIRT',
				category: 'T-SHIRTS',
				regularPrice: 149.99,
				promotions: [
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 129.99,
					},
				],
			},
			{
				id: 170,
				name: 'TOP WITH VOLUMINOUS SLEEVES',
				category: 'T-SHIRTS',
				regularPrice: 49.99,
				promotions: [
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 39.99,
					},
				],
			},
		]

		expect(getTotalPriceWithoutDiscount(productsTest)).toEqual('199.98')
	})
})

describe('extractPromotionPrices', () => {
	it('retorna [129.99, 39.99] na promoção FULL LOOK dos produtos de id: 140 e 170', () => {
		const productsTest = [
			{
				id: 140,
				name: 'CONTRAST SLOGAN T-SHIRT',
				category: 'T-SHIRTS',
				regularPrice: 149.99,
				promotions: [
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 129.99,
					},
				],
			},
			{
				id: 170,
				name: 'TOP WITH VOLUMINOUS SLEEVES',
				category: 'T-SHIRTS',
				regularPrice: 49.99,
				promotions: [
					{
						looks: ['TRIPLE LOOK', 'FULL LOOK'],
						price: 39.99,
					},
				],
			},
		]

		expect(extractPromotionPrices(productsTest)).toEqual([129.99, 39.99])
	})

	it('retorna [] na promoção SINGLE LOOK dos produtos de id: 140 e 170', () => {
		const productsTest = [
			{
				id: 140,
				name: 'CONTRAST SLOGAN T-SHIRT',
				category: 'T-SHIRTS',
				regularPrice: 149.99,
				promotions: [],
			},
			{
				id: 170,
				name: 'TOP WITH VOLUMINOUS SLEEVES',
				category: 'T-SHIRTS',
				regularPrice: 49.99,
				promotions: [],
			},
		]

		expect(extractPromotionPrices(productsTest)).toEqual([149.99, 49.99])
	})
})
