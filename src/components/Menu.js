import React from 'react'
import { withContext } from '../components/Context';
import css from '../less/menu.module.less'
import MenuItem from '../components/MenuItem'
import {MenuContext} from '../components/MenuContext'

class Menu extends React.Component {

  constructor(props) {
    super(props) 

    this.state = {
      openItemIds: [],
      setOpenedItemId: this.setOpenedItemId
    }
  } 

  componentDidMount() {
    const {activeViewer:viewer} = this.props.context

    this.setOpenedItemId(viewer.id)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.context.activeSubCategory !== this.props.context.activeSubCategory) {
      this.setOpenedItemId(this.props.context.activeViewer.id)
    }
  }
  

  getOpenItemsByDescendentId = (id,items) => {
    const item     = this.props.context.getItemById(id),
          parentId = item.parentModelId

    items.push(id)

    if (parentId) {
      items = this.getOpenItemsByDescendentId(parentId,items)
    }
    
    return items
  }

  setOpenedItemId = id => {
    const openItemIds = this.getOpenItemsByDescendentId(id,[])

    this.setState({
      openItemIds
    })
  }

  render() {
    const {activeSubCategory:subCat} = this.props.context

    const menuEl = subCat.subMenu.map(id => {
      return (
        <MenuItem 
          key={id} 
          itemId={id} 
          level={1}
        /> 
      )
    })

    return (
      <MenuContext.Provider value={this.state}>
        <div id='modelsMenu' className={css.menu}>
          {menuEl}
        </div>
      </MenuContext.Provider>
    )
  }
}

export default withContext(Menu)