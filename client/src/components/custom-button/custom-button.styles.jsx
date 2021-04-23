import { makeStyles } from "@material-ui/core/styles";
import globalcss from "../../global-css/styled-component-variable";
export const RedButtonStyles = makeStyles({
  root: {
    color: "red",
  },
  label: {
    color: globalcss.primary,
  },
});
