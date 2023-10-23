import renderService from '@/services/render.service'

import { RadioButton } from '@/components/ui/radio/radioButton'
import { Button } from '@/components/ui/button/button'

import { paymentCardsData } from '@/data/paymentCards.data'

import template from './paymentCards.template.html?raw'
import styles from './paymentCards.module.scss'

export class PaymentCards {
	constructor() {
		this.paymentCardInfo = null
	}

	get getPaymentCardInfo() {
		return this.paymentCardInfo
	}

	set getPaymentCardInfo(paymentCardInfo) {
		this.paymentCardInfo = paymentCardInfo
	}

	#handleClickChoose = () => {
		sessionStorage.setItem(
			'payment card',
			JSON.stringify(this.getPaymentCardInfo)
		)
		this.#handleClickClose()
	}

	#handleClickClose = () => {
		const modal = document.querySelector('#modal')
		document.body.removeChild(modal)
	}

	#handleClickRadioBtn = (index, paymentCard) => {
		this.paymentCardsRadioBtnComponents.forEach(
			paymentCardsRadioBtnComponent => {
				paymentCardsRadioBtnComponent.component.addStyles('')

				if (paymentCardsRadioBtnComponent.id === index) {
					paymentCardsRadioBtnComponent.component.addStyles('active')
					this.getPaymentCardInfo = paymentCard
				}
			}
		)
	}

	#addStyle() {
		this.element.classList.add(styles.payment_cards)
		this.paymentCardsHeader.classList.add(styles.payment_cards_header)
		this.paymentCardsWrapper.classList.add(styles.payment_cards_wrapper)
		this.paymentCardsBtnChooseWrapper.classList.add(
			styles.payment_cards_btn_choose
		)
	}

	draw() {
		this.element = renderService.htmlToElement(template)
		this.paymentCardsHeader = this.element.querySelector(
			'#payment-cards__header'
		)
		this.paymentCardBtnClose = this.paymentCardsHeader.querySelector(
			'#payment-cards__btn-close'
		)
		this.paymentCardsWrapper = this.element.querySelector(
			'#payment-cards__wrapper'
		)
		this.paymentCardsBtnChooseWrapper = this.element.querySelector(
			'#payment-cards__btn-choose'
		)

		this.paymentCardsRadioBtnComponents = []
		paymentCardsData.forEach((paymentCard, index) => {
			this.paymentCardsRadioBtn = new RadioButton()
			this.paymentCardsWrapperItems = document.createElement('div')
			this.paymentCardsImageWrapper = document.createElement('div')
			this.paymentCardsImage = document.createElement('img')
			this.paymentCardsNumber = document.createElement('span')

			this.paymentCardsImage.setAttribute('src', paymentCard.src)
			this.paymentCardsImage.setAttribute('alt', paymentCard.name)
			this.paymentCardsImageWrapper.append(this.paymentCardsImage)
			this.paymentCardsNumber.append(paymentCard.cardNumber)
			this.paymentCardsWrapperItems.append(
				this.paymentCardsRadioBtn.draw('card'),
				this.paymentCardsImageWrapper,
				this.paymentCardsNumber
			)
			this.paymentCardsWrapper.append(this.paymentCardsWrapperItems)

			index === 0 &&
				(this.paymentCardsRadioBtn.addStyles('active'),
				(this.paymentCardInfo = paymentCard))

			this.paymentCardsRadioBtnComponents.push({
				id: index,
				component: this.paymentCardsRadioBtn
			})
			this.paymentCardsRadioBtn.element.addEventListener('change', () =>
				this.#handleClickRadioBtn(index, paymentCard)
			)
		})

		this.paymentCardsBtnChoose = new Button()
		this.paymentCardsBtnChooseWrapper.append(
			this.paymentCardsBtnChoose.draw('Выбрать')
		)

		this.paymentCardBtnClose.addEventListener('click', this.#handleClickClose)
		this.paymentCardsBtnChoose.element.addEventListener(
			'click',
			this.#handleClickChoose
		)

		this.#addStyle()
		return this.element
	}
}
