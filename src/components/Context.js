import React from 'react'

const Context = React.createContext()

function withContext(Component) {
  return function(props) {
    return (
      <Context.Consumer>
        {ctx => <Component {...props} context={ctx} />}
      </Context.Consumer> 
    )
  }
}

export {
  Context,
  withContext
}