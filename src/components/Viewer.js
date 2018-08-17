import React from 'react'
import { withAppContext } from '../components/AppContext';
import css from '../src/less/viewer.less'

class Viewer extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {activeViewer} = this.props.context,
          {viewerKey} = activeViewer
          
    const atts = {
            frameBorder: 0,
            vr: null,
            allow: 'autoplay; fullscreen; vr;',
            autoPlay: true
          },
          src = `https://sketchfab.com/models/${viewerKey}/embed?autostart=1`
          
    return (
      <div className={css.container}>
        <div className={css.viewer}>
          <iframe className={css.iframe} src={src} {...atts}/>
        </div>
      </div>
    )
  }
}

export default withAppContext(Viewer)