import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextLink, Grid } from '@ellucian/react-design-system/core';
import { IconSprite } from '@ellucian/ds-icons/lib';

const TrilistCard = (props)  => {
    const { cardInfo: { configuration: { customConfiguration } } } = props;
    const style = {
        // marginLeft: '5%'
        textAlign: 'center',
        img: {
            width: '59%'
        }
    }

    return (
        <div style={style}>
            <IconSprite></IconSprite>
            <pre>{JSON.stringify(customConfiguration, undefined, 2)}</pre>
        </div>
    )
}

TrilistCard.propTypes = {
    cardInfo: PropTypes.object
};

export default TrilistCard;