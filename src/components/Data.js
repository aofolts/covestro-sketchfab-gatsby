import * as contentful from 'contentful'

function getItemChildren(item,viewers) {
  const parentId = item.id

  const kids = viewers.filter(item => {
    if (item.parentViewer === parentId) {
      item.subMenu = getItemChildren(item,viewers)

      return true
    }

    return false
  })

  return kids
}

async function getAppData() {
  const client = contentful.createClient({
    space: 'wozd62c9qvac',
    accessToken: 'beff361ee1e1cc7916dd7417ccb952f16cc3c95761ac1c829cfea793db33d974'
  })

  const categories = await client.getEntries({
    content_type: 'category',
    order: 'fields.name'
  }).then(r => r.items.map(item => formatItem(item)))

  const subCategories = await client.getEntries({
    content_type: 'subCategory',
    order: 'fields.name'
  }).then(r => r.items.map(item => formatItem(item)))

  const viewers = await client.getEntries({
    content_type: 'viewer',
    order: 'fields.name'
  }).then(r => r.items.map(item => formatItem(item)))

  const items = [
    ...categories,
    ...subCategories,
    ...viewers
  ]

  // Store all items by id
  const itemsById = items.reduce((obj,item) => {
    obj[item.id] = item

    return obj
  },{})

  // Store viewer menus
  const viewerMenusBySubCategoryId = viewers.reduce((obj,item) => {
    if (item.parentViewer === false) {
      Array.isArray(obj[item.subCategory])
        ? obj[item.subCategory].push(item)
        : obj[item.subCategory] = [item]
    }

    item.subMenu = getItemChildren(item,viewers)

    return obj
  },{})

  // Alphabetize categories and subCategories for easy iteration
  const categoriesByName = categories.sort((a,b) => {
    return a.name < b.name ? -1 : 1
  })

  const subCategoriesByName = subCategories.sort((a,b) => {
    return a.name < b.name ? -1 : 1
  })

  const viewersByName = viewers.sort((a,b) => {
    return a.name < b.name ? -1 : 1
  })

  return {
    itemsById,
    categoriesByName,
    subCategoriesByName,
    viewersByName,
    viewerMenusBySubCategoryId
  }
}

function formatItem(item) {
  const type = item.sys.contentType.sys.id,
        id   = item.sys.id

  const newItem = {
    id,
    name: item.fields.name,
    type
  }

  if (['category','subCategory'].includes(type)) {
    newItem.image = item.fields.image
  }
  if (type === 'subCategory') {
    newItem.category = item.fields.category.sys.id
  } 
  else if (type === 'viewer') {
    newItem.viewerKey = item.fields.viewerKey
    newItem.subCategory       = item.fields.subCategory.sys.id
    newItem.explodedViewerKey = item.fields.explodedViewerKey || false
    newItem.sectionViewerKey  = item.fields.sectionViewerKey || false
    newItem.parentViewer      = item.fields.parentViewer ? item.fields.parentViewer.sys.id : false
  }

  return newItem
}

export {
  getAppData
}