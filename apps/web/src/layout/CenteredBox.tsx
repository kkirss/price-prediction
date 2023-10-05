import { type ParentComponent } from 'solid-js'
import { Box } from '@suid/material'
import { type SxProps } from '@suid/system'

export const CenteredBox: ParentComponent<{
  removeTopMargin?: boolean
  sx?: SxProps
}> = (props) =>
  <Box sx={{
    mt: (props.removeTopMargin ?? false) ? 0 : 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...props.sx
  }}
  >
    {props.children}
  </Box>
