import { ParentComponent } from 'solid-js'
import { Router } from '@solidjs/router'
import { CssBaseline } from '@suid/material'

const AppContext: ParentComponent = (props) => (
  <Router base={import.meta.env.BASE_URL}>
    <CssBaseline />
    {props.children}
  </Router>
)

export default AppContext
