import RenderService from '@/services/render.service'

import template from './footer.template.html?raw'
import styles from './footer.module.scss'
import { Tabbar } from '../tab-bar/tabbar'

export class Footer {
	constructor() {
		this.tabbar = new Tabbar()
	}

	#getWidthWindow() {
		window.addEventListener('resize', () => {
			if (document.documentElement.clientWidth < 761) {
				if (this.element.querySelector('nav')) {
					return
				}
				this.element.append(this.tabbar.draw())
			} else {
				this.element.querySelector('nav') &&
					this.element.removeChild(this.element.querySelector('nav'))
			}
		})
		window.removeEventListener('resize', () => {
			if (document.documentElement.clientWidth < 761) {
				if (this.element.querySelector('nav')) {
					return
				}
				this.element.append(this.tabbar.draw())
			} else {
				this.element.querySelector('nav') &&
					this.element.removeChild(this.element.querySelector('nav'))
			}
		})
	}

	#addStyles() {
		this.wrapper = this.element.querySelector('#footer__wrapper')

		this.element.classList.add(styles.footer)
		this.wrapper.classList.add(styles.wrapper)
	}

	draw() {
		this.element = RenderService.htmlToElement(template)
		this.wrapper = this.element.querySelector('#footer__wrapper')
		this.span = document.createElement('span')

		this.span.append('©')
		this.wrapper.append(
			this.span,
			` ${new Date().getFullYear()} ООО «Товары и точка»`
		)

		if (document.documentElement.clientWidth < 761) {
			this.element.append(this.tabbar.draw())
		}

		this.#getWidthWindow()
		this.#addStyles()
		return this.element
	}
}
