import RenderService from '@/services/render.service'

import template from './radioButton.template.html?raw'
import styles from './radioButton.module.scss'

export class RadioButton {
	addStyles(variant) {
		this.element.classList.add(styles.radio_btn)
		variant === 'active'
			? this.element.classList.add(styles.active)
			: this.element.classList.remove(styles.active)
	}

	draw(name) {
		this.element = RenderService.htmlToElement(template)
		this.element.setAttribute('name', name)

		this.addStyles()
		return this.element
	}
}
