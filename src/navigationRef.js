import React from 'react'

export const navigationRef = React.createRef();

export const navigate = (routeName, params) => {
  // console.log('routeName: ', routeName, 'params: ', params)
  navigationRef.current && navigationRef.current.navigate(routeName, params)
  
}

export const navigateResetRoot = (routeName, params) => {
  navigationRef.current && navigationRef.current.resetRoot(
    {
      index: 0,
      routes: [{ name: routeName,
                 params}],
    }
  )

}