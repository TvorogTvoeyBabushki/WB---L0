import RenderService from '@/services/render.service'

import { Checkbox } from '@/components/ui/checkbox/checkbox'
import { Button } from '@/components/ui/button/button'

import { currency } from '@/utils/currency'

import { CartSidebarPriceWrapper } from './cartSidebarPriceWrapper'
import template from './cartSidebar.template.html?raw'
import styles from './cartSidebar.module.scss'

export class CartSidebar extends CartSidebarPriceWrapper {
	#validate

	constructor() {
		super()

		this.#validate = new Set()
	}

	#handleClickPayment = cartFormPersonal => {
		cartFormPersonal.getPersonalData().forEach(personalData => {
			if (!personalData.value.length || !personalData.isValidate) {
				cartFormPersonal.drawValidate(
					personalData.id,
					personalData.validationText,
					personalData.label
				)
				this.#validate.has(personalData.label) &&
					this.#validate.delete(personalData.label)
				return
			}

			this.#validate.add(personalData.label)
		})

		if (this.#validate.size === 5) {
			alert('Успех')
			cartFormPersonal.resetFields()
		} else {
			const formEl = cartFormPersonal.element.querySelector('form')
			formEl.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'nearest'
			})
		}
	}

	handleClickCheckbox = variant => {
		this.btnPayment.element.innerHTML = ''

		if (this.isActiveCheckbox && !variant) {
			this.isActiveCheckbox = false
			this.paymentCheckbox.addStyles('')
			this.btnPayment.element.innerHTML = 'Заказать'
		} else {
			if (!variant) {
				this.isActiveCheckbox = true
			}
			this.paymentCheckbox.addStyles('active')
			this.btnPayment.element.innerHTML = `Оплатить ${currency(
				this._amountDiscountPrice
			)} сом`
		}
	}

	#addStyles() {
		this.element.classList.add(styles.sidebar)

		this.priceHeader.classList.add(styles.price_header)
		this.priceContent.classList.add(styles.price_content)
		this.deliveryHeader.classList.add(styles.delivery_header)
		this.deliveryAddress.classList.add(styles.delivery_address)
		this.deliveryRefusal.classList.add(styles.delivery_refusal)

		this.paymentHeader.classList.add(styles.payment_header)
		this.paymentCard.classList.add(styles.payment_card)
		this.paymentFooter.classList.add(styles.payment_footer)

		this.btnPaymentWrapper.classList.add(styles.btn_payment_wrapper)
	}

	drawPriceWrapper() {
		this._drawPriceWrapper()
		this.#addStyles()
	}

	draw(wrapper, { cartFormDelivery, cartFormPaymentWay, cartFormPersonal }) {
		this.element = RenderService.htmlToElement(template)

		this.deliveryHeader = this.element.querySelector(
			'#cart__sidebar-delivery__header'
		)
		this.deliveryBtnAddressWay =
			this.deliveryHeader.querySelector('#btn__delivery')
		this.deliveryAddress = this.element.querySelector(
			'#cart__sidebar-delivery__address'
		)
		this.deliveryRefusal = this.element.querySelector(
			'#cart__sidebar-delivery__refusal'
		)
		this.deliveryRefusalInfo = this.deliveryRefusal.querySelector(
			'#cart__sidebar-delivery__refusal-info'
		)

		this.paymentHeader = this.element.querySelector(
			'#cart__sidebar-payment__header'
		)
		this.paymentBtnPaymentWay =
			this.paymentHeader.querySelector('#btn__payment-way')
		this.paymentCard = this.element.querySelector(
			'#cart__sidebar-payment__card'
		)
		this.paymentFooter = this.element.querySelector(
			'#cart__sidebar-payment__footer'
		)
		this.paymentCheckbox = new Checkbox()
		this.paymentCardLabel = this.paymentFooter.querySelector('label')
		this.paymentCardLabel.insertAdjacentElement(
			'afterbegin',
			this.paymentCheckbox.draw()
		)

		this.btnPayment = new Button()
		this.btnPaymentWrapper = this.element.querySelector(
			'#cart__sidebar-btn-payment'
		)
		this.btnPaymentWrapper.insertAdjacentElement(
			'afterbegin',
			this.btnPayment.draw('Заказать')
		)

		this.drawPriceWrapper()

		this.deliveryBtnAddressWay.addEventListener('click', () =>
			cartFormDelivery.handleClickShowDeliveryAddresses(
				cartFormDelivery.cartFormDeliveryPoint,
				{
					deliveryHeader: this.deliveryHeader,
					deliveryAddress: this.deliveryAddress
				}
			)
		)

		this.deliveryRefusalInfo.addEventListener('mouseenter', e =>
			cartFormDelivery.handleHoverDeliveryRefusalInfo(e, 'enter')
		)
		this.deliveryRefusalInfo.addEventListener('mouseleave', e =>
			cartFormDelivery.handleHoverDeliveryRefusalInfo(e, 'leave')
		)

		this.paymentBtnPaymentWay.addEventListener('click', () =>
			cartFormPaymentWay.handleClickShowPaymentCards(
				cartFormPaymentWay.cartPaymentWayCard,
				this.paymentCard
			)
		)

		this.isActiveCheckbox = false
		this.paymentCheckbox.element.addEventListener('change', () =>
			this.handleClickCheckbox('')
		)

		this.btnPayment.element.addEventListener('click', () =>
			this.#handleClickPayment(cartFormPersonal)
		)

		this.#addStyles()
		wrapper.append(this.element)
	}
}
