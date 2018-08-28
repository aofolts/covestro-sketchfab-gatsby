import React from 'react'
import { withContext } from '../components/Context';
import css from '../less/menu.module.less'

class MenuItem extends React.Component {

  constructor(props) {
    super(props)

    const item = this.props.context.getItemById(props.itemId)

    this.state = {
      item,
      openItemId: props.openItemId,
      openChildId: false
    }
  }

  hasChildren = () => {
    const subMenu = this.state.item.subMenu

    return subMenu && subMenu.length > 0
  }

  isOpen = () => {
    return this.state.openItemId === this.state.item.id
  }

  componentDidUpdate(prevProps) {
    // If open sibling id has changed
    if (prevProps.openItemId !== this.props.openItemId) {
      this.setState({
        openItemId: this.props.openItemId
      })
    }
  }
  
  setOpenChildId = id => {
    this.setState({
      openChildId: id
    })
  }

  toggleSubMenu = e => {
    const isOpen = !this.isOpen()

    this.props.setOpenItemId(isOpen ? this.state.item.id : false)
  }

  openSubMenu = () => {
    this.props.setOpenItemId(this.state.item.id)
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

    const handleClick = () => {
      setActiveViewerById(id)
      
      if (!this.isOpen()) {
        this.openSubMenu()
      }
    }

    const SubMenu = props => {
      if (!this.hasChildren()) return null

      const itemsEl = this.state.item.subMenu.map(id => {
        return (
          <MenuItem 
            key={id} 
            itemId={id} 
            level={level + 1} 
            context={context}
            openItemId={this.state.openChildId}
            setOpenItemId={this.setOpenChildId}
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
      isOpen ? css.itemIsOpen : css.itemIsClosed
    ].join(' ') 

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

export default withContext(MenuItem)