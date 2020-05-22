import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
`;

export default function Logo({ height }: { height: number }) {
    const baseHeight = 342;
    const baseWidth = 266;

    const width = (height * baseWidth) / baseHeight;

    return (
        // <LogoContainer>
        <svg
            width={width}
            height={height}
            viewBox="0 0 266 342"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                display: 'inline-block',
                verticalAlign: 'bottom',
                height: '100%',
            }}
        >
            <rect width="266" rx="30" height="342" fill="var(--logo-background-color)" />
            <rect x="29" y="30" width="24" height="21" fill="var(--primary-color)" />
            <rect x="63" y="30" width="62" height="21" fill="var(--primary-color)" />
            <rect x="29" y="75" width="52" height="21" fill="var(--primary-color)" />
            <rect x="91" y="75" width="69" height="21" fill="var(--primary-color)" />
            <rect x="58" y="147" width="87" height="21" fill="var(--primary-color)" />
            <rect x="58" y="111" width="41" height="21" fill="var(--primary-color)" />
            <rect x="110" y="111" width="106" height="21" fill="var(--primary-color)" />
            <rect x="58" y="183" width="41" height="21" fill="var(--primary-color)" />
            <rect x="110" y="183" width="41" height="21" fill="var(--primary-color)" />
            <rect x="160" y="183" width="41" height="21" fill="var(--primary-color)" />
            <rect x="88" y="219" width="89" height="21" fill="var(--primary-color)" />
            <rect x="187" y="219" width="50" height="21" fill="var(--primary-color)" />
            <rect x="58" y="255" width="119" height="21" fill="var(--primary-color)" />
            <rect x="29" y="291" width="39" height="21" fill="var(--primary-color)" />
            <rect x="78" y="291" width="109" height="21" fill="var(--primary-color)" />
        </svg>
        // </LogoContainer>
    );
}
