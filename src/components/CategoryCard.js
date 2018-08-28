import React, { Component } from 'react';
import { withContext } from './Context';
import css from '../less/categories.module.less'

class CategoryCard extends Component {

  render() {
    const {setCategoryById,getItemById} = this.props.context,
          {id,name,image,icon} = getItemById(this.props.itemId)

    const handleClick = () => {
      setCategoryById(id)
    } 

    const imageClasses = [
      css.image,
      css.categoryImage
    ].join(' ')

    const iconEl = icon 
      ? <img className={css.categoryIcon} src={icon.fields.file.url} alt={name}/> 
      : null

    return (
      <div className={css.card} onClick={handleClick}>
        <h3 className={css.cardTitle}>{name}</h3> 
        <img className={imageClasses} src={image.fields.file.url} alt={name}/>
        {iconEl}
      </div> 
    )
  }
}

export default withContext(CategoryCard);