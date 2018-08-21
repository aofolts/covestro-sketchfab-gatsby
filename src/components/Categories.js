import React,{Component} from 'react'
import css from '../less/categories.module.less'
import {withContext} from '../components/Context'
import CategoryCard from '../components/CategoryCard'

class Categories extends Component {

  render() {
    const {categoriesByName} = this.props.context

    const catsEl = categoriesByName.map(cat => {
      

      return <CategoryCard key={cat.id} item={cat}/>
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

export default withContext(Categories)