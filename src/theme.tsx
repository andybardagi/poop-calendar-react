import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
    colors: {
        primary: {
            dark: '#6d421f',
            darker: '#0d0b04',
            light: '#FFFBD6',
            semidark: '#CC978E',
        },
        bruise: '#744253',
        error: {
            light: '#FE8E86',
            main: '#fe5f55ff',
            dark: '#650701',
        },
    },

    fonts: {
        heading: 'Poor Story',
        body: 'Source Sans Pro',
    },

    components: {
        Button: {
            variants: {
                base: {
                    fontFamily: 'Source Sans Pro',
                    fontWeight: 300,
                    background: 'primary.darker',
                    backgroundColor: 'primary.darker',
                    color: 'white',
                    _hover: {
                        background: 'primary.semidark',
                        backgroundColor: 'primary.semidark',
                        color: '#000000',
                    },
                },
                outline: {
                    borderColor: 'primary.dark',
                },
                'outline-red': {
                    border: '2px',
                    borderColor: 'error.light',
                    color: 'error.main',
                },
                'outline-blue': {
                    border: '2px',
                    borderColor: 'primary.dark',
                    background: 'white',
                    backgroundColor: 'white',
                    fontWeight: 'bold',
                    color: 'primary.dark',
                },
            },
            defaultProps: {
                variant: 'base',
            },
        },
    },
});
