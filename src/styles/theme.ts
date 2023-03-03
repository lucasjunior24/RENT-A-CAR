export default {
    colors: {
        header: '#1B1B1F',
    
        background_primary: '#FAF5F6',
        background_secondary: '#FFF',
    
        text: '#7A7A80',
        text_detail: '#AEAEB3',
        title: '#47474D',
    
        line: '#EB3BF0',
    
        main: '#DC1637',
        main_light: '#FDEDEF',
        sucess: '#03B252',
    
        shape: '#E1E1E8',
        shape_dark: '#29292E'
    },

    fonts: {
        primary_400: 'Inter_400Regular',
        primary_500: 'Inter_500Medium',

        secondary_400: 'Archivo_400Regular',
        secondary_500: 'Archivo_500Medium',
        secondary_600: 'Archivo_600SemiBold'
    }
}
interface ThemeType {
    colors: Colors
}
interface Colors {
    header: '#1B1B1F',

    background_primary: '#FAF5F6',
    background_secondary: '#FFF',

    text: '#7A7A80',
    text_detail: '#AEAEB3',
    title: '#47474D',

    line: '#EB3BF0',

    main: '#DC1637',
    main_light: '#FDEDEF',
    sucess: '#03B252',

    shape: '#E1E1E8',
    shape_dark: '#29292E'
}

interface ColorsType {
    header: string,

    background_primary: string,
    background_secondary: string,

    text: string,
    text_detail: string,
    title: string,

    line: string,

    main: string,
    main_light: string,
    sucess: string,

    shape: string,
    shape_dark: string
}