import React, { SFC } from "react";
import styled from "styled-components";
import { Flex } from "../../styled-components";

const Header = styled.h2``;
const RightAligned = styled.div`
    margin-left: auto;
`;

const RecentCheck: SFC<{}> = props => {
  return (
    <Flex column alignCenter>
      <h2>Recent Checks</h2>
        <Flex justifyContent="flex-start" width="100%">
            Name-Realm
            <RightAligned>
                Date
                Max Arena
            </RightAligned>
        </Flex>
    </Flex>
  );
};

export default RecentCheck;
