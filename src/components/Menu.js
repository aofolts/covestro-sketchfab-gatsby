import React from 'react'
import { withContext } from '../components/Context';
import css from '../less/menu.module.less'
import MenuItem from '../components/MenuItem'

class Menu extends React.Component {

  constructor(props) {
    super(props) 

    const {
      activeSubCategory:subCat
    } = props.context

    const openChildId = subCat.subMenu[0]

    this.state = {
      openChildId
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {id:prevId} = prevProps.context.activeSubCategory
    const {id:newId}  = this.props.context.activeSubCategory

    if (prevId !== newId) {
      const id = this.props.context.activeSubCategory.subMenu.find(id => {
        const item = this.props.context.getItemById(id)

        return item.subMenu && item.subMenu.length > 0
      })

      this.setState({
        openChildId: id
      })
    }
  }
  

  setOpenChildId = id => {
    this.setState({
      openChildId: id
    })
  }

  render() {
    const {openChildId} = this.state
    const {activeSubCategory:subCat} = this.props.context

    const menuEl = subCat.subMenu.map(id => {
      return (
        <MenuItem 
          key={id} 
          itemId={id} 
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