import RenderService from '@/services/render.service'

import { Modal } from '@/components/ui/modal/modal'

import { DeliveryAddresses } from '../delivery-addresses/deliveryAddresses'
import template from './cartFormDelivery.template.html?raw'
import styles from './cartFormDelivery.module.scss'

export class CartFormDelivery {
	#handleClickShowDeliveryAddresses(cartFormDeliveryPoint) {
		this.cartFormModal = new Modal()
		this.cartFormDeliveryAddresses = new DeliveryAddresses()
		document.body.append(
			this.cartFormModal.draw(
				this.cartFormDeliveryAddresses.draw(
					'pick-up point',
					cartFormDeliveryPoint,
					styles
				)
			)
		)
	}

	#handleHoverDeliveryRefusalInfo = (e, variant) => {
		if (variant === 'enter') {
			this.#drawDeliveryRefusalInfoWrapper(e.target, variant)
		} else {
			this.#drawDeliveryRefusalInfoWrapper(e.target, variant)
		}
	}

	#addStyles() {
		this.element.classList.add(styles.cart_delivery)
		this.cartFormDeliveryHeader.classList.add(styles.cart_delivery_header)
		this.cartFormDeliveryInfo.classList.add(styles.cart_delivery_info)
		this.cartFormDeliveryPoint.classList.add(styles.cart_delivery_point)
		this.cartFormDeliveryPointRating.classList.add(
			styles.cart_delivery_point_rating
		)
		this.cartFormDeliveryRefusal.classList.add(styles.cart_delivery_refusal)
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

	draw() {
		this.element = RenderService.htmlToElement(template)
		this.cartFormDeliveryHeader = this.element.querySelector(
			'#cart__delivery-header'
		)
		this.cartFormDeliveryBtn =
			this.cartFormDeliveryHeader.querySelector('#btn__delivery')
		this.cartFormDeliveryInfo = this.element.querySelector(
			'#cart__delivery-info'
		)
		this.cartFormDeliveryPoint = this.cartFormDeliveryInfo.querySelector(
			'#cart__delivery-point'
		)
		this.cartFormDeliveryPointRating = this.cartFormDeliveryPoint.querySelector(
			'#cart__delivery-point__rating'
		)

		this.cartFormDeliveryRefusal = this.element.querySelector(
			'#cart__delivery-refusal'
		)
		this.cartFormDeliveryRefusalInfo =
			this.cartFormDeliveryRefusal.querySelector(
				'#cart__delivery-refusal__info'
			)

		this.cartFormDeliveryBtn.addEventListener('click', () =>
			this.#handleClickShowDeliveryAddresses(this.cartFormDeliveryPoint)
		)

		this.cartFormDeliveryRefusalInfo.addEventListener('mouseenter', e =>
			this.#handleHoverDeliveryRefusalInfo(e, 'enter')
		)
		this.cartFormDeliveryRefusalInfo.addEventListener('mouseleave', e =>
			this.#handleHoverDeliveryRefusalInfo(e, 'leave')
		)

		this.#addStyles()
		return this.element
	}
}
