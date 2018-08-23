import * as contentful from 'contentful'

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

  return {
    categories,
    itemsById
  }
}

function formatItem(item) {
  const {subMenu} = item.fields,
        type = item.sys.contentType.sys.id,
        id   = item.sys.id

  const newItem = {
    id,
    name: item.fields.name,
    type
  }

  if (Array.isArray(subMenu) && subMenu.length > 0) {
    newItem.subMenu = subMenu.map(item => item.sys.id)
  }

  if (['category','subCategory'].includes(type)) {
    newItem.image = item.fields.image
  }
  else if (type === 'viewer') {
    newItem.viewerKey = item.fields.viewerKey
    newItem.explodedViewerKey = item.fields.explodedViewerKey || false
    newItem.sectionViewerKey  = item.fields.sectionViewerKey || false
    newItem.description       = item.fields.description || false
  }

  return newItem
}

// function formatItem2(item) {
//   const type = item.sys.contentType.sys.id,
//         id   = item.sys.id

//   const newItem = {
//     id,
//     name: item.fields.name,
//     type
//   }

//   if (['category','subCategory'].includes(type)) {
//     newItem.image = item.fields.image
//   }
//   if (type === 'subCategory') {
//     newItem.category = item.fields.category.sys.id
//   } 
//   else if (type === 'viewer') {
//     newItem.viewerKey = item.fields.viewerKey
//     newItem.subCategory       = item.fields.subCategory.sys.id
//     newItem.explodedViewerKey = item.fields.explodedViewerKey || false
//     newItem.sectionViewerKey  = item.fields.sectionViewerKey || false
//     newItem.parentViewer      = item.fields.parentViewer ? item.fields.parentViewer.sys.id : false
//   }

//   return newItem
// }

export {
  getAppData
}