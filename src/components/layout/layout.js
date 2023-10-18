import RenderService from '@/services/render.service'

import template from './layout.template.html?raw'
import { Header } from './header/header'
import { Footer } from './footer/footer'

export class Layout {
	constructor(children) {
		this.children = children
		this.header = new Header()
		this.footer = new Footer()
	}

	draw() {
		this.element = RenderService.htmlToElement(template)
		this.element.append(this.header.draw(), this.children, this.footer.draw())

		return this.element
	}
}
