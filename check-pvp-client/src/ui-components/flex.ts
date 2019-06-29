import styled from 'styled-components';

export interface FlexProps {
    backgroundColor?: string;
    height?: string;
    width?: string;
    margin?: string;
    padding?: string;
    position?: string;

    wrapReverse?: boolean;
    noWrap?: boolean;
    flex?: number;

    justifyContent?: string;
    justifyCenter?: boolean;
    justifyAround?: boolean;
    justifyBetween?: boolean;
    justifyEnd?: boolean;

    alignItems?: string;
    alignStretch?: boolean;
    alignEnd?: boolean;
    alignCenter?: boolean;
    alignBaseline?: boolean;

    alignContent?: string;
    contentStart?: boolean;
    contentEnd?: boolean;
    contentCenter?: boolean;
    contentBetween?: boolean;
    contentAround?: boolean;

    column?: boolean;
};

export const Flex = styled.div<FlexProps>`
    background-color: ${props => (props.backgroundColor ? props.backgroundColor : 'initial')};
    height: ${props => (props.height? props.height : 'auto')};
    width: ${props => (props.width? props.width : 'auto')};
    margin: ${props => (props.margin? props.margin: '0')};
    padding: ${props => (props.padding? props.padding: '0')};
    display: flex;
    position: ${props => (props.position ? props.position : 'static')};

    flex-wrap: ${props => {
        if (props.wrapReverse) return 'wrap-reverse'
        else if (props.noWrap) return 'nowrap'
        return 'wrap'
    }};
    flex: ${props => (props.flex? props.flex : 'none')};
    justify-content: ${props => {
        if (props.justifyContent) return props.justifyContent
        if (props.justifyCenter) return 'center'
        else if (props.justifyAround) return 'space-around'
        else if (props.justifyBetween) return 'space-between'
        else if (props.justifyEnd) return 'flex-end'
        return 'flex-start'
    }};
    align-items: ${props => {
        if (props.alignItems) return props.alignItems
        else if (props.alignStretch) return 'stretch'
        else if (props.alignEnd) return 'flex-end'
        if (props.alignCenter) return 'center'
        else if (props.alignBaseline) return 'baseline'
        return 'flex-start'
    }};
    align-content: ${props => {
        if (props.alignContent) return props.alignContent
        else if (props.contentStart) return 'flex-start'
        else if (props.contentEnd) return 'flex-end'
        else if (props.contentCenter) return 'center'
        else if (props.contentBetween) return 'space-between'
        else if (props.contentAround) return 'contentAround'
        return 'stretch'
    }};
    flex-direction: ${props => (props.column ? 'column' : 'row')};
`;