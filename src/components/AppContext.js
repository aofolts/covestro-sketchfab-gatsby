import React from 'react'

const AppContext = React.createContext({
  view: 'categories'
})

function withAppContext(Component) {
  return function AppComponent(props) {
    return (
      <AppContext.Consumer>
        {value => <Component {...props} context={value} />}
      </AppContext.Consumer> 
    )
  }
}

export {
  AppContext,
  withAppContext
}