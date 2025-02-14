import { mobileMediaCSS } from '@one-inch-community/core/lit';
import { css } from 'lit';

export const fusionSwapInfoMainStyle = css`
    
    :host {
        --font-size: 16px;
    }
    
    .container {
        height: 56px;
        padding: 16px;
        box-sizing: border-box;
        transition: height .2s, background-color .2s;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: flex-start;
        justify-content: space-between;
        border-radius: 16px;
        color: var(--color-content-content-primary);
        cursor: pointer;
    }

    .open {
        height: 236px;
        grid-template-rows: min-content 1fr;
        grid-row-gap: 16px;
        cursor: auto;
    }

    .icon {
        transition: transform .2s;
        will-change: transform;
    }

    .open-icon {
        transform: rotate(180deg);
    }

    .fusion-info {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .fusion-icon {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--primary);
        text-align: right;
        font-size: var(--font-size);
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        transition: opacity .2s, transform .2s;
        will-change: opacity;
    }

    .fusion-icon-open {
        opacity: 0;
        transform: translate3d(20px, 0, 0);
    }

    .fusion-icon-open:dir(rtl) {
        transform: translate3d(-20px, 0, 0);
    }

    .rate-container {
        width: 100%;
        display: flex;
        align-content: flex-start;
    }

    .rate-view {
        font-size: var(--font-size);
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
    }

    .rate-view:dir(rtl) {
        direction: ltr;
    }

    .rate-loader {
        background-color: var(--color-background-bg-secondary);
        height: 24px;
        width: 50%;
        border-radius: 8px;
        will-change: filter;
        transition: background-color .2s;
        animation: stub-loader-animation 3s ease-in-out infinite;
    }

    @keyframes stub-loader-animation {
        0%, 100% {
            filter: opacity(1);
        }
        50% {
            filter: opacity(0.5);
        }
    }

    .dst-token-rate-usd-price {
        color: var(--color-content-content-secondary);
        font-size: var(--font-size);
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        margin-left: 4px;
    }
    
    .content-container {
        display: flex;
        grid-row-start: 2;
        grid-row-end: 3;
        height: 100%;
        grid-column-start: 1;
        grid-column-end: 3;
        flex-direction: column;
        visibility: hidden;
        transform: translate3d(0, -15px, 0);
        transition: transform .2s, opacity .2s;
    }
    
    .open .content-container {
        visibility: visible;
        transform: translate3d(0, 0, 0);
    }
    
    .content-row {
        height: 40px;
        padding: 8px 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .row-slippage {
        color: var(--primary);
        text-align: right;
        font-size: var(--font-size);
        font-style: normal;
        font-weight: 500;
        line-height: 24px;
        cursor: pointer;
        transition: color .2s;
    }
    
    .row-title {
        color: var(--color-content-content-secondary);
        font-size: var(--font-size);
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
    }
    
    .row-content {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--primary);
        text-align: right;
        font-size: var(--font-size);
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        transition: opacity .2s, transform .2s;
        will-change: opacity;
    }
    
    .min-receive {
        color: var(--color-content-content-primary);
    }

    @media (hover: hover) {
        .container:not(.open):hover {
            background-color: var(--color-background-bg-secondary);
        }

        .container:not(.open):hover .rate-loader {
            background-color: var(--color-background-bg-positive-hover);
        }
        
        .row-slippage:hover {
            color: var(--primary-hover);
        }
    }
    
    ${mobileMediaCSS(css`
        :host {
            --font-size: 13px
        }
        
        .container {
            padding: 16px 8px;
        }
        
        .open {
            grid-row-gap: 0;
            height: 180px;
        }

        .content-row {
            height: 30px;
        }
    `)}
`
