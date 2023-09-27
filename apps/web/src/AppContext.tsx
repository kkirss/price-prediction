import { ParentComponent } from 'solid-js'
import { Router } from '@solidjs/router'
import { CssBaseline } from '@suid/material'
import { ServiceRegistry } from 'solid-services'
import { QueryClientProvider } from '@tanstack/solid-query'

import { ThemeProvider } from '@price-prediction/ui-theme'

import { queryClient } from '~/queryClient'

const AppContext: ParentComponent = (props) => (
  <Router base={import.meta.env.BASE_URL}>
    <QueryClientProvider client={queryClient}>
      <ServiceRegistry>
        <ThemeProvider>
          <CssBaseline />
          {props.children}
        </ThemeProvider>
      </ServiceRegistry>
    </QueryClientProvider>
  </Router>
)

export default AppContext
