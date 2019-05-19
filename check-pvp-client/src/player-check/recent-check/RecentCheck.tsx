import React, { SFC } from "react";
import styled from "styled-components";
import { Flex } from "../../common/styled-components";

const Header = styled.h2``;

const Table = styled.table`
  width: 100%;
`;

const PlayerRow = styled.tr`
  background-color: #201E21;
  height: 50px;
`;

const mockData: any = [
  { id: '1', name: 'Mosatramparen-Finreaver', date: '20s', maxRating: '2624' },
  { id: '2', name: 'Tölöriddaren-Finreaver', date: '20s', maxRating: '2624' },
  { id: '3', name: 'Nuarikukkoxx-Finreaver', date: '20s', maxRating: '2624' },
]

const RecentCheck: SFC<{}> = props => {
  const rows = mockData.map((player: any, index: number) => (
    <PlayerRow key={index}>
      <td>{player.name}</td>
      <td>{player.date}</td>
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
