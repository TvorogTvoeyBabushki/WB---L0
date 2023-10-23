import { UseCartItemPrice } from '../useCartItemPrice'
import styles from './cartItemQuantity.module.scss'

export class CartItemQuantity extends UseCartItemPrice {
	#favoriteItemsData

	constructor(variant) {
		super()

		this.#favoriteItemsData = []
		this.variant = variant

		this.#parseFavoriteItemsDataLS()
	}

	#parseFavoriteItemsDataLS() {
		if (localStorage.getItem('favorite items')) {
			this.#favoriteItemsData = JSON.parse(
				localStorage.getItem('favorite items')
			)
		} else {
			this.#favoriteItemsData = []
		}
	}

	handleShowPanel(variant) {
		this._handleShowPanel(variant, styles)
	}

	drawQuantityValidate(cartItem, quantity, quantityWrapper) {
		this.quantityValidation = document.createElement('div')

		if (cartItem.quantity === quantity) {
			this.quantityValidation.append(`Осталось ${cartItem.quantity} шт.`)

			this.quantityValidation.classList.add(styles.validation)
			this.quantityPanel.before(this.quantityValidation)
		}

		if (
			quantityWrapper.querySelector(`.${styles.validation}`) &&
			cartItem.quantity !== quantity
		) {
			quantityWrapper.removeChild(
				quantityWrapper.querySelector(`.${styles.validation}`)
			)
		}
	}

	drawQuantityPanel(cartItem, quantityWrapper) {
		this.quantityPanel = document.createElement('div')
		this.quantityPanel.innerHTML = `
			<button id="btn__cart-favorite">
			<svg 
					fill="#000000" 
					width="16px" 
					height="16px" 
					viewBox="0 0 24 24" 
					xmlns="http://www.w3.org/2000/svg">
						<path d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z"/>
			</svg>
			</button>
			<button id="btn__cart-delete">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 3C0.5 2.72386 0.723858 2.5 1 2.5H15C15.2761 2.5 15.5 2.72386 15.5 3C15.5 3.27614 15.2761 3.5 15 3.5H1C0.723858 3.5 0.5 3.27614 0.5 3Z" fill="black"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M1.4584 2.5H14.5059L13.6411 13.6926C13.5405 14.9947 12.4546 16 11.1486 16H4.84639C3.54299 16 2.45829 14.9986 2.35435 13.6994L1.4584 2.5ZM2.5416 3.5L3.35117 13.6196C3.41353 14.3992 4.06435 15 4.84639 15H11.1486C11.9322 15 12.5837 14.3968 12.6441 13.6155L13.4256 3.5H2.5416Z" fill="black"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M11 3.5H5V1.46875C5 0.657582 5.65758 0 6.46875 0H9.53125C10.3424 0 11 0.657582 11 1.46875V3.5ZM6.46875 1C6.20987 1 6 1.20987 6 1.46875V2.5H10V1.46875C10 1.20987 9.79013 1 9.53125 1H6.46875Z" fill="black"/>
				</svg>
			</button>
		`

		quantityWrapper.append(this.quantityPanel)
		this.quantityPanel.classList.add(styles.panel)
		this.variant === 'missed' && this.quantityPanel.classList.add(styles.missed)

		this.btnFavorite = this.quantityPanel.querySelector('#btn__cart-favorite')
		this.btnFavorite.addEventListener('click', () => {
			this.#parseFavoriteItemsDataLS()
			this._handleFavoriteCartItem(cartItem, this.#favoriteItemsData, styles)
		})

		if (
			this.#favoriteItemsData.filter(
				favoriteItem => favoriteItem.id === cartItem.id
			).length
		) {
			this.btnFavorite.classList.add(styles.active)
		}
	}
}
