import { createBrowserRouter } from "react-router-dom";
import { Root } from './root.jsx'
import { Recientes } from './componentes/recientes.jsx'
import { Buscador } from './componentes/buscador.jsx'




const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
            path: "/",
            element: <Recientes />
        },
        {
            path: "/finder",
            element: <Buscador />
        },
      ]
    }    
  ]);


export default router;