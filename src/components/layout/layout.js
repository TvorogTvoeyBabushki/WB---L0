import RenderService from '@/services/render.service'

import template from './layout.template.html?raw'
import styles from './layout.module.scss'

export class Layout {
	constructor(header, children, footer) {
		this.header = header
		this.children = children
		this.footer = footer
	}

	#addStyle() {
		this.element.classList.add(styles.layout)
	}

	draw() {
		this.element = RenderService.htmlToElement(template)
		this.element.append(
			this.header.draw(),
			this.children.draw(),
			this.footer.draw()
		)

		this.#addStyle()
		return this.element
	}
}
