import { MuiThemeProvider } from "@material-ui/core/styles";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import React from "react";
import Store from "./Services/Store";
import "./Styles/App.css";
import "./Styles/Material.css";
import "./Styles/PageCustomize.css";

import { IconButton } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import Routes from "./Routes/Routes";
import theme from "./Theme/MuiTheme";

const App: React.FC = () => {
  const notistackRef = React.createRef<SnackbarProvider>();
  const onClickDismiss = (key: React.ReactText) => () => {
    if (notistackRef.current) {
      notistackRef.current.closeSnackbar(key);
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={Store}>
        <SnackbarProvider
          maxSnack={5}
          autoHideDuration={null}
          ref={notistackRef}
          hideIconVariant
          dense
          action={(event: React.ReactText) => (
            <IconButton
              style={{ backgroundColor: "rgba(255,255,255,.8)" }}
              size="small"
              onClick={onClickDismiss(event)}
            >
              <CloseRoundedIcon color="error" />
            </IconButton>
          )}
        >
          <Routes />
        </SnackbarProvider>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
