function getProductsById(ids, productsList) {
	return productsList.filter((product) => ids.some((id) => id === product.id))
}

function getPromotion(products) {
	let promotion = 'FULL LOOK'
	const categories = products.map((product) => product.category)
	const categoriesReduced = Array.from(new Set(categories))

	if (categoriesReduced.length === 1) {
		promotion = 'SINGLE LOOK'
	} else if (categoriesReduced.length === 2) {
		promotion = 'DOUBLE LOOK'
	} else if (categoriesReduced.length === 3) {
		promotion = 'TRIPLE LOOK'
	}

	return promotion
}

function getProductsOnSale(products, promotion) {
	return products.map((product) => {
		const newPromtions = product.promotions.filter((promo) =>
			promo.looks.some((look) => look === promotion)
		)

		return {
			id: product.id,
			name: product.name,
			category: product.category,
			regularPrice: product.regularPrice,
			promotions: newPromtions,
		}
	})
}

function getTotalPriceWithoutDiscount(products) {
	const regularPrices = products.map((product) => product.regularPrice)

	return regularPrices
		.reduce((total, regularPrice) => total + regularPrice, 0)
		.toFixed(2)
}

function extractPromotionPrices(products) {
	const prices = products.map((product) => {
		if (product.promotions.length === 1) {
			const [promotion] = product.promotions
			const { price } = promotion

			return price
		} else {
			return product.regularPrice
		}
	})

	return prices
}

function getTotalPriceWithDiscount(products) {
	const prices = extractPromotionPrices(products)

	return prices.reduce((total, price) => total + price, 0).toFixed(2)
}

function getShoppingCart(ids, productsList) {
	const products = getProductsById(ids, productsList)
	const promotion = getPromotion(products)
	const productsOnSale = getProductsOnSale(products, promotion)
	const totalPriceWithoutDiscount = getTotalPriceWithoutDiscount(products)
	const totalPriceWithDiscount = getTotalPriceWithDiscount(productsOnSale)
	const discountValue = `${(
		totalPriceWithoutDiscount - totalPriceWithDiscount
	).toFixed(2)}`
	const discount = `${(
		(discountValue * 100) /
		totalPriceWithoutDiscount
	).toFixed(2)}%`

	const productsFormated = productsOnSale.map((product) => {
		return {
			name: product.name,
			category: product.category,
		}
	})

	return {
		products: productsFormated,
		promotion,
		totalPrice: String(totalPriceWithDiscount),
		discountValue,
		discount,
	}
}

module.exports = {
	getShoppingCart,
	getProductsById,
	getPromotion,
	getProductsOnSale,
	getTotalPriceWithoutDiscount,
	extractPromotionPrices,
}
