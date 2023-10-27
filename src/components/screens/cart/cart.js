import RenderService from '@/services/render.service'

import { SelectedProducts } from './selected-products/selectedProducts'
import { MissedProducts } from './missed-products/missedProducts'
import { CartSidebar } from './sidebar/cartSidebar'
import template from './cart.template.html?raw'
import { CartFrom } from './form/cartForm'
import styles from './cart.module.scss'

export class Cart {
	constructor(header, footer) {
		this.header = header
		this.footer = footer
		this.cartForm = new CartFrom()
		this.cartSidebar = new CartSidebar()
		this.selectedProducts = new SelectedProducts(
			this.header,
			this.cartForm,
			this.cartSidebar,
			this.footer
		)
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
		this.cartSidebarWrapper = this.element.querySelector('#cart__sidebar')

		this.selectedProducts.draw(this.cartLeftItem)
		this.missedProducts.draw(this.cartLeftItem)
		this.cartForm.draw(
			this.cartLeftItem,
			this.selectedProducts,
			this.cartSidebar
		)
		this.cartSidebar.draw(this.cartSidebarWrapper, this.cartForm)

		this.#addStyles()
		return this.element
	}
}
