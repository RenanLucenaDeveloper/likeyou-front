import React from 'react'
import { Outlet } from "react-router";
import Toolbar from '../shared/Toolbar'

const ToolbarRoutes = () => {
  return (
    <>
        <Outlet />
        <Toolbar />
    </>
  )
}

export default ToolbarRoutes
