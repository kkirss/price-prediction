import { type Component } from 'solid-js'
import { Box, Typography } from '@suid/material'
import { type SxProps } from '@suid/system'

export const AssetPriceDisplay: Component<{
  assetName: string
  price: number
  currencySymbol: string
  muted?: boolean
  priceDecimalPlaces?: number
  sx?: SxProps
}> = (props) => {
  const priceDecimal = (): string =>
    props.price.toFixed(props.priceDecimalPlaces ?? 2)
  const priceBoxSx = (): SxProps => (
    (props.muted ?? false)
      ? { opacity: 0.5 }
      : {})
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      ...props.sx
    }}
    >
      <Typography variant='h4'>
        {props.assetName}
      </Typography>
      <Box sx={priceBoxSx()}>
        <Typography variant='h1' as='span'>
          {priceDecimal()}
        </Typography>
        <Typography variant='h5' as='span'>
          {props.currencySymbol}
        </Typography>
      </Box>
    </Box>
  )
}
