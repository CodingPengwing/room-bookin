/* eslint-disable */
// material-ui
import * as Theme from "@mui/material/styles";

// project import
import { CustomShadowProps } from "@/components/types/theme";

declare module "@mui/material/styles" {
  interface Theme {
    customShadows: CustomShadowProps;
  }
}
