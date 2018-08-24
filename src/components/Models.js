import React,{Component} from 'react'
import css from '../less/models.module.less'
import {withContext} from '../components/Context'
import Menu from '../components/Menu'
import Viewer from '../components/Viewer'

class Models extends Component {

  render() {
    return (
      <div id='models' className={css.models}>
        <Viewer/>
        <Menu/>
      </div>
    )
  }
}

export default withContext(Models)