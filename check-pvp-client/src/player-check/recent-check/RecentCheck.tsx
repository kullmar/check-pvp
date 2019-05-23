import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex } from "../../common/styled-components";
import { SearchHistory } from "../../../../check-pvp-common/models";

const Header = styled.h2``;

const Table = styled.table`
  width: 100%;
`;

const PlayerRow = styled.tr`
  background-color: #201E21;
  height: 50px;
`;

const RecentCheck: React.FunctionComponent<{}> = props => {
  const [recentChecks, setRecentChecks] = useState<SearchHistory[]>([]);

  useEffect(() => {
    const sseSource = new EventSource('/api/recent-check-stream');
    sseSource.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (Array.isArray(data)) {
        setRecentChecks(data);
      }
      else {
        setRecentChecks(r => [...r, data]);
      }
    };
  
    return () => sseSource.close();
  }, []);

  console.log(recentChecks);

  const rows = recentChecks.map((player: SearchHistory, index: number) => (
    <PlayerRow key={index}>
      <td>{player.id}</td>
      <td>{Date.now() - player.timestamp}</td>
      <td>{player.maxRating}</td>
    </PlayerRow>
  ));

  return (
    <Flex column alignCenter>
      <Header>Recent Checks</Header>
      <Table>
        <thead>
          <tr>
            <th>Name-Realm</th>
            <th>Date</th>
            <th>Max Arena</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </Flex>
  );
};

export default RecentCheck;
