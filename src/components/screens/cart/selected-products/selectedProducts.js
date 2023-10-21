import { Checkbox } from '@/components/ui/checkbox/checkbox'

import RenderService from '@/services/render.service'

import { currency } from '@/utils/currency'

import template from './selectedProducts.template.html?raw'
import styles from './selectedProducts.module.scss'
import { CartItem } from '../item/cartItem'

export class SelectedProducts {
	#cartItemsData

	constructor(header) {
		this.header = header
		this.#cartItemsData = []

		this.#parseCartItemsDataLS()
	}

	#parseCartItemsDataLS() {
		if (localStorage.getItem('cart items')) {
			this.#cartItemsData = [...JSON.parse(localStorage.getItem('cart items'))]
		} else {
			this.#cartItemsData = []
		}
	}

	#handleClickCheckbox = variant => {
		if (variant === 'all') {
			this.checkboxSelectAll.addStyles(variant)
		}
	}

	#handleClickProductsArrow = e => {
		if (this.isShowSelectedProducts) {
			e.currentTarget.classList.remove(styles.active)
			const sessionItemsInfo =
				JSON.parse(sessionStorage.getItem('info item')) || []
			const quantity = sessionItemsInfo.reduce(
				(acc, itemInfo) => acc + itemInfo.quantity,
				0
			)
			const amount = sessionItemsInfo.reduce(
				(acc, itemInfo) => acc + itemInfo.amount,
				0
			)

			const span = document.createElement('span')
			span.innerHTML = `${quantity} товаров <span>·</span> ${currency(
				amount
			)} сом`
			this.checkboxSelectAllLabel.innerHTML = ''
			this.checkboxSelectAllLabel.insertAdjacentElement('beforebegin', span)

			this.checkboxSelectAllLabel.style.display = 'none'
			this.element.classList.remove(styles.show)
			this.isShowSelectedProducts = false
		} else {
			e.currentTarget.classList.add(styles.active)

			this.checkboxSelectAllLabel.innerHTML = 'Выбрать все'
			const parentCheckboxSelectAllLabel =
				this.checkboxSelectAllLabel.parentNode
			parentCheckboxSelectAllLabel.removeChild(
				parentCheckboxSelectAllLabel.querySelector('span')
			)
			this.#drawCheckboxSelectAll()

			this.checkboxSelectAllLabel.style.display = 'flex'
			this.element.classList.add(styles.show)
			this.isShowSelectedProducts = true
		}
	}

	#handleDeleteCartItem = cartItem => {
		this.#parseCartItemsDataLS()

		const updateCartItems = this.#cartItemsData.filter(
			cartItemData => cartItemData.id !== cartItem.id
		)

		localStorage.setItem('cart items', JSON.stringify(updateCartItems))

		this.selectedProductsWrapper.innerHTML = ''
		this.#drawSelectedProductsWrapper()
		this.header.draw().innerHTML = ''
		this.header.draw()
	}

	#addStyles() {
		this.element.classList.add(styles.selected_products)
	}

	#drawSelectedProductsWrapper() {
		this.#parseCartItemsDataLS()
		const itemInfoSession = []

		this.#cartItemsData.forEach(cartItem => {
			this.cartItem = new CartItem('selected')
			itemInfoSession.push({
				id: cartItem.id,
				quantity: 1,
				amount: cartItem.price.discount
			})

			this.selectedProductsWrapper.append(this.cartItem.draw(cartItem))
			this.element.classList.add(styles.show)

			this.btnDeleteProduct =
				this.cartItem.cartItemPrice.cartItemQuantity.quantityPanel.querySelector(
					'#btn__cart-delete'
				)
			this.btnDeleteProduct.addEventListener('click', () =>
				this.#handleDeleteCartItem(cartItem)
			)
		})

		sessionStorage.setItem('info item', JSON.stringify(itemInfoSession))
	}

	#drawCheckboxSelectAll() {
		this.checkboxSelectAll = new Checkbox()
		this.checkboxSelectAllLabel.insertAdjacentElement(
			'afterbegin',
			this.checkboxSelectAll.draw()
		)

		this.checkboxSelectAll.element.addEventListener('click', () =>
			this.#handleClickCheckbox('all')
		)
	}

	draw(wrapper) {
		this.element = RenderService.htmlToElement(template)
		this.checkboxSelectAllLabel = this.element.querySelector(
			'#cart__checkbox--select-all'
		)
		this.btnSelectedProducts = this.element.querySelector(
			'#btn__selected-products'
		)
		this.selectedProductsWrapper = this.element.querySelector(
			'#cart__selected-products-wrapper'
		)

		this.#drawCheckboxSelectAll()

		this.isShowSelectedProducts = true
		this.btnSelectedProducts.classList.add(styles.active)
		this.btnSelectedProducts.addEventListener('click', e =>
			this.#handleClickProductsArrow(e)
		)

		this.#drawSelectedProductsWrapper()
		this.#addStyles()

		wrapper.append(this.element)
	}
}
