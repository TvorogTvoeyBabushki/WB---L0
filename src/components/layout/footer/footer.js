import RenderService from '@/services/render.service'

import template from './footer.template.html?raw'

export class Footer {
	constructor() {}

	draw() {
		this.element = RenderService.htmlToElement(template)

		return this.element
	}
}
