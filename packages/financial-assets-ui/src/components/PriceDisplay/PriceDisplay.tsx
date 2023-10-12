import { type Component } from 'solid-js'
import { Box, Typography } from '@suid/material'
import { type SxProps, type SystemProps } from '@suid/system'

export const PriceDisplay: Component<{
  price: number
  currencySymbol: string
  muted?: boolean
  textColor?: SystemProps['color']
  priceDecimalPlaces?: number
  sx?: SxProps
}> = (props) => {
  const priceDecimal = (): string =>
    props.price.toFixed(props.priceDecimalPlaces ?? 2)
  const sx = (): SxProps => ({
    ...((props.muted ?? false) ? { opacity: 0.5 } : {}),
    ...props.sx
  })
  return (
    <Box sx={sx()}>
      <Typography variant='h1' as='span' color={props.textColor}>
        {priceDecimal()}
      </Typography>
      <Typography variant='h5' as='span' color={props.textColor}>
        {props.currencySymbol}
      </Typography>
    </Box>
  )
}
