import { CartItem } from '../item/cartItem'

export class UseSelectedProducts {
	#cartItemsData
	#sessionItemsInfo

	constructor(header, cartForm) {
		this.header = header
		this.cartForm = cartForm

		this.#cartItemsData = []
		this.#sessionItemsInfo = []
		this.#parseCartItemsDataLS()
	}

	#parseCartItemsDataLS() {
		if (localStorage.getItem('cart items')) {
			this.#cartItemsData = JSON.parse(localStorage.getItem('cart items'))
		} else {
			this.#cartItemsData = []
		}
	}

	#parseSessionItemsInfo() {
		if (sessionStorage.getItem('info item')) {
			this.#sessionItemsInfo = JSON.parse(sessionStorage.getItem('info item'))
		} else {
			this.#sessionItemsInfo = []
		}
	}

	_handleClickCheckbox = checkboxSelectAll => {
		this.#parseSessionItemsInfo()

		this.#sessionItemsInfo.forEach(itemInfo => {
			itemInfo.isSelectedProduct = false
			itemInfo.isSelectedAll
				? ((itemInfo.isSelectedAll = false), checkboxSelectAll.addStyles(''))
				: ((itemInfo.isSelectedAll = true),
				  checkboxSelectAll.addStyles('active'))
		})
		sessionStorage.setItem('info item', JSON.stringify(this.#sessionItemsInfo))

		this.#cartItemsData.forEach(cartItem => {
			this._cartItemComponents.forEach(cartItemComponent => {
				cartItem.id === cartItemComponent.id &&
					cartItemComponent.cartItem.handleClickCheckbox(
						cartItem,
						this.cartForm,
						'all'
					)
			})
		})
	}

	#handleDeleteCartItem = (cartItem, selectedProductsWrapper) => {
		this.#parseCartItemsDataLS()
		const updateCartItems = this.#cartItemsData.filter(
			cartItemData => cartItemData.id !== cartItem.id
		)

		localStorage.setItem('cart items', JSON.stringify(updateCartItems))

		selectedProductsWrapper.innerHTML = ''
		this._drawSelectedProductsWrapper(selectedProductsWrapper)
		this.header.draw().innerHTML = ''
		this.header.draw()
		this.cartItem.handleClickCheckbox(cartItem, this.cartForm, 'delete')
	}

	_drawSelectedProductsWrapper(selectedProductsWrapper) {
		this.#parseCartItemsDataLS()
		this.#parseSessionItemsInfo()

		const updateSessionItemsInfo = []
		this._cartItemComponents = []

		this.#cartItemsData.forEach(cartItem => {
			this.cartItem = new CartItem('selected')

			this.#sessionItemsInfo.forEach(itemInfo => {
				if (itemInfo.id === cartItem.id) {
					updateSessionItemsInfo.push(itemInfo)
				}
			})

			if (!sessionStorage.getItem('info item')) {
				this.#sessionItemsInfo.push({
					id: cartItem.id,
					quantity: 1,
					amount: cartItem.price.discount
				})
			}

			selectedProductsWrapper.append(
				this.cartItem.draw(cartItem, this.cartForm, this.header)
			)

			this.btnDeleteProduct =
				this.cartItem.cartItemPrice.cartItemQuantity.quantityPanel.querySelector(
					'#btn__cart-delete'
				)
			this.btnDeleteProduct.addEventListener('click', () =>
				this.#handleDeleteCartItem(cartItem, selectedProductsWrapper)
			)

			this._cartItemComponents.push({
				id: cartItem.id,
				cartItem: this.cartItem
			})
		})

		if (!sessionStorage.getItem('info item')) {
			sessionStorage.setItem(
				'info item',
				JSON.stringify(this.#sessionItemsInfo)
			)
		} else {
			sessionStorage.setItem(
				'info item',
				JSON.stringify(updateSessionItemsInfo)
			)
		}
	}
}
