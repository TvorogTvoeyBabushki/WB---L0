import { stringPattern, validEmail } from '@/utils/regex'

export class useCartFormPersonalInfo {
	_handleChangeField = (e, variant, drawValidate, fillingData) => {
		if (variant.toLowerCase() === 'имя') {
			const numberPattern = /[0-9]/g
			const symbolPattern = /[^a-zа-яё0-9\s]/gi

			if (
				numberPattern.test(e.target.value) ||
				symbolPattern.test(e.target.value)
			) {
				drawValidate(
					'cart__personal-info__validate-name',
					'Укажите имя',
					variant
				)
				fillingData(variant, e.target.value.trim(), false)
			}
		}

		if (variant.toLowerCase() === 'фамилия') {
			const numberPattern = /[0-9]/g
			const symbolPattern = /[^a-zа-яё0-9\s]/gi

			if (
				numberPattern.test(e.target.value) ||
				symbolPattern.test(e.target.value)
			) {
				drawValidate(
					'cart__personal-info__validate-surname',
					'Укажите фамилию',
					variant
				)
				fillingData(variant, e.target.value.trim(), false)
			}
		}

		if (variant.toLowerCase() === 'почта') {
			if (!validEmail.test(e.target.value) && e.target.value.length) {
				drawValidate(
					'cart__personal-info__validate-email',
					'Проверьте адрес электронной почты',
					variant
				)
				fillingData(variant, e.target.value.trim(), false)
			}
		}

		if (variant.toLowerCase() === 'телефон') {
			if (
				e.target.value.replace(stringPattern, '').length !== 11 &&
				e.target.value.replace(stringPattern, '').length
			) {
				drawValidate(
					'cart__personal-info__validate-telephone',
					'Формат: +9 999 999 99 99',
					variant
				)
				fillingData(variant, e.target.value.trim(), false)
			}
		}

		if (variant.toLowerCase() === 'инн') {
			if (e.target.value.length !== 12 && e.target.value.length) {
				drawValidate(
					'cart__personal-info__validate-inn',
					'Проверьте ИНН',
					variant
				)
				fillingData(variant, e.target.value.trim(), false)
			}
		}
	}

	_handleInputField = (e, variant, removeValidate, fillingData, styles) => {
		if (variant.toLowerCase() === 'имя') {
			const numberPattern = /[0-9]/g
			const symbolPattern = /[^a-zа-яё0-9\s]/gi

			if (
				!(
					symbolPattern.test(e.target.value) ||
					numberPattern.test(e.target.value)
				)
			) {
				removeValidate('cart__personal-info__validate-name', variant)
				fillingData(
					variant,
					e.target.value.trim(),
					!e.target.value.length ? false : true
				)
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
				removeValidate('cart__personal-info__validate-surname', variant)
				fillingData(
					variant,
					e.target.value.trim(),
					!e.target.value.length ? false : true
				)
			}
		}

		if (variant.toLowerCase() === 'почта') {
			if (validEmail.test(e.target.value) || !e.target.value.length) {
				removeValidate('cart__personal-info__validate-email', variant)
				fillingData(
					variant,
					e.target.value.trim(),
					!e.target.value.length ? false : true
				)
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

			if (
				e.target.value.replace(stringPattern, '').length === 11 ||
				!e.target.value.replace(stringPattern, '').length
			) {
				removeValidate('cart__personal-info__validate-telephone', variant)
				fillingData(
					variant,
					e.target.value.trim(),
					!e.target.value.length ? false : true
				)
			}
		}

		if (variant.toLowerCase() === 'инн') {
			const fieldValue = e.target.value.replace(stringPattern, '')
			e.target.value = fieldValue

			if (e.target.value.length === 12 || !e.target.value.length) {
				removeValidate('cart__personal-info__validate-inn', variant)
				fillingData(
					variant,
					e.target.value.trim(),
					!e.target.value.length ? false : true
				)
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
}
