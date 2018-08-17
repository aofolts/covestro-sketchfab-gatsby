import * as data from '../components/Data'
import React from 'react'
import css from '../src/less/categories.less'

export default class Test extends React.Component {

  static async getInitialProps() {
    const items = await data.getAppData()

    return {
      items
    }
  }

  render() {
    console.log('test')
    return <h1 className={css.frank}>Test</h1>
  }
}