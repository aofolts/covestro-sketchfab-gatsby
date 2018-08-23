import React from 'react'
import { withContext } from '../components/Context';
import css from '../less/viewer.module.less'

class Viewer extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      viewerKey: props.context.activeViewer.viewerKey,
      viewerHeight:'100px',
      viewerWidth:'177px'
    }
  }

  componentDidUpdate(prevProps,prevState) {
    // Reset viewerKey
    if (prevProps.context.activeViewer.viewerKey !== this.props.context.activeViewer.viewerKey) {
      this.setViewerKey(this.props.context.activeViewer.viewerKey)
    }
  }

  setViewerKey = key => {
    if (key !== this.state.viewerKey) {
      this.setState({
        viewerKey: key 
      })
    }
  }

  render() {
    const {activeViewer} = this.props.context,
          {viewerKey} = this.state
          
    const atts = {
            frameBorder: 0,
            vr: null,
            allow: 'autoplay; fullscreen; vr;',
            autoPlay: true
          },
          src = `https://sketchfab.com/models/${viewerKey}/embed?autostart=1&autospin=0.2&amp;autostart=1&amp;ui_controls=0&amp;ui_infos=0`

    const ViewToggle = props => {
      const {explodedViewerKey,sectionViewerKey} = activeViewer

      const ToggleItem = props => {
        const {viewerKey:key,label} = props

        const classes = [
          css.viewToggleItem,
          key === this.state.viewerKey ? css.selectedViewToggleItem : null
        ].join(' ')

        return (
          <div className={classes} onClick={() => this.setViewerKey(key)}>
            {label}
          </div>
        )
      }

      if (explodedViewerKey || sectionViewerKey) {
        const compact = <ToggleItem viewerKey={this.props.context.activeViewer.viewerKey} label='Compact'/>

        const exploded = explodedViewerKey
          ? <ToggleItem viewerKey={explodedViewerKey} label='Exploded'/>
          : null

        const section = sectionViewerKey
          ? <ToggleItem viewerKey={sectionViewerKey} label='Section'/>
          : null

        return (
          <div className={css.viewToggle}>
            {compact}
            {exploded}
            {section}
          </div>
        )
      }

      return null
    }

    const Description = () => {
      const desc = activeViewer.description
      
      if (desc) {
        return (
          <div className={css.modelDescription}>
            {desc}
          </div>
        )
      }

      return null
    }
          
    return (
      <div id='viewerContainer' className={css.container}>
        <div className={css.viewer}>
          <div className={css.iframeContainer}>
            <iframe className={css.iframe} src={src} {...atts} title={`${activeViewer.name} Model`}/>
            <Description/>
            <ViewToggle/>
          </div>
        </div>
      </div>
    )
  }
}

export default withContext(Viewer)