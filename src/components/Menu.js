import React from 'react'
import { withContext } from '../components/Context';
import css from '../less/menu.module.less'
import MenuItem from '../components/MenuItem'

class Menu extends React.Component {

  constructor(props) {
    super(props) 

    const {
      activeSubCategory:subCat,
      viewerMenusBySubCategoryId: viewers
    } = props.context

    const menu        = viewers[subCat.id]
    const openChildId = menu[0].id

    this.state = {
      menu,
      openChildId
    }
  }

  setOpenChildId = id => {
    this.setState({
      openChildId: id
    })
  }

  render() {
    const {menu,openChildId} = this.state

    console.log(openChildId)

    const menuEl = menu.map(item => {
      return (
        <MenuItem 
          key={item.id} 
          model={item} 
          level={1} 
          openItemId={openChildId}
          setOpenItemId={this.setOpenChildId}
        /> 
      )
    })

    return (
      <div id='modelsMenu' className={css.menu}>
        {menuEl}
      </div>
    )
  }
}

export default withContext(Menu)