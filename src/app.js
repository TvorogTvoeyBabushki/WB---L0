import { Header } from './components/layout/header/header'

import { cartItemsData, cartMissedItemsData } from './data/cartItems.data'
import { Cart } from './components/screens/cart/cart'
import { Layout } from './components/layout/layout'
import './assets/styles/global.scss'

class App {
	constructor() {
		this.#stringifyCartItemsDataLS()

		this.root = document.getElementById('app')
		this.header = new Header()
		this.cart = new Cart(this.header)
	}

	#stringifyCartItemsDataLS() {
		localStorage.setItem('cart items', JSON.stringify(cartItemsData))
		localStorage.setItem(
			'cart missed items',
			JSON.stringify(cartMissedItemsData)
		)
	}

	draw() {
		this.root.append(new Layout(this.header, this.cart).draw())
	}
}

new App().draw()
