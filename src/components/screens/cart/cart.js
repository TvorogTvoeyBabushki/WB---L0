import RenderService from '@/services/render.service'

import template from './cart.template.html?raw'

export class Cart {
	constructor() {}

	draw() {
		this.element = RenderService.htmlToElement(template)

		return this.element
	}
}
