import RenderService from '@/services/render.service'

import { Field } from '@/components/ui/field/field'

import { stringPattern, validEmail } from '@/utils/regex'

import template from './cartFormPersonalInfo.template.html?raw'
import styles from './cartFormPersonalInfo.module.scss'

const fields = ['Имя', 'Фамилия', 'Почта', 'Телефон', 'ИНН']

export class CartFormPersonal {
	#drawValidate(id, children, variant) {
		const validate = document.createElement('div')
		validate.append(children)
		validate.setAttribute('id', id)

		this.fieldWrapperComponents.forEach(fieldWrapperComponent => {
			if (fieldWrapperComponent.variant === variant) {
				!fieldWrapperComponent.component.querySelector(`#${id}`) &&
					fieldWrapperComponent.component.append(validate)

				fieldWrapperComponent.component.classList.add(styles.validate)
			}
		})
	}

	#removeValidate(id, variant) {
		this.element.querySelector(`#${id}`) &&
			this.element.querySelector(`#${id}`).remove()

		this.fieldWrapperComponents.forEach(fieldWrapperComponent => {
			if (fieldWrapperComponent.variant === variant) {
				fieldWrapperComponent.component.classList.remove(styles.validate)
			}
		})
	}

	#handleChangeField = (e, variant) => {
		if (variant.toLowerCase() === 'имя') {
			const numberPattern = /[0-9]/g
			const symbolPattern = /[^a-zа-яё0-9\s]/gi

			if (
				numberPattern.test(e.target.value) ||
				symbolPattern.test(e.target.value)
			) {
				this.#drawValidate(
					'cart__personal-info__validate-name',
					'Укажите имя',
					variant
				)
			} else {
				this.#removeValidate('cart__personal-info__validate-name', variant)
			}
		}

		if (variant.toLowerCase() === 'фамилия') {
			const numberPattern = /[0-9]/g
			const symbolPattern = /[^a-zа-яё0-9\s]/gi

			if (
				numberPattern.test(e.target.value) ||
				symbolPattern.test(e.target.value)
			) {
				this.#drawValidate(
					'cart__personal-info__validate-surname',
					'Укажите фамилию',
					variant
				)
			} else {
				this.#removeValidate('cart__personal-info__validate-surname', variant)
			}
		}

		if (variant.toLowerCase() === 'почта') {
			if (!validEmail.test(e.target.value) && e.target.value.length) {
				this.#drawValidate(
					'cart__personal-info__validate-email',
					'Проверьте адрес электронной почты',
					variant
				)
			} else {
				this.#removeValidate('cart__personal-info__validate-email', variant)
			}
		}

		if (variant.toLowerCase() === 'телефон') {
			if (
				e.target.value.replace(stringPattern, '').length < 11 &&
				e.target.value.replace(stringPattern, '').length
			) {
				this.#drawValidate(
					'cart__personal-info__validate-telephone',
					'Формат: +9 999 999 99 99',
					variant
				)
			} else if (e.target.value.replace(stringPattern, '').length === 11) {
				this.#removeValidate('cart__personal-info__validate-telephone', variant)
			}
		}

		if (variant.toLowerCase() === 'инн') {
			if (e.target.value.length < 12 && e.target.value.length) {
				this.#drawValidate(
					'cart__personal-info__validate-inn',
					'Проверьте ИНН',
					variant
				)
			} else if (e.target.value.length === 12) {
				this.#removeValidate('cart__personal-info__validate-inn', variant)
			}
		}
	}

	#handleInputField = (e, variant) => {
		if (variant.toLowerCase() === 'имя') {
			const numberPattern = /[0-9]/g
			const symbolPattern = /[^a-zа-яё0-9\s]/gi

			if (
				!(
					symbolPattern.test(e.target.value) ||
					numberPattern.test(e.target.value)
				)
			) {
				this.#removeValidate('cart__personal-info__validate-name', variant)
			}
		}

		if (variant.toLowerCase() === 'фамилия') {
			const numberPattern = /[0-9]/g
			const symbolPattern = /[^a-zа-яё0-9\s]/gi

			if (
				!(
					symbolPattern.test(e.target.value) ||
					numberPattern.test(e.target.value)
				)
			) {
				this.#removeValidate('cart__personal-info__validate-surname', variant)
			}
		}

		if (variant.toLowerCase() === 'почта') {
			if (validEmail.test(e.target.value) || !e.target.value.length) {
				this.#removeValidate('cart__personal-info__validate-email', variant)
			}
		}

		if (variant.toLowerCase() === 'телефон') {
			const prefixNumber = str => {
				if (str === '7') {
					return '+7'
				}
				if (str === '8') {
					return '8'
				}
				if (str === '9') {
					return '+7 9'
				}
				return '+7'
			}

			const fieldValue = e.target.value.replace(/\D+/g, '')
			const maxLength = 30
			let result = ''

			for (let i = 0; i < fieldValue.length && i < maxLength; i++) {
				switch (i) {
					case 0:
						result += prefixNumber(fieldValue[i])
						continue
					case 1:
						result += ' '
						break
					case 4:
						result += ' '
						break
					case 7:
						result += ' '
						break
					case 9:
						result += ' '
						break
					default:
						break
				}
				result += fieldValue[i]
			}
			e.target.value = result

			if (e.target.value.replace(stringPattern, '').length > 11) {
				this.#drawValidate(
					'cart__personal-info__validate-telephone',
					'Формат: +9 999 999 99 99',
					variant
				)
			} else if (
				e.target.value.replace(stringPattern, '').length === 11 ||
				!e.target.value.replace(stringPattern, '').length
			) {
				this.#removeValidate('cart__personal-info__validate-telephone', variant)
			}
		}

		if (variant.toLowerCase() === 'инн') {
			const fieldValue = e.target.value.replace(stringPattern, '')
			e.target.value = fieldValue

			if (e.target.value.length > 12) {
				this.#drawValidate(
					'cart__personal-info__validate-inn',
					'Проверьте ИНН',
					variant
				)
			} else if (e.target.value.length === 12 || !e.target.value.length) {
				this.#removeValidate('cart__personal-info__validate-inn', variant)
			}
		}

		const targetEl = e.target
		const parentTargetEl = targetEl.parentNode
		if (e.target.value.trim().length) {
			parentTargetEl.classList.add(styles.active)
		} else {
			parentTargetEl.classList.remove(styles.active)
		}
	}

	#addStyles() {
		this.element.classList.add(styles.cart_personal_info)
		this.cartPersonalInfoNameWrapper.classList.add(
			styles.cart_personal_info_name
		)
		this.cartPersonalInfoOtherWrapper.classList.add(
			styles.cart_personal_info_other
		)
	}

	draw() {
		this.element = RenderService.htmlToElement(template)
		this.cartPersonalInfoNameWrapper = this.element.querySelector(
			'#cart__personal-info-name'
		)
		this.cartPersonalInfoOtherWrapper = this.element.querySelector(
			'#cart__personal-info-other'
		)

		this.fieldWrapperComponents = []
		fields.forEach(field => {
			this[field] = new Field()
			this.fieldWrapper = document.createElement('div')
			this.fieldLabelWrapper = document.createElement('label')
			this.fieldLabel = document.createElement('span')

			this.fieldLabel.append(field)
			this.fieldLabelWrapper.append(this.fieldLabel, this[field].draw(field))
			this.fieldWrapper.append(this.fieldLabelWrapper)

			if (field.toLowerCase() === 'инн') {
				this.additionINNWrapper = document.createElement('div')
				this.additionINNWrapper.classList.add(styles.addition_inn)

				this.additionINNWrapper.append('Для таможенного оформления')
				this.fieldWrapper.append(this.additionINNWrapper)
			}

			field.toLowerCase() === 'имя' || field.toLowerCase() === 'фамилия'
				? this.cartPersonalInfoNameWrapper.append(this.fieldWrapper)
				: this.cartPersonalInfoOtherWrapper.append(this.fieldWrapper)

			this.fieldWrapperComponents.push({
				variant: field,
				component: this.fieldWrapper,
				isShowLabel: false
			})

			this[field].element.addEventListener('input', e =>
				this.#handleInputField(e, field)
			)
			this[field].element.addEventListener('change', e =>
				this.#handleChangeField(e, field)
			)
		})

		this.#addStyles()
		return this.element
	}
}
