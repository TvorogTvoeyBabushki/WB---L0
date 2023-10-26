import RenderService from '@/services/render.service'

import { Button } from '@/components/ui/button/button'

import { DeliveryAddressesWrapperItems } from './deliveryAddressesWrapperItems'
import template from './deliveryAddresses.template.html?raw'
import styles from './deliveryAddresses.module.scss'

export class DeliveryAddresses extends DeliveryAddressesWrapperItems {
	constructor() {
		super()
	}

	#handleClickChoose = (
		cartFormDeliveryPoint,
		cartFormDeliveryStyles,
		cartSidebarDeliveryPoint
	) => {
		const cartSidebarDeliveryWay =
			cartSidebarDeliveryPoint.deliveryHeader.querySelector('h3')

		cartSidebarDeliveryWay.innerHTML = `
			${
				this.getDeliveryAddressInfo.way === 'pick-up point'
					? 'Доставка в пункт выдачи'
					: 'Доставка курьером'
			}
			`
		cartSidebarDeliveryPoint.deliveryAddress.innerHTML = `
				${
					this.getDeliveryAddressInfo.way === 'pick-up point'
						? this.getDeliveryAddressInfo.deliveryAddress.address
						: this.getDeliveryAddressInfo.deliveryAddress
				}
				<span>5–6 фев</span>
			`

		cartFormDeliveryPoint.innerHTML = `
				<span>${
					this.getDeliveryAddressInfo.way === 'pick-up point'
						? 'Пункт выдачи'
						: 'Курьером'
				}</span>
				<div>
					<div>${
						this.getDeliveryAddressInfo.way === 'pick-up point'
							? this.getDeliveryAddressInfo.deliveryAddress.address
							: this.getDeliveryAddressInfo.deliveryAddress
					}</div>
					<div id="cart__delivery-point__rating">
						<div>
							<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M6.69769 1.14922C6.43817 0.528396 5.56198 0.528387 5.30244 1.14919L6.69769 1.14922ZM5.30244 1.14919L4.14719 3.90977L1.19202 4.16613C0.519264 4.22467 0.262282 5.05966 0.759713 5.49464L3.00514 7.45915L2.33207 10.3824C2.18436 11.0238 2.87792 11.5567 3.46133 11.2023L6.00032 9.65611L8.53797 11.2015C9.12269 11.5588 9.81568 11.0227 9.66861 10.3826L8.99549 7.45915L11.2402 5.49537C11.7385 5.05961 11.4793 4.22519 10.8083 4.16667L7.85294 3.91029L6.69769 1.14922" fill="#FF970D"/>
							</svg>
							${this.getDeliveryAddressInfo.deliveryAddress.rating}
						</div>
						<span>Ежедневно с 10 до 21</span>
					</div>
				</div>
    	`
		const deliveryPointContent = cartFormDeliveryPoint.querySelector('div')
		const deliveryPointRating = deliveryPointContent.querySelector(
			'#cart__delivery-point__rating'
		)

		deliveryPointRating.classList.add(
			cartFormDeliveryStyles.cart_delivery_point_rating
		)
		if (this.getDeliveryAddressInfo.way === 'courier') {
			deliveryPointContent.removeChild(deliveryPointRating)
		}

		this.#handleClickClose()
	}

	#handleClickClose = () => {
		const modal = document.querySelector('#modal')
		document.body.removeChild(modal)
	}

	#addStyle() {
		this.element.classList.add(styles.delivery_addresses)
		this.deliveryAddressesHeader.classList.add(styles.delivery_addresses_header)
		this.deliveryAddressesWay.classList.add(styles.delivery_addresses_way)
		this.deliveryAddressesWrapper.classList.add(
			styles.delivery_addresses_wrapper
		)
		this.deliveryAddressesBtnChooseWrapper.classList.add(
			styles.delivery_addresses_choose
		)
	}

	draw(
		way,
		cartFormDeliveryPoint,
		cartFormDeliveryStyles,
		cartSidebarDeliveryPoint
	) {
		this.element = RenderService.htmlToElement(template)
		this.deliveryAddressesHeader = this.element.querySelector(
			'#delivery-addresses__header'
		)
		this.deliveryAddressesBtnClose = this.deliveryAddressesHeader.querySelector(
			'#delivery-addresses__btn-close'
		)
		this.deliveryAddressesWay = this.element.querySelector(
			'#delivery-addresses__way'
		)
		this.deliveryAddressesWrapper = this.element.querySelector(
			'#delivery-addresses__wrapper'
		)
		this.deliveryAddressesWrapperItems =
			this.deliveryAddressesWrapper.querySelector(
				'#delivery-addresses__wrapper-items'
			)
		this.deliveryAddressesBtnChooseWrapper = this.element.querySelector(
			'#delivery-addresses__btn-choose'
		)
		this.deliveryAddressesBtnChoose = new Button()
		this.deliveryAddressesBtnChooseWrapper.append(
			this.deliveryAddressesBtnChoose.draw('Выбрать')
		)

		this._drawDeliveryAddressesWrapperItems(
			this.deliveryAddressesWrapperItems,
			way,
			this.deliveryAddressesBtnChoose,
			this.deliveryAddressesWay,
			styles
		)

		this.deliveryAddressesBtnClose.addEventListener(
			'click',
			this.#handleClickClose
		)
		this.deliveryAddressesBtnChoose.element.addEventListener('click', () =>
			this.#handleClickChoose(
				cartFormDeliveryPoint,
				cartFormDeliveryStyles,
				cartSidebarDeliveryPoint
			)
		)

		this.#addStyle()
		return this.element
	}
}
