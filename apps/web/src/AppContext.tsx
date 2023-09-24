import { ParentComponent } from 'solid-js'
import { Router } from '@solidjs/router'
import { CssBaseline } from '@suid/material'
import { ServiceRegistry } from 'solid-services'

import { ThemeProvider } from '@price-prediction/ui-theme'

const AppContext: ParentComponent = (props) => (
  <Router base={import.meta.env.BASE_URL}>
    <ServiceRegistry>
      <ThemeProvider>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ServiceRegistry>
  </Router>
)

export default AppContext
