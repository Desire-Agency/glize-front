import styled from "styled-components";
import { Flex } from "../Box";
import SocialLinks from "./Components/SocialLinks";

export const StyledFooter = styled(Flex)`
  padding: 20px 16px;
`;

export const StyledSocialLinks = styled(SocialLinks)`
  padding: 9px 20px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 50px;
`;
