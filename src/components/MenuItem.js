import React from 'react'
import { withContext } from '../components/Context';
import css from '../less/menu.module.less'
import {withMenuContext} from '../components/MenuContext'

class MenuItem extends React.Component {

  constructor(props) {
    super(props)

    const item = this.props.context.getItemById(props.itemId)

    this.state = {
      item
    }
  }

  hasChildren = () => {
    const subMenu = this.state.item.subMenu

    return subMenu && subMenu.length > 0
  }

  isOpen = () => {
    return this.props.menuContext.openItemIds.includes(this.state.item.id)
  }

  toggleSubMenu = e => {
    const isOpen = !this.isOpen(),
          id = isOpen ? this.state.item.id : this.state.item.parentModelId

    this.props.menuContext.setOpenedItemId(id)
  }

  openSubMenu = () => {
    if (!this.isOpen() && this.hasChildren()) {
      this.props.menuContext.setOpenedItemId(this.state.item.id)
    }
  }

  render() {
    const isOpen = this.isOpen()
    const {level,context} = this.props
    const {name,id} = this.state.item

    const {
      activeViewer,
      setActiveViewerById
    } = this.props.context

    const handleToggleClick = e => {
      e.stopPropagation()

      this.toggleSubMenu()
    }

    const subMenuToggle = this.hasChildren()
      ? (
        <div className={css.itemSubMenuToggle} onClick={handleToggleClick}>
          {isOpen ? '-' : '+'}
        </div>
      )
      : null

    const SubMenu = props => {
      if (!this.hasChildren()) return null

      const itemsEl = this.state.item.subMenu.map(id => {
        return (
          <MenuItem 
            key={id} 
            itemId={id} 
            level={level + 1} 
            context={context}
            menuContext={this.props.menuContext}
          />
        )
      })
    
      const subMenuClasses = [
        css.subMenu,
        isOpen ? null : css.subMenuIsHidden
      ].join(' ')
    
      if (itemsEl.length > 0) {
        return (
          <div className={subMenuClasses}>
            {itemsEl}
          </div>
        )
      }
     
      return null
    } 

    const classes = [
      css.item,
      css[`itemLevel${level}`],
      activeViewer.id === id ? css.selectedItem : null,
      this.isOpen() ? css.itemIsOpen : css.itemIsClosed
    ].join(' ') 

    const handleClick = e => {
      setActiveViewerById(id)
      this.openSubMenu()
    }

    return (
      <React.Fragment>
        <div className={classes} onClick={handleClick}>
          <div className={css.itemHeader}>
            <h3 className={css.itemTitle}>{name}</h3>
            {subMenuToggle}
          </div>
        </div>
        <SubMenu/>
      </React.Fragment>
    )
  }
} 

export default withMenuContext(
  withContext(MenuItem)
)