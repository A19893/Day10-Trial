import Otp from '../Pages/Otp'
import Login from '../Pages/Login'
import Profile from '../Pages/Profile'
import Form from '../Pages/Form'
import Template2 from '../Templates/Template2'
import Template1 from '../Templates/Template1'
import Template3 from '../Templates/Template3'
import Options from '../Templates/Options'
export const publicRoutes=[
    {
    path:"/",
    element:<Login/>
    },
    {
    path:"/*",
    element:<Login/>
    }
]
export const privateRoutes=[
    {
        path:"/profile",
        element:<Profile/>
    },
    {
        path:"/otp",
        element:<Otp/>
    },
    {
        path:"/form",
        element:<Form/>
    },
    {
        path:"/template1",
        element:<Template1/>
    },
    {
        path:"/template2",
        element:<Template2/>
    },
    {
        path:"/template3",
        element:<Template3/>
    },
    {
        path:"/options",
        element:<Options/>
    }
]