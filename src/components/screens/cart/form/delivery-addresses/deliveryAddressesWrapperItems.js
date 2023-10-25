import { RadioButton } from '@/components/ui/radio/radioButton'

import {
	myDeliveryAddressesData,
	deliveryAddressesPickupPointData
} from '@/data/deliveryAddresses.data'

export class DeliveryAddressesWrapperItems {
	constructor() {
		this.deliveryAddressInfo = null
	}

	get getDeliveryAddressInfo() {
		return this.deliveryAddressInfo
	}

	set getDeliveryAddressInfo(deliveryAddressInfo) {
		this.deliveryAddressInfo = deliveryAddressInfo
	}

	#handleClickRadioBtn = (
		index,
		deliveryAddress,
		way,
		deliveryAddressesBtnChoose
	) => {
		deliveryAddressesBtnChoose.element.disabled = false

		this.deliveryAddressesRadioBtnComponents.forEach(
			deliveryAddressesRadioBtnComponent => {
				deliveryAddressesRadioBtnComponent.component.addStyles('')

				if (deliveryAddressesRadioBtnComponent.id === index) {
					deliveryAddressesRadioBtnComponent.component.addStyles('active')
					this.deliveryAddressInfo = {
						way,
						deliveryAddress
					}
				}
			}
		)
	}

	#handleClickChangeDeliveryWay(
		way,
		cartFormDeliveryPoint,
		wrapper,
		deliveryAddressesBtnChoose,
		deliveryAddressesWay,
		styles
	) {
		wrapper.innerHTML = ''

		way === 'pick-up point'
			? this._drawDeliveryAddressesWrapperItems(
					wrapper,
					'courier',
					cartFormDeliveryPoint,
					deliveryAddressesBtnChoose,
					deliveryAddressesWay,
					styles
			  )
			: this._drawDeliveryAddressesWrapperItems(
					wrapper,
					'pick-up point',
					cartFormDeliveryPoint,
					deliveryAddressesBtnChoose,
					deliveryAddressesWay,
					styles
			  )
	}

	#handleClickDeleteAddress(index, wrapper, deliveryAddressesBtnChoose) {
		deliveryAddressesBtnChoose.element.disabled = true

		this.deliveryAddressesItemComponents.forEach(
			deliveryAddressesItemComponent => {
				if (deliveryAddressesItemComponent.id === index) {
					wrapper.removeChild(deliveryAddressesItemComponent.component)
				}
			}
		)
	}

	_drawDeliveryAddressesWrapperItems(
		wrapper,
		way,
		cartFormDeliveryPoint,
		deliveryAddressesBtnChoose,
		deliveryAddressesWay,
		styles
	) {
		if (deliveryAddressesBtnChoose) {
			deliveryAddressesBtnChoose.element.disabled = false
		}

		deliveryAddressesWay.querySelectorAll('button').forEach((btnEl, index) => {
			;(way === 'pick-up point' && index === 0) ||
			(way === 'courier' && index === 1)
				? (btnEl.classList.add(styles.active), (btnEl.disabled = true))
				: (btnEl.classList.remove(styles.active), (btnEl.disabled = false))

			btnEl.addEventListener('click', () =>
				this.#handleClickChangeDeliveryWay(
					way,
					cartFormDeliveryPoint,
					wrapper,
					deliveryAddressesBtnChoose,
					deliveryAddressesWay,
					styles
				)
			)
		})

		this.deliveryAddressData =
			way === 'pick-up point'
				? deliveryAddressesPickupPointData
				: myDeliveryAddressesData
		this.deliveryAddressesItemComponents = []
		this.deliveryAddressesRadioBtnComponents = []

		this.deliveryAddressData.forEach((deliveryAddress, index) => {
			this.deliveryAddressesItem = document.createElement('div')
			this.deliveryAddressesRadioBtn = new RadioButton()

			this.deliveryAddressesItem.innerHTML = `
        <div id="delivery-addresses__item-address">
          <div>
            ${
							way === 'pick-up point'
								? deliveryAddress.address
								: deliveryAddress
						}
            <div>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.69769 1.14922C6.43817 0.528396 5.56198 0.528387 5.30244 1.14919L6.69769 1.14922ZM5.30244 1.14919L4.14719 3.90977L1.19202 4.16613C0.519264 4.22467 0.262282 5.05966 0.759713 5.49464L3.00514 7.45915L2.33207 10.3824C2.18436 11.0238 2.87792 11.5567 3.46133 11.2023L6.00032 9.65611L8.53797 11.2015C9.12269 11.5588 9.81568 11.0227 9.66861 10.3826L8.99549 7.45915L11.2402 5.49537C11.7385 5.05961 11.4793 4.22519 10.8083 4.16667L7.85294 3.91029L6.69769 1.14922" fill="#FF970D"/>
              </svg>
              ${deliveryAddress.rating}
              <span>Пункт выдачи</span>
            </div>
          </div>
        </div>
        <button id="delivery-addresses__btn-delete">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 3C0.5 2.72386 0.723858 2.5 1 2.5H15C15.2761 2.5 15.5 2.72386 15.5 3C15.5 3.27614 15.2761 3.5 15 3.5H1C0.723858 3.5 0.5 3.27614 0.5 3Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.4584 2.5H14.5059L13.6411 13.6926C13.5405 14.9947 12.4546 16 11.1486 16H4.84639C3.54299 16 2.45829 14.9986 2.35435 13.6994L1.4584 2.5ZM2.5416 3.5L3.35117 13.6196C3.41353 14.3992 4.06435 15 4.84639 15H11.1486C11.9322 15 12.5837 14.3968 12.6441 13.6155L13.4256 3.5H2.5416Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 3.5H5V1.46875C5 0.657582 5.65758 0 6.46875 0H9.53125C10.3424 0 11 0.657582 11 1.46875V3.5ZM6.46875 1C6.20987 1 6 1.20987 6 1.46875V2.5H10V1.46875C10 1.20987 9.79013 1 9.53125 1H6.46875Z" fill="black"/>
          </svg>
        </button>
      `
			this.deliveryAddressesItemAddress =
				this.deliveryAddressesItem.querySelector(
					'#delivery-addresses__item-address'
				)
			this.deliveryAddressesItemAddress.insertAdjacentElement(
				'afterbegin',
				this.deliveryAddressesRadioBtn.draw('delivery address')
			)
			if (way === 'courier') {
				this.deliveryAddressesItemAddressContent =
					this.deliveryAddressesItemAddress.querySelector('div')
				this.deliveryAddressesItemAddressRating =
					this.deliveryAddressesItemAddressContent.querySelector('div')
				this.deliveryAddressesItemAddressContent.removeChild(
					this.deliveryAddressesItemAddressRating
				)
			}

			wrapper.append(this.deliveryAddressesItem)

			index === 0 &&
				(this.deliveryAddressesRadioBtn.addStyles('active'),
				(this.deliveryAddressInfo = {
					way,
					deliveryAddress
				}))

			this.deliveryAddressesItemComponents.push({
				id: index,
				component: this.deliveryAddressesItem
			})
			this.deliveryAddressesRadioBtnComponents.push({
				id: index,
				component: this.deliveryAddressesRadioBtn
			})

			this.deliveryAddressesRadioBtn.element.addEventListener('change', () =>
				this.#handleClickRadioBtn(
					index,
					deliveryAddress,
					way,
					deliveryAddressesBtnChoose
				)
			)

			this.deliveryAddressesBtnDelete =
				this.deliveryAddressesItem.querySelector(
					'#delivery-addresses__btn-delete'
				)

			this.deliveryAddressesBtnDelete.addEventListener('click', () => {
				this.#handleClickDeleteAddress(
					index,
					wrapper,
					deliveryAddressesBtnChoose
				)
			})
		})
	}
}
