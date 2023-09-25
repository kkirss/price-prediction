import { type Component } from 'solid-js'
import { Box, Typography } from '@suid/material'
import { type SxProps } from '@suid/system'

export const AssetPriceDisplay: Component<{
  assetName: string
  price: number
  currencySymbol: string
  sx?: SxProps
}> = (props) => (
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...props.sx
  }}
  >
    <Typography variant='h4'>{props.assetName}</Typography>
    <Box>
      <Typography variant='h1' as='span'>
        {props.price}
      </Typography>
      <Typography variant='h5' as='span'>
        {props.currencySymbol}
      </Typography>
    </Box>
  </Box>
)
