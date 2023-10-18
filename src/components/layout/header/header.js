import RenderService from '@/services/render.service'

import template from './header.template.html?raw'

export class Header {
	constructor() {}

	draw() {
		this.element = RenderService.htmlToElement(template)

		return this.element
	}
}
