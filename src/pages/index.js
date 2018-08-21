import React, {Component} from 'react'
import {getAppData} from '../components/Data'
import {Context} from '../components/Context'
import Header from '../components/Header'
import Body from '../components/Body'
import Typekit from 'react-typekit'
import '../less/global.less'

class Index extends Component {

  constructor(props) {
    super(props)

    const boundMethods = [
      'getItemById',
      'setActiveViewerById',
      'setCategoryById',
      'setSubCategoryById',
      'setTitle',
      'setView'
    ]

    boundMethods.forEach(method => this[method] = this[method].bind(this))

    this.state = {
      activeCategory: false,
      activeMenu: false,
      activeSubCategories: [],
      activeSubCategory: false,
      categoriesByName: [],
      getItemById: this.getItemById,
      itemsById: {},
      setActiveViewerById: this.setActiveViewerById,
      setCategoryById: this.setCategoryById,
      setSubCategoryById: this.setSubCategoryById,
      setViewerById: this.setViewerById,
      setTitle: this.setTitle,
      view: 'categories',
      viewerMenusBySubCategoryId: props.viewerMenusBySubCategoryId,
      setView: this.setView,
      subCategoriesByName: [],
      title: null
    }
  }

  componentDidMount() {
    getAppData()
      .then(data => this.setState({
        ...data
      }))
  }

  getItemById(id) {
    return this.state.itemsById[id] || false
  }

  setActiveViewerById(id) {
    this.setState({
      activeViewer: this.getItemById(id)
    })
  }

  setCategoryById(id) {
    const {subCategoriesByName:subCats} = this.state,
          activeCategory = this.getItemById(id)

    const activeSubCategories = subCats.filter(cat => {
      return cat.category === id
    })
  
    this.setState({
      activeCategory,
      activeSubCategories,
      title: activeCategory.name,
      view: 'subCategories'
    })

    if (activeSubCategories.length === 1) {
      this.setSubCategoryById(activeSubCategories[0].id)
    }
  }

  setSubCategoryById(id) {
    const subCat = this.getItemById(id)

    const viewers = this.state.viewersByName.filter(item => {
      return item.parentViewer === false && item.subCategory === id
    })
    
    this.setState({
      activeSubCategory: subCat,
      activeViewer: viewers[0],
      title: subCat.name,
      view: 'models'
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
    return (
      <Context.Provider value={this.state}>
        <Typekit kidId='vuh7fwm'/>
        <Header/>
        <Body/>
      </Context.Provider>
    )
  }
}

export default Index