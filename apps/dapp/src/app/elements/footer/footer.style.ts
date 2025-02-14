import { css } from 'lit';

export const footerStyle = css`

    .footer-container {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        position: relative;
        border-top: 1px solid var(--color-border-border-tertiary);
        padding: 0 72px;
        background-color: var(--color-background-bg-body);
        gap: 8px;
        margin-top: 32px;
    }
    
    .mobile-footer {
        height: 72px;
        width: 100vw;
        position: sticky;
        padding: 16px 8px;
        bottom: 0;
        z-index: 9;
        justify-content: space-between;
    }
    
    .power-by {
        color: var(--color-content-content-secondary);
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
    }
    
    .version {
        color: var(--color-content-content-secondary);
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        transform: translateX(-100%);
        opacity: 0;
        transition: transform .2s, opacity .2s;
    }
    
    .version:dir(rtl) {
        transform: translateX(100%);
    }
    
    @media (hover: hover) {
        .footer-container:hover .version {
            transform: translateX(0);
            opacity: 1;
        }
    }

`
