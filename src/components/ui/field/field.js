import RenderService from '@/services/render.service'

import template from './field.template.html?raw'
import styles from './field.module.scss'

export class Field {
	#addStyles() {
		this.element.classList.add(styles.field)
	}

	draw(placeholder) {
		this.element = RenderService.htmlToElement(template)
		this.element.setAttribute('placeholder', placeholder)

		this.#addStyles()
		return this.element
	}
}
