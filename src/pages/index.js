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
        ...data,
        categoriesByName: data.categories.sort((a,b) => a.name < b.name ? -1 : 1)
      }))
  }

  getItemById = id => {
    return this.state.itemsById[id] || false
  }

  setActiveViewerById = id => {
    this.setState({
      activeViewer: this.getItemById(id)
    })
  }

  setCategoryById = id => {
    const cat = this.getItemById(id)

    this.setState({
      activeCategory: cat,
      title: cat.name,
      view: 'subCategories'
    })

    if (cat.subMenu.length === 1) {
      this.setSubCategoryById(cat.subMenu[0])
    }
  }

  setSubCategoryById = id => {
    const subCat = this.getItemById(id)

    const viewers = subCat.subMenu.map(id => {
      return this.getItemById(id)
    })
    
    this.setState({
      activeSubCategory: subCat,
      activeViewer: viewers[0],
      title: subCat.name,
      view: 'models'
    })
  }

  setTitle = title => {
    this.setState({
      title: title
    })
  }

  setView = view => {
    this.setState({
      view: view
    })
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        <div id='app'>
          <Typekit kidId='vuh7fwm'/>
          <Header/>
          <Body/>
        </div>
      </Context.Provider>
    )
  }
}

export default Index