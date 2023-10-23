import RenderService from '@/services/render.service'

import template from './button.template.html?raw'
import styles from './button.module.scss'

export class Button {
	#addStyles() {
		this.element.classList.add(styles.btn)
	}

	draw(children) {
		this.element = RenderService.htmlToElement(template)
		this.element.append(children)

		this.#addStyles()
		return this.element
	}
}
