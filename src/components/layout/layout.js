import RenderService from '@/services/render.service'

import template from './layout.template.html?raw'
import styles from './layout.module.scss'
import { Footer } from './footer/footer'

export class Layout {
	constructor(header, children) {
		this.header = header
		this.children = children
		this.footer = new Footer()
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
