import RenderService from '@/services/render.service'

import { Field } from '@/components/ui/field/field'

import { useCartFormPersonalInfo } from './useCartFormPersonalInfo'
import template from './cartFormPersonalInfo.template.html?raw'
import styles from './cartFormPersonalInfo.module.scss'

const fields = ['Имя', 'Фамилия', 'Почта', 'Телефон', 'ИНН']

export class CartFormPersonal extends useCartFormPersonalInfo {
	#personalData

	constructor() {
		super()

		this.#personalData = [
			{
				label: 'Имя',
				value: '',
				isValidate: false,
				id: 'cart__personal-info__validate-name',
				validationText: 'Укажите имя'
			},
			{
				label: 'Фамилия',
				value: '',
				isValidate: false,
				id: 'cart__personal-info__validate-surname',
				validationText: 'Введите фамилию'
			},
			{
				label: 'Почта',
				value: '',
				isValidate: false,
				id: 'cart__personal-info__validate-email',
				validationText: 'Укажите электронную почту'
			},
			{
				label: 'Телефон',
				value: '',
				isValidate: false,
				id: 'cart__personal-info__validate-telephone',
				validationText: 'Укажите номер телефона'
			},
			{
				label: 'ИНН',
				value: '',
				isValidate: false,
				id: 'cart__personal-info__validate-inn',
				validationText: 'Укажите ИНН'
			}
		]
	}

	resetFields() {
		this.#personalData.forEach(personalData => {
			personalData.value = ''
			personalData.isValidate = false
		})

		const formEl = this.element.querySelector('form')
		const fieldsEl = formEl.querySelectorAll('input')
		fieldsEl.forEach(field => {
			field.value = ''
		})
	}

	getPersonalData() {
		return this.#personalData
	}

	drawValidate = (id, children, variant) => {
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

	#removeValidate = (id, variant) => {
		this.element.querySelector(`#${id}`) &&
			this.element.querySelector(`#${id}`).remove()

		this.fieldWrapperComponents.forEach(fieldWrapperComponent => {
			if (fieldWrapperComponent.variant === variant) {
				fieldWrapperComponent.component.classList.remove(styles.validate)
			}
		})
	}

	#fillingData = (variant, value, isValidate) => {
		if (
			this.#personalData.filter(personalData => personalData.label === variant)
				.length
		) {
			this.#personalData.forEach(personalData => {
				if (personalData.label === variant) {
					personalData.value = value
					personalData.isValidate = isValidate
				}
			})
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
				this._handleInputField(
					e,
					field,
					this.#removeValidate,
					this.#fillingData,
					styles
				)
			)
			this[field].element.addEventListener('change', e =>
				this._handleChangeField(e, field, this.drawValidate, this.#fillingData)
			)
		})

		this.#addStyles()
		return this.element
	}
}
