import React from 'react'
import '../src/less/global.less'
import css from '../src/less/app.less'
import Header from '../components/Header.js'
import Categories from '../components/Categories'
import SubCategories from '../components/SubCategories'
import Viewer from '../components/Viewer'
import {AppContext} from '../components/AppContext.js'
import Menu from '../components/Menu'
import {getAppItems} from '../components/Data'

class IndexPage extends React.Component {

  static async getInitialProps() {
    
    
    const items = await getAppItems(categories)

    return {
     categories,
     items,
     subCategories,
     viewers
    }
  } 

  constructor(props) {
    super(props)

    const items = []

    const boundMethods = [
      'getCategoryById',
      'getViewerById',
      'setCategory',
      'setSubCategory',
      'setTitle',
      'setView'
    ]

    boundMethods.forEach(method => this[method] = this[method].bind(this))

    this.state = {
      activeCategory: false,
      activeMenu: false,
      activeSubCategory: false,
      categories: props.categories,
      getCategoryById: this.getCategoryById,
      getSubCategoryById: this.getSubCategoryById,
      items: props.items,
      setCategory: this.setCategory,
      setSubCategory: this.setSubCategory,
      setTitle: this.setTitle,
      subCategories: this.props.subCategories,
      view: 'categories',
      viewers: props.viewers,
      setView: this.setView,
      title: null
    }
  }

  getCategoryById(id) {
    return this.state.categories.find(cat => cat.sys.id === id)
  }

  getSubCategoryById(id) {
    return this.state.subCategories.find(cat => {
      return cat.sys.id === id
    })
  }

  getViewerById(id) {
    return this.state.viewers.find(cat => {
      return cat.sys.id === id
    })
  }

  setCategory(cat) {
    const subCat = cat.subMenu[0]
    
    const newState = {
      activeCategory: cat,
      title: subCat.name,
      view: 'subCategories'
    }

    // Skip to viewer if only one subCategory
    if (cat.subMenu.length === 1) {
      newState.activeViewer = subCat.subMenu[0]
      newState.view = 'viewer'
      this.setSubCategory(subCat)
    }

    this.setState(newState)
  }

  setSubCategory(subCat) {
    this.setState({
      activeSubCategory: subCat,
      activeMenu: subCat.subMenu,
      activeViewer: subCat.subMenu[0],
      title: subCat.name
    })
  }

  setTitle(title) {
    this.setState({
      title: title
    })
  }

  setView(view) {
    this.setState({
      view: view
    })
  }

  render() {
    const view = this.state.view

    const body = (view => {
      switch (view) {
        case 'categories': return <Categories/>;
        case 'subCategories': return <SubCategories/>;
        case 'viewer': return (
          <div className={css.appBody}>
            <Menu/>
            <Viewer/>
          </div>
        );
      }
    })(view)

    const appClasses = [
      css.app
    ].join(' ')

    return (
      
        <AppContext.Provider value={this.state}>
          <div id='app' className={appClasses}>
            <Header/>
            {body}
          </div>
        </AppContext.Provider>
    )
  }
}

export default IndexPage
