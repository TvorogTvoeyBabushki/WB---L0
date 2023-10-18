import RenderService from '@/services/render.service'

import template from './button.template.html?raw'
import styles from './button.module.scss'

export class Button {
	constructor(children) {
		this.children = children
	}

	addStyles() {
		this.element.classList.add(styles.btn)
	}

	draw() {
		this.element = RenderService.htmlToElement(template)
		this.element.append(this.children)

		this.addStyles()
		return this.element
	}
}
