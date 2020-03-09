const ThemeDark = {
    palette: {
        primary: {
            main: "#304ffe"
        },
        secondary: {
            main: "#ffd600",
            light: "#76ff03"
        },
        type: "dark",
        typography: {
            useNextVariants: true
        }
    },
    spreadit: {
        "@global": {
            "*::-webkit-scrollbar": {
                width: "0.4em"
            },
            "*::-webkit-scrollbar-track": {
                "-webkit-box-shadow": "inset 0 0 6px rgba(255,255,255,0.10)"
            },
            "*::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(255,255,255,0.20)",
                outline: "1px solid slategrey"
            }
        },

        //Profile Fragment
        editProfileButton: {
            float: "right"
        },

        //Login and Signup
        login_signup: {
            form: {
                textAlign: "center"
            },

            image: {
                maxWidth: 50
            },

            pageTitle: {
                margin: "0px auto 20px auto"
            },

            textField: {
                margin: "20px auto 20px auto"
            },
            button: {
                margin: "50px auto 20px auto",
                width: "100%",

                position: "relative"
            },
            customError: {
                color: "red",
                fontSize: "0.8rem",
                marginTop: "10px"
            },

            progress: {
                position: "absolute"
            }
        },
        //Scream
        card: {
            display: "flex",
            margin: "15px 5px 32px 5px",
            width: "100%",
            boxShadow:
                "0px 5px 5px -3px rgba(48,79,254,0.2), 0px 8px 10px 1px rgba(48,79,254,0.14), 0px 3px 14px 2px rgba(48,79,254,0.45)"
        },

        image: {
            width: "65px",
            height: "65px"
        },

        content: {
            padding: "20px",
            objectFit: "cover",
            width: "100%"
        },
        title: {
            display: "flex",
            marginBottom: "15px"
        },

        titleContent: {
            margin: "auto 4px auto 15px"
        },

        titleDate: {
            margin: "auto 0px",
            color: "#76ff03"
        },
        square: {
            color: "#ede7f6",
            backgroundColor: "#304ffe",
            width: "100%",

            height: 500
        },

        mainContent: {
            margin: "12px 12px"
        },

        progressSpinner: {
            position: "absolute"
        }
    }
};

export default ThemeDark;
