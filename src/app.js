import { Cart } from './components/screens/cart/cart'
import { Layout } from './components/layout/layout'
import './assets/styles/global.scss'

class App {
	constructor() {
		this.root = document.getElementById('app')
		this.cart = new Cart()
	}

	draw() {
		this.root.append(new Layout(this.cart.draw()).draw())
	}
}

new App().draw()
