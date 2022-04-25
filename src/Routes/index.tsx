import React from 'react'
import {
  BrowserRouter,
  Routes as Switch,
  Route,
} from "react-router-dom";
import { PAGE } from '../constants'
import { Characters } from '../Pages'

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path={PAGE.CHARACTERS()} element={<Characters/>}/>
    </Switch>
  </BrowserRouter>
)

export default Routes