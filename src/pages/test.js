import {getAppData} from '../components/Data'
import React from 'react'

class Test extends React.Component {

  render() {
    getAppData()
      .then(r => console.log(r))

    return (
      <h1>test</h1>
    )
  }
}

export default Test