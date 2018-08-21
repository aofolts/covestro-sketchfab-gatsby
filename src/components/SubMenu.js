import React from 'react'
import { withContext } from '../components/Context';
import MenuItem from '../components/MenuItem'

class SubMenu extends React.Component {

  render() {
    return this.props.items.map(item => {
      return <MenuItem key={item.id} model={item} level={props.level} context/>
    })
  }
}

export default withContext(SubMenu)