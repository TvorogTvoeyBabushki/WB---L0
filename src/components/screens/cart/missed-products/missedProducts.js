import RenderService from '@/services/render.service'

import template from './missedProducts.template.html?raw'
import styles from './missedProducts.module.scss'
import { CartItem } from '../item/cartItem'

export class MissedProducts {
	#cartMissedItemsData

	constructor() {
		this.#cartMissedItemsData = []

		this.#parseCartMissedItemsDataLS()
	}

	#parseCartMissedItemsDataLS() {
		if (localStorage.getItem('cart missed items')) {
			this.#cartMissedItemsData = [
				...JSON.parse(localStorage.getItem('cart missed items'))
			]
		} else {
			this.#cartMissedItemsData = []
		}
	}

	#handleClickProductsArrow = e => {
		if (this.isShowMissedProducts) {
			e.currentTarget.classList.remove(styles.active)
			this.missedProductsWrapper.classList.remove(styles.show)

			this.isShowMissedProducts = false
		} else {
			e.currentTarget.classList.add(styles.active)
			this.missedProductsWrapper.classList.add(styles.show)

			this.isShowMissedProducts = true
		}
	}

	#handleDeleteCartMissedItem = cartItem => {
		this.#parseCartMissedItemsDataLS()

		const updateCartMissedItems = this.#cartMissedItemsData.filter(
			cartItemData => cartItemData.id !== cartItem.id
		)

		localStorage.setItem(
			'cart missed items',
			JSON.stringify(updateCartMissedItems)
		)

		this.missedHEaderSpanEl.innerHTML = ''
		this.missedProductsWrapper.innerHTML = ''
		this.#drawMissedHeader()
		this.#drawMissedProductsWrapper()
	}

	#addStyles() {
		this.element.classList.add(styles.missed_products)
	}

	#drawMissedHeader() {
		this.#parseCartMissedItemsDataLS()

		this.missedHEaderSpanEl = document.createElement('span')
		this.missedHEaderSpanEl.innerHTML = `Отсутствуют <span>·</span> ${
			this.#cartMissedItemsData.length
		} товара`

		this.missedHeader.insertAdjacentElement(
			'afterbegin',
			this.missedHEaderSpanEl
		)
	}

	#drawMissedProductsWrapper() {
		this.#parseCartMissedItemsDataLS()

		this.#cartMissedItemsData.forEach((cartItem, index) => {
			this.cartItem = new CartItem('missed')
			const hrEl = document.createElement('hr')

			this.missedProductsWrapper.append(
				index !== 0 ? hrEl : '',
				this.cartItem.draw(cartItem)
			)
			this.missedProductsWrapper.classList.add(styles.show)

			this.btnDeleteMissedProduct =
				this.cartItem.cartItemPrice.cartItemQuantity.quantityPanel.querySelector(
					'#btn__cart-delete'
				)
			this.btnDeleteMissedProduct.addEventListener('click', () =>
				this.#handleDeleteCartMissedItem(cartItem)
			)
		})
	}

	draw(wrapper) {
		this.element = RenderService.htmlToElement(template)
		this.missedHeader = this.element.querySelector('#cart__missed-header')
		this.missedProductsWrapper = this.element.querySelector(
			'#cart__missed-products-wrapper'
		)
		this.btnMissedProducts = this.element.querySelector('#btn__missed-products')

		this.isShowMissedProducts = true
		this.btnMissedProducts.classList.add(styles.active)
		this.btnMissedProducts.addEventListener('click', e =>
			this.#handleClickProductsArrow(e)
		)

		this.#drawMissedHeader()
		this.#drawMissedProductsWrapper()
		this.#addStyles()

		wrapper.append(this.element)
	}
}
