import RenderService from '@/services/render.service'

import { Modal } from '@/components/ui/modal/modal'

import { PaymentCards } from './payment-cards/paymentCards'
import template from './cartForm.template.html?raw'
import styles from './cartForm.module.scss'

export class CartFrom {
	constructor() {
		sessionStorage.removeItem('payment card')
	}

	#handleClickShowPaymentCarts() {
		this.cartFormModal = new Modal()
		this.cartFormPaymentCards = new PaymentCards()
		document.body.append(
			this.cartFormModal.draw(this.cartFormPaymentCards.draw())
		)
	}

	#handleHoverDeliveryRefusalInfo = (e, variant) => {
		if (variant === 'enter') {
			this.#drawDeliveryRefusalInfoWrapper(e.target, variant)
		} else {
			this.#drawDeliveryRefusalInfoWrapper(e.target, variant)
		}
	}

	#drawDeliveryRefusalInfoWrapper(companyInfoEl, variant) {
		if (variant === 'enter') {
			this.companyInfoWrapper = document.createElement('div')

			this.companyInfoWrapper.append(
				'Если товары вам не подойдут, мы вернем их обратно на склад — это бесплатно'
			)
			companyInfoEl.append(this.companyInfoWrapper)
		} else {
			companyInfoEl.removeChild(companyInfoEl.querySelector('div'))
		}
	}

	#addStyles() {
		this.element.classList.add(styles.cart_form)
		this.cartFormDelivery.classList.add(styles.cart_delivery)
		this.cartFormDeliveryHeader.classList.add(styles.cart_delivery_header)
		this.cartFormDeliveryInfo.classList.add(styles.cart_delivery_info)
		this.cartFormDeliveryPoint.classList.add(styles.cart_delivery_point)
		this.cartFormDeliveryRefusal.classList.add(styles.cart_delivery_refusal)
	}

	drawDeliveryProducts(cartItems) {
		this.cartFormDeliveryProducts = document.createElement('div')
		this.cartFormDeliveryDateEl = document.createElement('span')
		this.cartFormDeliveryProductsWrapper = document.createElement('div')

		cartItems.forEach(cartItem => {
			this.cartFormDeliveryProductImageElWrapper = document.createElement('div')
			this.cartFormDeliveryProductImageElWrapperLink =
				document.createElement('a')
			this.cartFormDeliveryProductImageEl = document.createElement('img')
			this.cartFormDeliveryProductAmount = document.createElement('div')

			this.cartFormDeliveryProductImageElWrapperLink.setAttribute('href', '#')
			this.cartFormDeliveryProductImageEl.setAttribute('src', cartItem.src)
			this.cartFormDeliveryProductImageEl.setAttribute('alt', 'product')

			this.cartFormDeliveryProductAmount.append(cartItem.quantity)
			this.cartFormDeliveryProductImageElWrapper.append(
				this.cartFormDeliveryProductImageEl,
				this.cartFormDeliveryProductAmount
			)
			this.cartFormDeliveryProductImageElWrapperLink.append(
				this.cartFormDeliveryProductImageElWrapper
			)
			this.cartFormDeliveryProductsWrapper.append(
				this.cartFormDeliveryProductImageElWrapperLink
			)
		})

		this.cartFormDeliveryDateEl.append('5—6 февраля')
		this.cartFormDeliveryProducts.append(
			this.cartFormDeliveryDateEl,
			this.cartFormDeliveryProductsWrapper
		)
		this.cartFormDeliveryInfo.append(this.cartFormDeliveryProducts)
		this.cartFormDeliveryProducts.classList.add(styles.cart_delivery_products)
	}

	draw(wrapper) {
		this.element = RenderService.htmlToElement(template)

		this.cartFormDelivery = this.element.querySelector('#cart__delivery')
		this.cartFormDeliveryHeader =
			this.cartFormDelivery.querySelector('#cart__header')
		this.cartFormDeliveryBtn =
			this.cartFormDeliveryHeader.querySelector('#btn__delivery')
		this.cartFormDeliveryInfo = this.cartFormDelivery.querySelector(
			'#cart__delivery-info'
		)
		this.cartFormDeliveryPoint = this.cartFormDeliveryInfo.querySelector(
			'#cart__delivery-point'
		)
		this.cartFormDeliveryRefusal = this.cartFormDelivery.querySelector(
			'#cart__delivery-refusal'
		)
		this.cartFormDeliveryRefusalInfo =
			this.cartFormDeliveryRefusal.querySelector(
				'#cart__delivery-refusal__info'
			)

		this.cartFormDeliveryBtn.addEventListener(
			'click',
			this.#handleClickShowPaymentCarts
		)

		this.cartFormDeliveryRefusalInfo.addEventListener('mouseenter', e =>
			this.#handleHoverDeliveryRefusalInfo(e, 'enter')
		)
		this.cartFormDeliveryRefusalInfo.addEventListener('mouseleave', e =>
			this.#handleHoverDeliveryRefusalInfo(e, 'leave')
		)

		this.#addStyles()
		wrapper.append(this.element)
	}
}
