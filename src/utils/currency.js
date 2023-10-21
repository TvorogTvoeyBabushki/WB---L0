export const currency = currency =>
	new Intl.NumberFormat('ky-KG', {
		maximumFractionDigits: 0
	}).format(currency)
