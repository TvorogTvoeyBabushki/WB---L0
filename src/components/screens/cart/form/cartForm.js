import RenderService from '@/services/render.service'

import { CartFormPersonal } from './personal-info/cartFormPersonalInfo'
import { CartFormPaymentWay } from './payment-way/cartFormPaymentWay'
import { CartFormDelivery } from './delivery/cartFormDelivery'
import template from './cartForm.template.html?raw'
import styles from './cartForm.module.scss'

export class CartFrom {
	constructor() {
		this.cartFormDelivery = new CartFormDelivery()
		this.cartFormPaymentWay = new CartFormPaymentWay()
		this.cartFormPersonal = new CartFormPersonal()

		sessionStorage.removeItem('payment card')
		sessionStorage.removeItem('delivery address')
	}

	#addStyles() {
		this.element.classList.add(styles.cart_form)
	}

	draw(wrapper) {
		this.element = RenderService.htmlToElement(template)
		this.element.append(
			this.cartFormDelivery.draw(),
			this.cartFormPaymentWay.draw(),
			this.cartFormPersonal.draw()
		)

		this.#addStyles()
		wrapper.append(this.element)
	}
}
