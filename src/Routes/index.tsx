import React from 'react'
import {
  BrowserRouter,
  Routes as Switch,
  Route,
} from "react-router-dom";
import { Structure } from '../Components';
import { PAGE } from '../constants'
import { Characters } from '../Pages'

export const Routes = () => (
  <BrowserRouter>
    <Structure>
      <Switch>
        <Route path='*' element={<Characters/>}/>
        <Route path={PAGE.CHARACTERS()} element={<Characters/>}/>
      </Switch>
    </Structure>
  </BrowserRouter>
)

export default Routes