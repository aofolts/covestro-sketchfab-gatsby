import React from 'react'
import { withAppContext } from '../components/AppContext';
import css from '../src/less/menu.less'

class Menu extends React.Component {

  render() {
    const items = this.props.context.activeMenu.map(item => {
      const classes = [
        css.item
      ].join(' ')

      console.log(item)

      return (
        <li key={item.id} className={classes}>
          <div className={css.itemHeader}>
            <h2 className={css.itemTitle}>{item.name}</h2>
            {item.subMenu ? <div className={css.toggle}/> : null}
          </div>
        </li>
      )
    })

    return (
      <div id='menu' className={css.menu}>
        {items}
      </div>
    )
  }
}

export default withAppContext(Menu)