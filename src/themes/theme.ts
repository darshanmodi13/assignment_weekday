import { createTheme } from '@mui/material/styles';

// Define your custom colors
const customColors = {
	primary: {
		main: '#000000',
		light: '#8B8B8B',
	},
	secondary: {
		main: '#55FEC4',
		light: '#D9FED3',
	},
};

// Create a custom theme
const theme = createTheme({
	palette: {
		primary: customColors.primary,
		secondary: customColors.secondary,
	},
	typography: {
		fontFamily: `"Montserrat", "sans-serif"`,
	},
});

export default theme;
