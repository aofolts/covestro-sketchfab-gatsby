import React from 'react'

const MenuContext = React.createContext()

function withMenuContext(Component) {
  return function(props) {
    return (
      <MenuContext.Consumer>
        {ctx => <Component {...props} menuContext={ctx} />}
      </MenuContext.Consumer> 
    )
  }
}

export {
  MenuContext,
  withMenuContext
}