import RenderService from '@/services/render.service'

import template from './cart.template.html?raw'
import { cartItemsData } from '@/data/cartItems.data'

export class Cart {
	constructor() {}

	#stringifyCartItemsDataLS() {
		localStorage.setItem('cart items', JSON.stringify(cartItemsData))
	}

	draw() {
		this.element = RenderService.htmlToElement(template)
		this.#stringifyCartItemsDataLS()

		return this.element
	}
}
