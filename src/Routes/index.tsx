import React from 'react'
import {
  BrowserRouter,
  Routes as Switch,
  Route,
} from "react-router-dom";
import { Structure } from '../Components';
import { PAGE } from '../constants'
import { Characters, Register, CharacterInfos } from '../Pages'

export const Routes = () => (
  <BrowserRouter>
    <Structure>
      <Switch>
        <Route path='*' element={<Characters/>}/>
        <Route path={PAGE.CHARACTERS()} element={<Characters/>}/>
        <Route path={PAGE.REGISTER()} element={<Register/>}/>
        <Route path={PAGE.CHARACTERS_INFO(':name')} element={<CharacterInfos/>}/>
        <Route path={PAGE.FILMS_INFO(':name')} element={<div>asdoinasoidnioansdonas</div>}/>
      </Switch>
    </Structure>
  </BrowserRouter>
)

export default Routes