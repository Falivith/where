import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Map from './pages/Map.tsx';
import Warning from './pages/Warning.tsx';
import Date from './pages/Date.tsx';
import Events from './pages/Events.tsx';
import EventVision from './pages/EventVision.tsx';
import EventForm from './pages/eventForm.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/map",
    element: <Map/>
  },
  {
    path: "/warning",
    element: <Warning title={"Deseja se tornar promoter?"}/>
  },
  {
    path: "/date",
    element: <Date title={"Quanto tempo antes gostaria de definir o lembrete?"}/>
  },
  {
    path: "/user",
    element: <Warning title={"Deseja se tornar usuario?"}/>
  }
  ,
  {
    path: "/events",
    element: <Events/>
  },
  {
    path: "/evento/:index",
    element: <EventVision/>
  },
  {
    path: "/eventoForm/",
    element: <EventForm/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router = {router}/> 
  </React.StrictMode>,
)
