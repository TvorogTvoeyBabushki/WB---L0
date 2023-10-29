import RenderService from '@/services/render.service'

import template from './tabbar.template.html?raw'
import styles from './tabbar.module.scss'

export class Tabbar {
	#amountItems

	constructor() {
		this.#amountItems = []
	}

	#parseCartItemsDataLS() {
		if (localStorage.getItem('cart items')) {
			return (this.#amountItems = JSON.parse(
				localStorage.getItem('cart items')
			))
		} else {
			return (this.#amountItems = [])
		}
	}

	#addStyles() {
		this.element.classList.add(styles.tabbar)
	}

	drawAmountItems(sessionItemsInfo = []) {
		this.#parseCartItemsDataLS()

		if (this.#amountItems.length) {
			this.cart = this.element.querySelector('#tabbar__cart')

			this.cart.innerHTML = `
        <div>${
					!sessionItemsInfo.length
						? this.#amountItems.length
						: sessionItemsInfo.reduce(
								(acc, itemInfo) => acc + itemInfo.quantity,
								0
						  ) > 99
						? '99'
						: sessionItemsInfo.reduce(
								(acc, itemInfo) => acc + itemInfo.quantity,
								0
						  )
				}</div>
        <svg
        width="28"
        height="29"
        viewBox="0 0 28 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.2214 17.4665C11.3829 17.9206 11.8452 18.1949 12.3212 18.119L25.0874 16.0828C25.5004 16.017 25.8288 15.701 25.9106 15.2909L27.2654 8.49865C27.3875 7.88644 26.925 7.31324 26.3008 7.30317L8.94122 7.02324C8.24354 7.01199 7.74913 7.70067 7.98289 8.35812L11.2214 17.4665Z"
            fill="#CB11AB"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.8262 25.3593C13.1109 25.3593 14.1523 24.3178 14.1523 23.0331C14.1523 21.7484 13.1109 20.707 11.8262 20.707C10.5415 20.707 9.5 21.7484 9.5 23.0331C9.5 24.3178 10.5415 25.3593 11.8262 25.3593Z"
            fill="#CB11AB"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M23.457 25.3593C24.7417 25.3593 25.7831 24.3178 25.7831 23.0331C25.7831 21.7484 24.7417 20.707 23.457 20.707C22.1723 20.707 21.1308 21.7484 21.1308 23.0331C21.1308 24.3178 22.1723 25.3593 23.457 25.3593Z"
            fill="#CB11AB"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5 4C6.933 4 8.5 3.77614 8.5 3.5C8.5 3.22386 6.933 3 5 3C3.067 3 1.5 3.22386 1.5 3.5C1.5 3.77614 3.067 4 5 4Z"
            fill="#CB11AB"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.45442 2.65147C3.1177 2.55672 4.01745 2.5 5 2.5C5.98255 2.5 6.8823 2.55672 7.54558 2.65147C7.87345 2.69831 8.16489 2.75734 8.38495 2.83167C8.4917 2.86772 8.61185 2.91717 8.71511 2.98926C8.80017 3.04864 9 3.21275 9 3.5C9 3.78725 8.80017 3.95136 8.71511 4.01074C8.61185 4.08283 8.4917 4.13228 8.38495 4.16833C8.16489 4.24266 7.87345 4.30169 7.54558 4.34853C6.8823 4.44328 5.98255 4.5 5 4.5C4.01745 4.5 3.1177 4.44328 2.45442 4.34853C2.12655 4.30169 1.83511 4.24266 1.61505 4.16833C1.5083 4.13228 1.38815 4.08283 1.28489 4.01074C1.19983 3.95136 1 3.78725 1 3.5C1 3.21275 1.19983 3.04864 1.28489 2.98926C1.38815 2.91717 1.5083 2.86772 1.61505 2.83167C1.83511 2.75734 2.12655 2.69831 2.45442 2.65147Z"
            fill="#CB11AB"
          />
        </svg>
      `
		} else {
			this.cart.removeChild(this.cart.querySelector('div'))
		}
	}

	draw() {
		this.element = RenderService.htmlToElement(template)

		this.drawAmountItems()

		this.#addStyles()
		return this.element
	}
}
