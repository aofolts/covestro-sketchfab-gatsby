import React from 'react'
import css from '../src/less/categories.less'
import {withAppContext} from '../components/AppContext'

class SubCategories extends React.Component {

  constructor(props) {
    super(props)

    const boundMethods = [
      'handleClick',
    ]

    boundMethods.forEach(method => this[method] = this[method].bind(this))
  }

  handleClick() {
    this.props.context.setView('subCategories')
  }

  render() {
    const context   = this.props.context,
          parentCat = context.category,
          cats      = parentCat.fields.subMenu
  
    const catsEl = cats.map(cat => {
      const {name,image} = cat.fields,
            {id}   = cat.sys

      return (
        <div key={id} className={css.card} onClick={this.handleClick}>
          <h3>{name}</h3>
          <img className={css.image} src={image.fields.file.url}/>
        </div>
      )
    })
  
    return (
      <div className={css.categories}>
        <div className={css.wrap}>
          {catsEl}
        </div>
      </div>
    )
  }
}

export default withAppContext(SubCategories)