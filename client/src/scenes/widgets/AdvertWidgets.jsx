import { Typography, useTheme } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import WidgetWrapper from 'components/WidgetWrapper'
import { server } from 'constants'

const AdvertWidget = () => {
    const { palette } = useTheme()
    const dark = palette.neutral.dark
    const main = palette.neutral.main
    const medium = palette.neutral.medium

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant='h5' fontWeight='500'>
                    Sponsored
                </Typography>
                <Typography color={medium}>Create Add</Typography>
            </FlexBetween>
            <img 
                width='100%'
                height='auto'
                alt='advert'
                src={`${server}/assets/air.jpg`}
                style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
            />
            <FlexBetween>
                <Typography color={main}>Mugizi Air</Typography>
                <Typography color={medium}>mugiziair.com</Typography>
            </FlexBetween>
            <Typography color={medium} margin='0.5rem 0'>
                Luxurious and cheapest air travel services globally
            </Typography>
        </WidgetWrapper>
    )
}

export default AdvertWidget