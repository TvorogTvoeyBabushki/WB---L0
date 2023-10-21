import RenderService from '@/services/render.service'

import template from './header.template.html?raw'
import styles from './header.module.scss'

export class Header {
	constructor() {
		this.header = document.createElement('header')
	}

	#addStyles() {
		this.wrapper = this.element.querySelector('#header__wrapper')
		this.search = this.element.querySelector('#header__search')
		this.burger = this.element.querySelector('#header__burger')
		this.menu = this.element.querySelector('#header__menu')

		this.element.classList.add(styles.header)
		this.wrapper.classList.add(styles.wrapper)
		this.search.classList.add(styles.search)
		this.burger.classList.add(styles.burger)
		this.menu.classList.add(styles.menu)
		this.amountItemsWrapper.classList.add(styles.amount_items)
	}

	#parseCartItemsDataLS() {
		if (localStorage.getItem('cart items')) {
			return (this.amountItems = JSON.parse(localStorage.getItem('cart items')))
		} else {
			return (this.amountItems = [])
		}
	}

	draw() {
		this.element = RenderService.htmlToElement(template)

		this.#parseCartItemsDataLS()

		if (this.amountItems.length) {
			this.btnCart = this.element.querySelector('#header__cart')
			this.amountItemsWrapper = document.createElement('div')

			this.amountItemsWrapper.append(this.amountItems.length)
			this.btnCart.append(this.amountItemsWrapper)
		}

		this.#addStyles()
		this.header.append(this.element)

		return this.header
	}
}
