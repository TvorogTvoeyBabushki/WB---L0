import RenderService from '@/services/render.service'

import template from './modal.template.html?raw'
import styles from './modal.module.scss'

export class Modal {
	#addStyles() {
		this.element.classList.add(styles.modal)
	}

	draw(children) {
		this.element = RenderService.htmlToElement(template)
		this.element.append(children)

		this.#addStyles()
		return this.element
	}
}
