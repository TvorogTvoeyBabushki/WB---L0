import RenderService from '@/services/render.service'

import template from './checkbox.template.html?raw'
import styles from './checkbox.module.scss'

export class Checkbox {
	addStyles(variant = '') {
		this.element.classList.add(styles.checkbox)
		;(variant === 'all' || variant === 'cart item') &&
			this.element.classList.toggle(styles.active)
	}

	draw() {
		this.element = RenderService.htmlToElement(template)

		this.addStyles()
		return this.element
	}
}
