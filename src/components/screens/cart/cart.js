import RenderService from '@/services/render.service'

import { SelectedProducts } from './selected-products/selectedProducts'
import { MissedProducts } from './missed-products/missedProducts'
import template from './cart.template.html?raw'
import styles from './cart.module.scss'

export class Cart {
	constructor(header) {
		this.header = header
		this.selectedProducts = new SelectedProducts(this.header)
		this.missedProducts = new MissedProducts()
	}

	#addStyles() {
		this.element.classList.add(styles.cart)
		this.cartWrapper.classList.add(styles.wrapper)
		this.cartLeftItem.classList.add(styles.left_item)
	}

	draw() {
		this.element = RenderService.htmlToElement(template)
		this.cartWrapper = this.element.querySelector('#cart__wrapper')
		this.cartLeftItem = this.element.querySelector('#cart__left-item')

		this.selectedProducts.draw(this.cartLeftItem)
		this.missedProducts.draw(this.cartLeftItem)

		this.#addStyles()
		return this.element
	}
}
