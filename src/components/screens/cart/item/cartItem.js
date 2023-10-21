import { Checkbox } from '@/components/ui/checkbox/checkbox'

import { CartItemPrice } from './price/cartItemPrice'
import styles from './cartItem.module.scss'

export class CartItem {
	constructor(variant) {
		this.cartItemWrapper = document.createElement('div')
		this.variant = variant
	}

	#handleClickCheckbox = variant => {
		if (variant === 'cart item') {
			this.cartItemCheckbox.addStyles(variant)
		}
	}

	#handleHoverCompanyInfo = (e, variant, cartItem) => {
		if (variant === 'enter') {
			this.#drawCompanyInfoWrapper(e.target, variant, cartItem)
		} else {
			this.#drawCompanyInfoWrapper(e.target, variant, cartItem)
		}
	}

	#addStyles() {
		this.cartItemWrapper.classList.add(styles.cart_item_wrapper)
		this.cartItem.classList.add(styles.cart_item)
		this.variant === 'missed' &&
			this.cartItem.classList.add(styles.cart_item_missed)
		this.cartItemInfoDescription?.classList.add(styles.item_description)
		this.cartItemInfoAddress &&
			this.cartItemInfoAddress.classList.add(styles.item_address)
		this.cartItemInfoAddress &&
			this.cartItemInfoCompany.classList.add(styles.item_company)
	}

	#drawCompanyInfoWrapper(companyInfoEl, variant, cartItem) {
		if (variant === 'enter') {
			this.companyInfoWrapper = document.createElement('div')
			this.companyInfoTitle = document.createElement('h3')
			this.companyInfoIndex = document.createElement('div')
			this.companyInfoAddress = document.createElement('div')

			this.companyInfoTitle.append(cartItem.company)
			this.companyInfoIndex.append('ОГРН: 5167746237148')
			this.companyInfoAddress.append(
				'129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34'
			)
			this.companyInfoWrapper.append(
				this.companyInfoTitle,
				this.companyInfoIndex,
				this.companyInfoAddress
			)
			companyInfoEl.append(this.companyInfoWrapper)

			return this.companyInfoWrapper
		} else {
			companyInfoEl.removeChild(companyInfoEl.querySelector('div'))
		}
	}

	draw(cartItem) {
		this.cartItem = document.createElement('div')
		this.cartItemImgLink = document.createElement('a')
		this.cartItemImg = document.createElement('img')
		this.cartItemInfo = document.createElement('div')
		this.cartItemInfoTitle = document.createElement('h2')
		this.cartItemInfoTitleLink = document.createElement('a')
		this.cartItemInfoAddress =
			this.variant === 'selected' ? document.createElement('div') : ''
		this.cartItemInfoCompany =
			this.variant === 'selected' ? document.createElement('div') : ''
		this.cartItemPrice = new CartItemPrice(this.variant)
		this.cartItemCheckbox = this.variant === 'selected' ? new Checkbox() : ''

		if (cartItem.description) {
			this.cartItemInfoDescription = document.createElement('div')

			for (const key in cartItem.description) {
				this[key] = document.createElement('span')

				this[key].append(
					key === 'color'
						? `Цвет: ${cartItem.description[key]}`
						: `Размер: ${cartItem.description[key]}`
				)
				this.cartItemInfoDescription.append(this[key])
			}
		}

		this.cartItemImgLink.setAttribute('href', '#')
		this.cartItemInfoTitleLink.setAttribute('href', '#')
		this.cartItemImg.setAttribute('src', cartItem.src)
		this.cartItemImg.setAttribute(
			'alt',
			cartItem.title.split(' ').length < 7
				? cartItem.title.replaceAll('"', "'")
				: `${cartItem.title
						.replaceAll('"', "'")
						.split(' ')
						.slice(0, 7)
						.join(' ')}...`
		)

		this.cartItemImgLink.append(this.cartItemImg)
		this.cartItemInfoTitle.append(cartItem.title)
		this.cartItemInfoTitleLink.append(this.cartItemInfoTitle)

		if (this.cartItemInfoAddress && this.cartItemInfoCompany) {
			this.cartItemInfoAddress.append(cartItem.address)
			this.cartItemInfoCompany.innerHTML = `
      ${cartItem.company} 
				<span>
					<svg
						width="20" 
						height="20" 
						viewBox="0 0 20 20" 
						fill="none" 
						xmlns="http://www.w3.org/2000/svg">
							<circle cx="10" cy="10" r="7.5" stroke="#9797AF"/>
							<path d="M9.88867 7.58691C9.62826 7.58691 9.41504 7.51042 9.24902 7.35742C9.08301 7.20117 9 7.01074 9 6.78613C9 6.55501 9.08301 6.36621 9.24902 6.21973C9.41504 6.07324 9.62826 6 9.88867 6C10.1523 6 10.3656 6.07324 10.5283 6.21973C10.6943 6.36621 10.7773 6.55501 10.7773 6.78613C10.7773 7.02051 10.6943 7.21257 10.5283 7.3623C10.3656 7.51204 10.1523 7.58691 9.88867 7.58691ZM10.6504 13.3779H9.10742V8.37793H10.6504V13.3779Z" fill="#9797AF"/>
					</svg>
				</span>
    	`
		}

		this.cartItemInfo.append(
			this.cartItemInfoTitleLink,
			cartItem.description ? this.cartItemInfoDescription : '',
			this.cartItemInfoAddress ? this.cartItemInfoAddress : '',
			this.cartItemInfoCompany ? this.cartItemInfoCompany : ''
		)
		this.cartItem.append(
			this.cartItemCheckbox ? this.cartItemCheckbox.draw() : '',
			this.cartItemImgLink,
			this.cartItemInfo
		)
		this.cartItemWrapper.append(
			this.cartItem,
			this.cartItemPrice.draw(cartItem)
		)

		this.cartItemCheckbox.element?.addEventListener('click', () =>
			this.#handleClickCheckbox('cart item')
		)

		if (this.cartItemInfoCompany) {
			this.cartItemInfoCompanySpan =
				this.cartItemInfoCompany.querySelector('span')

			this.cartItemInfoCompanySpan.addEventListener('mouseenter', e =>
				this.#handleHoverCompanyInfo(e, 'enter', cartItem)
			)
			this.cartItemInfoCompanySpan.addEventListener('mouseleave', e =>
				this.#handleHoverCompanyInfo(e, 'leave', cartItem)
			)
		}

		this.cartItemWrapper.addEventListener('mouseenter', () => {
			this.cartItemPrice.cartItemQuantity.handleShowPanel('enter')
		})
		this.cartItemWrapper.addEventListener('mouseleave', () => {
			this.cartItemPrice.cartItemQuantity.handleShowPanel('leave')
		})

		this.#addStyles()
		return this.cartItemWrapper
	}
}
