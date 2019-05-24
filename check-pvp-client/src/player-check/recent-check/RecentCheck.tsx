import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import _ from 'lodash';
import { Flex } from '../../common/styled-components';
import { SearchHistory } from '../../../../check-pvp-common/models';
import { useInterval } from '../../common/util';

const Header = styled.h2``;

const Table = styled.table`
    width: 100%;
`;

const PlayerRow = styled.tr`
    background-color: #201e21;
    height: 50px;
`;

const RecentCheck: React.FunctionComponent<{}> = props => {
    const [recentChecks, setRecentChecks] = useState<SearchHistory[]>([]);
    const [timeDiffs, setTimeDiffs] = useState<string[]>([]);

    useInterval(() => {
        const diffs = recentChecks.map(sh => moment(sh.timestamp).fromNow());
        setTimeDiffs(diffs);
    }, 1000);

    useEffect(() => {
        const sseSource = new EventSource('/api/recent-check-stream');
        sseSource.addEventListener('initial', (message: any) => {
            const data = JSON.parse(message.data);
            setRecentChecks(data);
        });
        sseSource.addEventListener('new', (message: any) => {
            const data = JSON.parse(message.data);
            setRecentChecks(r => [...r, data]);
        });
        sseSource.addEventListener('update', (message: any) => {
            const data: { index: number, timestamp: number } = JSON.parse(message.data);
            setRecentChecks(r => {
                const copy: SearchHistory[] = [...r];
                const pulled = _.pullAt(copy, data.index);
                copy.unshift({...pulled[0], timestamp: data.timestamp});
                return copy;
            });
        });

        return () => {
            sseSource.close();
        };
    }, []);

    const rows = recentChecks.map((player: SearchHistory, index: number) => {
        return (
            <PlayerRow key={index}>
                <td>{player.id}</td>
                <td>{timeDiffs[index]}</td>
                <td>{player.maxRating}</td>
            </PlayerRow>
        );
    });

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
                <tbody>{rows}</tbody>
            </Table>
        </Flex>
    );
};

export default RecentCheck;
