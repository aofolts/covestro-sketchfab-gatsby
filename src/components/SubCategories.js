import React from 'react'
import css from '../less/categories.module.less'
import {withContext} from '../components/Context'
import SubCategoryCard from '../components/SubCategoryCard'

class SubCategories extends React.Component {

  render() {
    const {activeCategory:cat} = this.props.context
  
    const catsEl = cat.subMenu.map(id => {
      return <SubCategoryCard key={id} itemId={id}/>
    })
  
    return (
      <div id='categoriesGrid' className={css.wrap}>
        <div id='categoriesInnerGrid' className={css.innerWrap}>
          {catsEl}
        </div>
      </div>
    )
  }
}

export default withContext(SubCategories)