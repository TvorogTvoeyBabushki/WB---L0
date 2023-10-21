export class UseCartItemPrice {
	_handleStringifySessionItemsInfo(
		variant,
		sessionItemsInfo,
		cartItem,
		quantity
	) {
		if (
			sessionItemsInfo.filter(itemInfo => itemInfo.id === cartItem.id).length
		) {
			sessionItemsInfo.forEach(itemInfo => {
				if (itemInfo.id === cartItem.id) {
					itemInfo.quantity = quantity
					itemInfo.amount =
						variant === 'decrement'
							? itemInfo.amount - cartItem.price.discount
							: itemInfo.amount + cartItem.price.discount
				}
			})
		} else {
			sessionItemsInfo.push({
				id: cartItem.id,
				quantity: quantity,
				amount: cartItem.price.discount * quantity
			})
		}

		sessionStorage.setItem('info item', JSON.stringify(sessionItemsInfo))
	}

	_handleHoverBasePriceInfo = (e, variant) => {
		if (variant === 'enter') {
			this.#drawBasePriceInfoWrapper(variant, e.target)
		} else {
			this.#drawBasePriceInfoWrapper(variant, e.target)
		}
	}

	_handleShowPanel(variant, styles) {
		if (variant === 'enter') {
			this.quantityPanel.classList.add(styles.show)
			this.quantityPanel.classList.remove(styles.close)
		} else {
			this.quantityPanel.classList.add(styles.close)
			this.quantityPanel.classList.remove(styles.show)
		}
	}

	_handleFavoriteCartItem(cartItem, favoriteItemsData, styles) {
		if (
			favoriteItemsData.filter(favoriteCart => favoriteCart.id === cartItem.id)
				.length
		) {
			const updateFavoriteItemsData = favoriteItemsData.filter(
				favoriteCart => favoriteCart.id !== cartItem.id
			)

			localStorage.setItem(
				'favorite items',
				JSON.stringify(updateFavoriteItemsData)
			)
			this.btnFavorite.classList.remove(styles.active)
			return
		}

		favoriteItemsData.push(cartItem)
		localStorage.setItem('favorite items', JSON.stringify(favoriteItemsData))
		this.btnFavorite.classList.add(styles.active)
	}

	#drawBasePriceInfoWrapper(variant, basePriceEl) {
		if (variant === 'enter') {
			this.basePriceInfoWrapper = document.createElement('div')
			this.discountWrapper = document.createElement('div')
			this.buyerDiscountWrapper = document.createElement('div')

			this.discountWrapper.innerHTML = `
				<span>Скидка 55%</span>
				<span>−300 сом</span>
			`
			this.buyerDiscountWrapper.innerHTML = `
				<span>Скидка покупателя 10%</span>
				<span>−30 сом</span>
		  `
			this.basePriceInfoWrapper.append(
				this.discountWrapper,
				this.buyerDiscountWrapper
			)
			basePriceEl.append(this.basePriceInfoWrapper)
		} else {
			basePriceEl.removeChild(basePriceEl.querySelector('div'))
		}
	}
}
