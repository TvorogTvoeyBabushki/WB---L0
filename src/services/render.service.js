class RenderService {
	htmlToElement(html) {
		const parser = new DOMParser()
		const doc = parser.parseFromString(html, 'text/html')
		const element = doc.body.firstChild

		return element
	}
}

export default new RenderService()
