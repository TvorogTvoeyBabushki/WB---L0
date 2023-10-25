import RenderService from '@/services/render.service'

import { Modal } from '@/components/ui/modal/modal'

import template from './cartFormPaymentWay.template.html?raw'
import { PaymentCards } from '../payment-cards/paymentCards'
import styles from './cartFormPaymentWay.module.scss'

export class CartFormPaymentWay {
	#handleClickShowPaymentCards(cartPaymentWayInfo) {
		this.cartFormModal = new Modal()
		this.cartFormPaymentCards = new PaymentCards()
		document.body.append(
			this.cartFormModal.draw(
				this.cartFormPaymentCards.draw(cartPaymentWayInfo, styles)
			)
		)
	}

	#addStyles() {
		this.element.classList.add(styles.cart_payment_way)
		this.cartPaymentWayHeader.classList.add(styles.cart_payment_way_header)
		this.cartPaymentWayInfo.classList.add(styles.cart_payment_way_info)
		this.cartPaymentWayImageCard.classList.add(styles.cart_payment_way_image)
		this.cartPaymentWayDataCard.classList.add(styles.cart_payment_way_data)
	}

	draw() {
		this.element = RenderService.htmlToElement(template)
		this.cartPaymentWayHeader = this.element.querySelector(
			'#cart__payment-way-header'
		)
		this.cartPaymentWayBtn = this.cartPaymentWayHeader.querySelector(
			'#cart__payment-way-btn'
		)
		this.cartPaymentWayInfo = this.element.querySelector(
			'#cart__payment-way-info'
		)
		this.cartPaymentWayImageCard = this.cartPaymentWayInfo.querySelector(
			'#cart__payment-way-image'
		)
		this.cartPaymentWayDataCard = this.cartPaymentWayInfo.querySelector(
			'#cart__payment-way-data'
		)

		this.cartPaymentWayBtn.addEventListener('click', () =>
			this.#handleClickShowPaymentCards(this.cartPaymentWayInfo)
		)

		this.#addStyles()
		return this.element
	}
}
