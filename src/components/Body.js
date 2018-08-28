import React, {Component} from 'react'
import { Context,withContext } from './Context'
import Categories from './Categories'
import SubCategories from './SubCategories'
import Models from './Models'

const View = props => {
  const views = {
    categories: <Categories/>,
    subCategories: <SubCategories/>,
    models: <Models/>
  }

  return (
    <Context.Consumer>
      {ctx => {
        return views[ctx.view] || null
      }}
    </Context.Consumer>
  )
}

class Body extends Component {

  render() {
    return <View/>
  }
}

export default withContext(Body)