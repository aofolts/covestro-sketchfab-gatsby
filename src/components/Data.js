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
    itemsById,
  }
}

function formatItem(item) {
  const {subMenu,parentViewer} = item.fields,
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

  if (type === 'category') {
    newItem.icon = item.fields.icon
    newItem.selectedIcon = item.fields.selectedIcon
  }
  if (['category','subCategory'].includes(type)) {
    newItem.image = item.fields.image
  }
  else if (type === 'viewer') {
    newItem.parentModelId = parentViewer ? parentViewer.sys.id : false
    newItem.viewerKey = item.fields.viewerKey
    newItem.explodedViewerKey = item.fields.explodedViewerKey || false
    newItem.sectionViewerKey  = item.fields.sectionViewerKey || false
    newItem.description       = item.fields.description || false
  }

  return newItem
}

export {
  getAppData
}