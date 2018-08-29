import React,{Component} from 'react'
import css from '../less/categories.module.less'
import {withContext} from '../components/Context'
import CategoryCard from '../components/CategoryCard'

class Categories extends Component {

  render() {
    const {categoriesByName:cats} = this.props.context

    const catsEl = cats.map(cat => {
      return <CategoryCard key={cat.id} itemId={cat.id}/>
    })
  
    return (
      <div id='categoriesGrid' className={css.wrap}>
        <div id='categoriesInnerGrid' className={css.categoriesInnerWrap}>
          {catsEl}
        </div>
      </div>
    )
  }
}

export default withContext(Categories)