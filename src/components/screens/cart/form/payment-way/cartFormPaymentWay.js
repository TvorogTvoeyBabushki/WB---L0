import RenderService from '@/services/render.service'

import { Modal } from '@/components/ui/modal/modal'

import template from './cartFormPaymentWay.template.html?raw'
import { PaymentCards } from '../payment-cards/paymentCards'
import styles from './cartFormPaymentWay.module.scss'

export class CartFormPaymentWay {
	handleClickShowPaymentCards(cartPaymentWayCard, cartSidebarPaymentCard) {
		this.cartFormModal = new Modal()
		this.cartFormPaymentCards = new PaymentCards()
		document.body.append(
			this.cartFormModal.draw(
				this.cartFormPaymentCards.draw(
					cartPaymentWayCard,
					styles,
					cartSidebarPaymentCard
				)
			)
		)
	}

	#addStyles() {
		this.element.classList.add(styles.cart_payment_way)
		this.cartPaymentWayHeader.classList.add(styles.cart_payment_way_header)
		this.cartPaymentWayCard.classList.add(styles.cart_payment_way_card)
		this.cartPaymentWayCardImage.classList.add(styles.card_image)
		this.cartPaymentWayCardData.classList.add(styles.card_data)
	}

	draw(cartSidebar) {
		this.element = RenderService.htmlToElement(template)
		this.cartPaymentWayHeader = this.element.querySelector(
			'#cart__payment-way__header'
		)
		this.cartPaymentWayBtn =
			this.cartPaymentWayHeader.querySelector('#btn__payment-way')
		this.cartPaymentWayCard = this.element.querySelector(
			'#cart__payment-way__card'
		)
		this.cartPaymentWayCardImage = this.cartPaymentWayCard.querySelector(
			'#cart__payment-way__card-image'
		)
		this.cartPaymentWayCardData = this.cartPaymentWayCard.querySelector(
			'#cart__payment-way__card-data'
		)

		this.cartPaymentWayBtn.addEventListener('click', () =>
			this.handleClickShowPaymentCards(
				this.cartPaymentWayCard,
				cartSidebar.paymentCard
			)
		)

		this.#addStyles()
		return this.element
	}
}
