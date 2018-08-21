import React, { Component } from 'react';
import { withContext } from './Context';
import css from '../less/categories.module.less'

class SubCategoryCard extends Component {

  render() {
    const {setSubCategoryById} = this.props.context
    const {id,name,image} = this.props.item

    const handleClick = () => setSubCategoryById(id)

    return (
      <div className={css.card} onClick={handleClick}>
        <h3 className={css.cardTitle}>{name}</h3> 
        <img className={css.image} src={image.fields.file.url} alt={name}/>
      </div> 
    )
  }
}

export default withContext(SubCategoryCard);