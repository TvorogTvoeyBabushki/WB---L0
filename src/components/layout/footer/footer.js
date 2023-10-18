import RenderService from '@/services/render.service'

import template from './footer.template.html?raw'
import styles from './footer.module.scss'

export class Footer {
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

		this.#addStyles()
		return this.element
	}
}
