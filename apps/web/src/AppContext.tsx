import { ParentComponent } from 'solid-js'
import { Router } from '@solidjs/router'
import { CssBaseline } from '@suid/material'
import { ThemeProvider } from '@price-prediction/ui-theme'

const AppContext: ParentComponent = (props) => (
  <Router base={import.meta.env.BASE_URL}>
    <ThemeProvider>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  </Router>
)

export default AppContext
