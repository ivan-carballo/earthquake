import { createBrowserRouter } from "react-router-dom";
import { Root } from './root.jsx'
import { Recientes } from './componentes/recientes.jsx'
import { Buscador } from './componentes/buscador.jsx'
import { Simulador } from './componentes/simulador.jsx'
import { Aviso } from "./componentes/aviso.jsx";




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
        {
          path: "/simulator",
          element: <Simulador />
        },
        {
          path: "/aviso",
          element: <Aviso />
        }
      ]
    }    
  ]);


export default router;