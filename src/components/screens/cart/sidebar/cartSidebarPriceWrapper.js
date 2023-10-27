import { currency } from '@/utils/currency'

export class CartSidebarPriceWrapper {
	#sessionItemsInfo

	constructor() {
		this.#sessionItemsInfo = []
		this._amountDiscountPrice = 0
	}

	#parseSessionItemsInfo() {
		if (sessionStorage.getItem('info item')) {
			this.#sessionItemsInfo = JSON.parse(sessionStorage.getItem('info item'))
		} else {
			this.#sessionItemsInfo = []
		}
	}

	_drawPriceWrapper() {
		this.#parseSessionItemsInfo()
		const quantity =
			this.#sessionItemsInfo.reduce((acc, itemInfo) => {
				if (itemInfo.isSelectedProduct) {
					return acc + itemInfo.quantity
				} else {
					return acc
				}
			}, 0) || 0
		this._amountDiscountPrice = this.#sessionItemsInfo.reduce(
			(acc, itemInfo) => {
				if (itemInfo.isSelectedProduct) {
					return acc + itemInfo.amount.discount
				} else {
					return acc
				}
			},
			0
		)
		const amountBasePrice =
			this.#sessionItemsInfo.reduce((acc, itemInfo) => {
				if (itemInfo.isSelectedProduct) {
					return acc + itemInfo.amount.base
				} else {
					return acc
				}
			}, 0) || 0
		const amountDiscount = amountBasePrice - this._amountDiscountPrice

		this.priceWrapper = document.createElement('div')
		this.priceHeader = document.createElement('div')
		this.priceContent = document.createElement('div')
		this.priceBase = document.createElement('div')
		this.priceDiscount = document.createElement('div')
		this.priceDelivery = document.createElement('div')

		this.priceHeader.innerHTML = `
      <span>Итого</span>
      <span>${currency(this._amountDiscountPrice)}<span>сом</span></span>
    `
		this.priceBase.innerHTML = `
      <span>${quantity} товара</span>
      <span>${currency(amountBasePrice)} сом</span>
    `
		this.priceDiscount.innerHTML = `
      <span>Скидка</span>
      <span>−${currency(amountDiscount)} сом</span>
    `
		this.priceDelivery.innerHTML = `
      <span>Доставка</span>
      <span>Бесплатно</span>
    `

		this.priceContent.append(
			this.priceBase,
			this.priceDiscount,
			this.priceDelivery
		)
		this.priceWrapper.append(this.priceHeader, this.priceContent)
		this.element.insertAdjacentElement('afterbegin', this.priceWrapper)
	}
}
