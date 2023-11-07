export class UseCartItem {
	_handleClickCheckbox = (
		cartItem,
		cartForm,
		variant,
		cartItemCheckbox,
		cartSidebar
	) => {
		const sessionItemsInfo =
			JSON.parse(sessionStorage.getItem('info item')) || []
		let selectedProducts = []

		cartSidebar.priceWrapper && cartSidebar.priceWrapper.remove()
		if (cartForm.cartFormDelivery?.cartFormDeliveryProducts) {
			cartForm.cartFormDelivery.cartFormDeliveryInfo.removeChild(
				cartForm.cartFormDelivery.cartFormDeliveryProducts
			)
		}

		if (
			sessionItemsInfo.filter(
				itemInfo =>
					(itemInfo.id === cartItem.id &&
						itemInfo.isSelectedProduct &&
						variant !== 'quantity') ||
					(!itemInfo.isSelectedAll && variant === 'all')
			).length
		) {
			selectedProducts = sessionItemsInfo.filter(
				itemInfo => itemInfo.id !== cartItem.id && itemInfo.isSelectedProduct
			)

			sessionItemsInfo.forEach(itemInfo => {
				if (itemInfo.id === cartItem.id) {
					itemInfo.isSelectedProduct = false
				}
			})
			cartItemCheckbox.addStyles('')
		} else {
			selectedProducts = sessionItemsInfo.filter(
				itemInfo => itemInfo.id === cartItem.id || itemInfo.isSelectedProduct
			)

			selectedProducts.forEach(product => {
				if (product.id === cartItem.id) {
					product.src = cartItem.src
				}
			})
			sessionItemsInfo.forEach(itemInfo => {
				if (itemInfo.id === cartItem.id) {
					itemInfo.isSelectedProduct = true
				}
			})
			;(variant === 'selected' || variant == 'all') &&
				cartItemCheckbox.addStyles('active')
		}
		sessionStorage.setItem('info item', JSON.stringify(sessionItemsInfo))

		cartSidebar.priceWrapper && cartSidebar.drawPriceWrapper()
		cartSidebar.isActiveCheckbox && cartSidebar.handleClickCheckbox('checkbox')

		if (cartSidebar.btnPayment) {
			!selectedProducts.length
				? (cartSidebar.btnPayment.element.disabled = true)
				: (cartSidebar.btnPayment.element.disabled = false)
		}

		if (
			!sessionItemsInfo.filter(itemInfo => itemInfo.isSelectedProduct).length
		) {
			cartForm.cartFormDelivery.cartFormDeliveryProducts = null
			return
		}

		cartForm.cartFormDelivery.drawDeliveryProducts(selectedProducts)
	}

	_handleHoverCompanyInfo = (e, variant, cartItem) => {
		if (variant === 'enter') {
			this.#drawCompanyInfoWrapper(e.target, variant, cartItem)
		} else {
			this.#drawCompanyInfoWrapper(e.target, variant, cartItem)
		}
	}

	#drawCompanyInfoWrapper(companyInfoEl, variant, cartItem) {
		if (variant === 'enter') {
			this.companyInfoWrapper = document.createElement('div')
			this.companyInfoTitle = document.createElement('h4')
			this.companyInfoIndex = document.createElement('div')
			this.companyInfoAddress = document.createElement('div')

			this.companyInfoTitle.append(cartItem.company)
			this.companyInfoIndex.append('ОГРН: 5167746237148')
			this.companyInfoAddress.append(
				'129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34'
			)
			this.companyInfoWrapper.append(
				this.companyInfoTitle,
				this.companyInfoIndex,
				this.companyInfoAddress
			)
			companyInfoEl.append(this.companyInfoWrapper)

			return this.companyInfoWrapper
		} else {
			companyInfoEl.removeChild(companyInfoEl.querySelector('div'))
		}
	}
}
