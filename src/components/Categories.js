import React from 'react'
import css from '../src/less/categories.less'
import {withAppContext} from '../components/AppContext'
import PropTypes from 'prop-types'

class Categories extends React.Component {

  constructor(props) {
    super(props)

    const boundMethods = [
    ]

    boundMethods.forEach(method => this[method] = this[method].bind(this))
  }

  render() {
    const cats = this.props.context.items
  
    const catsEl = cats.map(cat => {
      const {id,name,image} = cat,
            setCategory = this.props.context.setCategory

      return (
        <div key={id} className={css.card} onClick={() => setCategory(cat)}>
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

export default withAppContext(Categories)