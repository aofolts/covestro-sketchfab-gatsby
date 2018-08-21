import React from 'react'
import css from '../less/categories.module.less'
import {withContext} from '../components/Context'
import SubCategoryCard from '../components/SubCategoryCard'

class SubCategories extends React.Component {

  render() {
    const {activeSubCategories:cats} = this.props.context
  
    const catsEl = cats.map(cat => {
      return <SubCategoryCard key={cat.id} item={cat}/>
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

export default withContext(SubCategories)