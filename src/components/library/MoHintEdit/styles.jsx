const styles = (theme) => ({
	container: {
		marginTop: theme.space?.md,
	},
	text: {
		...theme.editorFont,
		color: theme.palette.primary.main,
		textDecoration: "none",
		marginBottom: theme.space?.md,
		width: "100%",
		border: "none",
		outline: "none",
	},
});

export default styles;