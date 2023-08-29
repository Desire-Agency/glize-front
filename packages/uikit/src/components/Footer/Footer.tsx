import React from "react";
import {
  StyledFooter,
  StyledSocialLinks,
} from "./styles";
import { FooterProps } from "./types";

const MenuItem: React.FC<React.PropsWithChildren<FooterProps>> = ({ ...props }) => (
  <StyledFooter {...props} >
    <StyledSocialLinks />
  </StyledFooter>
);


export default MenuItem;
