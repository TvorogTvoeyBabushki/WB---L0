import { Checkbox } from '@/components/ui/checkbox/checkbox'

import RenderService from '@/services/render.service'

import { currency } from '@/utils/currency'

import { UseSelectedProducts } from './useSelectedProducts'
import template from './selectedProducts.template.html?raw'
import styles from './selectedProducts.module.scss'

export class SelectedProducts extends UseSelectedProducts {
	#sessionItemsInfo

	constructor(header, cartForm, cartSidebar) {
		super(header, cartForm, cartSidebar)

		this.#sessionItemsInfo = []
		sessionStorage.removeItem('info item')
	}

	#parseSessionItemsInfo() {
		if (sessionStorage.getItem('info item')) {
			this.#sessionItemsInfo = JSON.parse(sessionStorage.getItem('info item'))
		} else {
			this.#sessionItemsInfo = []
		}
	}

	#handleClickProductsArrow = e => {
		if (this.isShowSelectedProducts) {
			e.currentTarget.classList.remove(styles.active)
			this.#parseSessionItemsInfo()

			const quantity = this.#sessionItemsInfo.reduce(
				(acc, itemInfo) => acc + itemInfo.quantity,
				0
			)
			const amount = this.#sessionItemsInfo.reduce(
				(acc, itemInfo) => acc + itemInfo.amount.discount,
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

			this.#sessionItemsInfo.forEach(itemInfo => {
				itemInfo.isSelectedAll
					? this.checkboxSelectAll.addStyles('active')
					: this.checkboxSelectAll.addStyles('')
			})

			this.checkboxSelectAllLabel.style.display = 'flex'
			this.element.classList.add(styles.show)
			this.isShowSelectedProducts = true
		}
	}

	#addStyles() {
		this.element.classList.add(styles.selected_products)
	}

	#drawCheckboxSelectAll() {
		this.checkboxSelectAll = new Checkbox()
		this.checkboxSelectAllLabel.insertAdjacentElement(
			'afterbegin',
			this.checkboxSelectAll.draw()
		)

		this.checkboxSelectAll.element.addEventListener('click', () =>
			this._handleClickCheckbox(this.checkboxSelectAll)
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

		this.isShowSelectedProducts = true
		this.btnSelectedProducts.classList.add(styles.active)
		this.btnSelectedProducts.addEventListener('click', e =>
			this.#handleClickProductsArrow(e)
		)

		this.element.classList.add(styles.show)
		this._drawSelectedProductsWrapper(this.selectedProductsWrapper)
		this.#drawCheckboxSelectAll()
		this.#addStyles()

		wrapper.append(this.element)
	}
}
