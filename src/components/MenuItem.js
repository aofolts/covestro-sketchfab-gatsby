import React from 'react'
import { withContext } from '../components/Context';
import css from '../less/menu.module.less'

class MenuItem extends React.Component {

  constructor(props) {
    super(props)

    const childrenByName = props.context.viewersByName.filter(item => {
      return item.parentViewer === props.model.id
    })
  
    this.state = {
      childrenByName,
      openItemId: props.openItemId,
      openChildId: childrenByName.length > 0 ? childrenByName[0].id : null
    }
  }

  hasChildren = () => {
    return this.state.childrenByName.length > 0
  }

  isOpen = () => {
    return this.state.openItemId === this.props.model.id
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
    e.stopPropagation();

    const isOpen = !this.isOpen()

    this.props.setOpenItemId(isOpen ? this.props.model.id : false)
  }

  render() {
    const isOpen = this.isOpen()
    const {level,context} = this.props
    const {name,id} = this.props.model

    const {
      activeViewer,
      setActiveViewerById
    } = this.props.context

    const subMenuToggle = this.hasChildren()
      ? (
        <div className={css.itemSubMenuToggle} onClick={this.toggleSubMenu}>
          {isOpen ? '-' : '+'}
        </div>
      )
      : null

    const handleClick = () => {
      setActiveViewerById(id)
    }

    const SubMenu = props => {
      const itemsEl = this.state.childrenByName.map(item => {
        return (
          <MenuItem 
            key={item.id} 
            model={item} 
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
        <div className={classes} level={level} onClick={handleClick}>
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