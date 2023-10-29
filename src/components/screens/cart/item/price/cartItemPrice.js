import { currency } from '@/utils/currency'

import { CartItemQuantity } from './quantity/cartItemQuantity'
import { UseCartItemPrice } from './useCartItemPrice'
import styles from './cartItemPrice.module.scss'

export class CartItemPrice extends UseCartItemPrice {
	#quantity

	constructor(variant, cartSidebar, handleClickCheckbox) {
		super()

		this.priceWrapper = document.createElement('div')
		this.quantityWrapper = document.createElement('div')
		this.quantityBtnElsWrapper = document.createElement('div')
		this.price = document.createElement('div')

		this.#quantity = 1
		this.variant = variant
		this.cartSidebar = cartSidebar
		this.handleClickCheckbox = handleClickCheckbox
	}

	#handleChangeQuantity = (variant, cartItem, cartForm, header, footer) => {
		const sessionItemsInfo =
			JSON.parse(sessionStorage.getItem('info item')) || []

		if (variant === 'decrement') {
			this.#quantity--

			this._handleStringifySessionItemsInfo(
				variant,
				sessionItemsInfo,
				cartItem,
				this.#quantity
			)
		} else {
			this.#quantity++

			this._handleStringifySessionItemsInfo(
				variant,
				sessionItemsInfo,
				cartItem,
				this.#quantity
			)
		}

		// header.draw().innerHTML = ''
		this.quantityBtnElsWrapper.innerHTML = ''
		this.price.innerHTML = ''
		this.cartSidebar.priceWrapper.remove()

		header.drawAmountItems(sessionItemsInfo)
		footer.tabbar.element && footer.tabbar.drawAmountItems(sessionItemsInfo)
		this.#drawQuantityBtnElsWrapper(cartItem, cartForm, header, footer)
		this.#drawPrice(cartItem)
		this.cartItemQuantity.drawQuantityValidate(
			cartItem,
			this.#quantity,
			this.quantityWrapper
		)
		this.cartSidebar.drawPriceWrapper()

		sessionItemsInfo.forEach(itemInfo => {
			if (itemInfo.id === cartItem.id && itemInfo.isSelectedProduct) {
				this.handleClickCheckbox(cartItem, cartForm, 'quantity')
			}
		})
		this.cartSidebar.isActiveCheckbox &&
			this.cartSidebar.handleClickCheckbox('quantity')
	}

	#handleHoverBasePriceInfo = (e, variant) => {
		this._handleHoverBasePriceInfo(e, variant)
	}

	#addStyles() {
		this.priceWrapper.classList.add(styles.price_wrapper)
		this.price.classList.add(styles.price)
		this.quantityBtnElsWrapper.classList.add(styles.quantity_btn_wrapper)
	}

	#drawQuantityBtnElsWrapper(cartItem, cartForm, header, footer) {
		this.quantitySpan = document.createElement('span')
		this.quantityBtnEls = ['decrement', 'increment']

		this.quantityBtnEls.forEach(el => {
			this.childrenBtn = document.createElement('span')
			this[el] = document.createElement('button')

			this.childrenBtn.append(el === 'decrement' ? '−' : '+')
			this[el].append(this.childrenBtn)
			this.quantityBtnElsWrapper.append(this[el])
			;(this.#quantity === 1 && el === 'decrement') ||
			(cartItem.quantity === this.#quantity && el === 'increment')
				? (this[el].disabled = true)
				: (this[el].disabled = false)

			this[el].addEventListener('click', () =>
				this.#handleChangeQuantity(el, cartItem, cartForm, header, footer)
			)
		})

		this.quantitySpan.append(this.#quantity)
		this.increment.before(this.quantitySpan)
	}

	#drawQuantity(cartItem, cartForm, header, footer) {
		this.cartItemQuantity = new CartItemQuantity()

		if (this.variant === 'selected') {
			this.#drawQuantityBtnElsWrapper(cartItem, cartForm, header, footer)
			this.quantityWrapper.append(this.quantityBtnElsWrapper)
		}

		this.cartItemQuantity.drawQuantityPanel(cartItem, this.quantityWrapper)
		this.variant === 'missed' &&
			this.quantityWrapper.classList.add(styles.missed)

		return this.quantityWrapper
	}

	#drawPrice(cartItem) {
		this.discountPrice = document.createElement('div')
		this.basePrice = document.createElement('div')

		this.discountPrice.innerHTML = `${currency(
			cartItem.price.discount * this.#quantity
		)} <span>сом</span>`
		this.basePrice.innerHTML = `${currency(
			cartItem.price.base * this.#quantity
		)} <span>сом</span>`

		this.price.append(this.discountPrice, this.basePrice)

		this.basePrice.addEventListener('mouseenter', e =>
			this.#handleHoverBasePriceInfo(e, 'enter')
		)
		this.basePrice.addEventListener('mouseleave', e =>
			this.#handleHoverBasePriceInfo(e, 'leave')
		)

		return this.price
	}

	draw(cartItem, cartForm, header, footer) {
		const sessionItemsInfo =
			JSON.parse(sessionStorage.getItem('info item')) || []

		sessionItemsInfo.forEach(itemInfo => {
			if (itemInfo.id === cartItem.id) {
				this.#quantity = itemInfo.quantity
			}
		})

		this.priceWrapper.append(
			this.#drawQuantity(cartItem, cartForm, header, footer),
			this.variant === 'selected' ? this.#drawPrice(cartItem) : ''
		)

		this.cartItemQuantity.drawQuantityValidate(
			cartItem,
			this.#quantity,
			this.quantityWrapper
		)

		this.#addStyles()
		return this.priceWrapper
	}
}
