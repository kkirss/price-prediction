import { type Component, type ComponentProps } from 'solid-js'
import { Box, Button } from '@suid/material'
import { type SxProps } from '@suid/system'
import { ArrowUpward, ArrowDownward } from '@suid/icons-material'

export const UpDownButtons: Component<{
  onUpClick: ComponentProps<typeof Button>['onClick']
  onDownClick: ComponentProps<typeof Button>['onClick']
  disabled?: boolean
  sx?: SxProps
}> = (props) => (
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    ...props.sx
  }}
  >
    <Button
      sx={{ flexGrow: 1 }}
      color='success'
      variant='contained'
      aria-label='Upward arrow'
      onClick={props.onUpClick}
      disabled={props.disabled ?? false}
    >
      <ArrowUpward />
    </Button>
    <Button
      sx={{ flexGrow: 1 }}
      color='error'
      variant='contained'
      aria-label='Downward arrow'
      onClick={props.onDownClick}
      disabled={props.disabled ?? false}
    >
      <ArrowDownward />
    </Button>
  </Box>
)
