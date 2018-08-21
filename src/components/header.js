import React from 'react'
import {withContext} from './Context';
import css from '../less/header.module.less'
import logo from '../images/logo.png'

class Header extends React.Component {

  render() {
    const {
      view,
      setView,
      title,
      categoriesByName,
      activeCategory,
      setCategoryById
    } = this.props.context

    const headerClasses = [
      css.header,
      view === 'categories' ? css.categoriesHeader : css.wideHeader
    ].join(' ')

    const CategorySelect = () => {
      const selectItems = categoriesByName.map(item => {
        const itemClasses = [
          css.categorySelectItem,
          item.id === activeCategory.id ? css.categorySelectActiveItem : null
        ].join(' ')

        return (
          <li key={item.id} className={itemClasses} onClick={() => setCategoryById(item.id)}>
            {item.name}
          </li>
        )
      })

      return (
        <ul className={css.categorySelect}>
          {selectItems}
        </ul>
      )
    }

    const secondaryEls = view !== 'categories' 
      ? (
        <div className={css.secondaryNav}>
          <h1 className={css.title}>{title}</h1>
          {view === 'models' ? <CategorySelect/> : null}
        </div>
      )
      : null

    const handleClick = view === 'categories' 
      ? null : () => setView('categories')

    const logoClasses = [
      css.logo,
      view === 'categories' ? null : css.logoIsActive
    ].join(' ')

    return (
      <header className={headerClasses}>
        <div className={css.logoContainer} onClick={handleClick}>
          <img className={logoClasses} src={logo} alt='Covestro Logo'/>
        </div>
        {secondaryEls}
      </header>
    )
  }
}

export default withContext(Header)