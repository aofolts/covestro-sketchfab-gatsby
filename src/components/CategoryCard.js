import React, { Component } from 'react';
import { withContext } from './Context';
import css from '../less/categories.module.less'

class CategoryCard extends Component {

  render() {
    const {setCategoryById,getItemById} = this.props.context,
          {id,name,image} = getItemById(this.props.itemId)

    const handleClick = () => {
      setCategoryById(id)
    }

    return (
      <div className={css.card} onClick={handleClick}>
        <h3 className={css.cardTitle}>{name}</h3> 
        <img className={css.image} src={image.fields.file.url} alt={name}/>
      </div> 
    )
  }
}

export default withContext(CategoryCard);