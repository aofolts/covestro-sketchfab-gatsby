import * as contentful from 'contentful'

async function getAppData() {
  const client = contentful.createClient({
    space: 'wozd62c9qvac',
    accessToken: 'beff361ee1e1cc7916dd7417ccb952f16cc3c95761ac1c829cfea793db33d974'
  })

  const categories = await client.getEntries({
    content_type: 'category',
    order: 'fields.name'
  }).then(r => r.items.reduce((obj,item) => {
    obj[item.sys.id] = formatItem(item)

    return obj
  },{}))

  const subCategories = await client.getEntries({
    content_type: 'subCategory',
    order: 'fields.name'
  }).then(r => r.items.reduce((obj,item) => {
    obj[item.sys.id] = formatItem(item)

    return obj
  },{}))

  const viewers = await client.getEntries({
    content_type: 'viewer',
    order: 'fields.name'
  }).then(r => r.items.reduce((obj,item) => {
    obj[item.sys.id] = formatItem(item)

    return obj
  },{}))

  const items = {
    ...categories,
    ...subCategories,
    ...viewers
  }

  return {
    categories,
    subCategories,
    viewers,
    items
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

  if (type === 'category') {
    newItem.image = item.fields.image
  }
  else if (type === 'subCategory') {
    newItem.category = item.fields.category
  } 
  else if (type === 'viewer') {
    newItem.viewerKey = item.fields.viewerKey

    newItem.explodedViewerKey = item.fields.explodedViewerKey || false
    newItem.parentViewer      = item.fields.parentViewer || false
  }

  return newItem
}

function formatViewer(item) {
  return {
    id: item.sys.id,
    name: item.fields.name,
    viewerKey: item.viewerKey,
    explodedViewerKey: item.explodedViewerKey ? item.explodedViewerKey : null,
    category: item.fields.category
  }
}

function formatViewerSubMenu(items) {
  const arr = items.map(item => {
    const subMenu = item.subMenu ? formatViewerSubMenu(item.subMenu) : null

    return {
      id: item.sys.id,
      name: item.fields.name,
      viewerKey: item.viewerKey,
      explodedViewerKey: item.explodedViewerKey || null,
      subMenu
    }
  })
}

// const items = await categories.map(cat => {
//   const obj = {
//     id: cat.sys.id,
//     name: cat.fields.name,
//     image: cat.fields.image,
//   }

//   // If subCategories
//   if ('subMenu' in cat.fields) {
//     // Map subCategory menu
//     obj.subMenu = cat.fields.subMenu.map(subCat => {
//       const fullSubCat = subCategories.find(cat => {
//         return cat.sys.id === subCat.sys.id
//       })

//       const obj = {
//         id: fullSubCat.sys.id,
//         name: fullSubCat.fields.name,
//         image: fullSubCat.fields.image,
//       }

//       // If viewers
//       if ('subMenu' in subCat.fields) {
//         // Map viewers menu
//         obj.subMenu = subCat.fields.subMenu.map(viewer => {
//           // Get all viewer fields
//           const fullViewer = viewers.find(item => {
//             return item.sys.id === viewer.sys.id
//           })

//           return {
//             id: fullViewer.sys.id,
//             name: fullViewer.fields.name,
//             viewerKey: fullViewer.fields.viewerKey
//           }
//         })
//       }

//       return obj
//     })
//   }

//   return obj
// })

export {
  getAppData
}