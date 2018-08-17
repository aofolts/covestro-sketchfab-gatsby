import React from 'react'
import css from '../src/less/header.less'
import { withAppContext } from './AppContext';

class Header extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {view,setView,title} = this.props.context

    const headerClasses = [
      css.header,
      view === 'categories' ? css.categoriesHeader : css.wideHeader
    ].join(' ')

    const secondaryEls = view === 'categories' 
      ? null
      : (
        <h1>{title}</h1>

      )

    return (
      <header className={headerClasses} onClick={() => setView('categories')}>
        <img className={css.logo} src='/static/img/logo.png'/>
        {secondaryEls}
      </header>
    )
  }
}

export default withAppContext(Header)