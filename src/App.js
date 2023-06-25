import React from 'react'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import { publicRoutes } from './Components/Routes/Routes'
import { privateRoutes } from './Components/Routes/Routes'
import { useSelector } from 'react-redux'
const App = () => {
  const auth=useSelector((state)=>state.authentication.isAuth)
  return (
    <>
    <BrowserRouter>
    <Routes>
      {
       publicRoutes.map((item)=>{
        return(
        <>
        <Route path={item.path} element={item.element}/>
        </>
        )
       })}
       {
        privateRoutes.map((item)=>{
          return(
            <>
            {
              auth&&
            <Route path={item.path} element={item.element}/>
            }
            </>
          )
        })
       }
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App