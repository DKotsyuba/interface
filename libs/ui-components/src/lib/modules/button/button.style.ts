import { css } from 'lit';

export const buttonStyle = css`
    
    :host {
        display: block;
    }

    button {
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border: 1px solid var(--button-border-color, none);
        background-color: var(--button-background-color);
        color: var(--button-text-color-ext, var(--button-text-color, var(--color-core-white)));
        box-sizing: border-box;
        transition: background-color .2s, box-shadow .2s, color .2s, transform .1s;
        outline: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        will-change: background-color, color, box-shadow, transform;
    }
    
    button.full-size {
        width: 100%;
    }
    
    @media (hover: hover) {
        button:enabled:hover {
            background-color: var(--button-background-color-hover);
            color: var(--button-text-color-ext-hover, var(--button-text-color-hover, var(--button-text-color)));
        }
    }
    
    button:enabled:active, button:enabled:focus-visible {
        transform: scale(0.98);
        box-shadow: 0 0 0 2px var(--button-box-shadow-color-active);
    }
    
    .active-box-shadow-inset:enabled:active, .active-box-shadow-inset:enabled:focus-visible {
        box-shadow: inset 0 0 0 2px var(--button-box-shadow-color-active);
    }

    button:disabled {
        cursor: not-allowed;
    }
`

export const buttonSizeStyle = css`
    
    button {
        border-radius: var(--border-radius);
    }

    .xs {
        padding: 0 2px;
        --border-radius: 4px;
        font-size: 12px;
    }
    
    .m {
        padding: 6px 12px;
        --border-radius: 8px;
        font-size: 14px;
    }

    .l {
        padding: 8px 16px;
        --border-radius: 12px;
        font-size: 14px;
    }

    .xl {
        padding: 12px 24px;
        --border-radius: 16px;
        font-size: 16px;
    }

    .xxl {
        padding: 16px 24px;
        --border-radius: 16px;
        font-size: 20px;
    }

    .m.only-icon {
        padding: 0;
    }

    .l.only-icon {
        padding: 6px;
    }

    .xl.only-icon {
        padding: 12px;
    }

    .xxl.only-icon {
        padding: 18px;
    }

`

export const buttonTypeStyle = css`

    .primary {
        --button-background-color: var(--primary);
        --button-background-color-hover: var(--primary-hover);
        --button-box-shadow-color-active: var(--secondary);
        --button-text-color: var(--color-core-white);
        --loader-color: var(--primary-hover);
    }
    
    .primary-critical {
        --button-background-color: var(--color-core-red-critical);
        --button-background-color-hover: var(--color-core-red-critical-hover);
        --button-box-shadow-color-active: var(--color-background-bg-critical);
        --button-text-color: var(--color-core-white);
    }
    
    .primary-warning {
        --button-background-color: var(--color-core-orange-warning);
        --button-background-color-hover: var(--color-core-orange-warning-hover);
        --button-box-shadow-color-active: var(--color-background-bg-warning);
        --button-text-color: var(--color-core-white);
    }

    .primary-gray {
        --button-background-color: var(--color-background-bg-primary);
        --button-background-color-hover: var(--color-background-bg-secondary);
        --button-box-shadow-color-active: var(--color-background-bg-secondary);
        --button-text-color: var(--color-content-content-primary);
    }
    
    .secondary {
        --button-background-color: var(--secondary);
        --button-background-color-hover: var(--secondary-hover);
        --button-box-shadow-color-active: var(--secondary-hover);
        --button-text-color: var(--primary);
        --button-text-color-hover: var(--primary-hover);
    }
    
    .secondary-critical {
        --button-background-color: var(--color-background-bg-critical);
        --button-background-color-hover: var(--color-background-bg-critical-hover);
        --button-box-shadow-color-active: var(--color-background-bg-critical-hover);
        --button-text-color: var(--color-core-red-critical-hover);
    }
    
    .secondary-warning {
        --button-background-color: var(--color-background-bg-warning);
        --button-background-color-hover: var(--color-background-bg-warning-hover);
        --button-box-shadow-color-active: var(--color-background-bg-warning-hover);
        --button-text-color: var(--color-core-orange-warning);
    }
    
    .secondary-gray {
        --button-background-color: transparent;
        --button-border-color: var(--color-border-border-tertiary);
        --button-background-color-hover: var(--color-background-bg-secondary);
        --button-box-shadow-color-active: var(--secondary);
        --button-text-color: var(--color-content-content-primary);
        --button-text-color-hover: var(--color-content-content-secondary);
        --button-background-color-disabled: transparent;
        --button-border-color-disabled: var(--color-background-bg-disabled)
    }
    
    .tertiary {
        --button-background-color: transparent;
        --button-background-color-hover: var(--secondary);
        --button-text-color: var(--primary);
    }
    
    .tertiary-gray {
        --button-background-color: transparent;
        --button-background-color-hover: var(--color-background-bg-secondary);
        --button-text-color: var(--color-content-content-primary);
        --button-text-color-hover: var(--color-content-content-secondary);
    }
    
    button:disabled {
        background-color: var(--button-background-color-disabled, var(--color-background-bg-disabled));
        color: var(--color-content-content-disabled);
        border: 1px solid var(--button-border-color-disabled, none);
    }
`

export const buttonLoaderStyle = css`

    button.loader {
        position: relative;
        --loader-border-size: 2px;
    }

    button.loader:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: var(--border-radius);
        border: var(--loader-border-size) solid var(--loader-color, var(--button-box-shadow-color-active));
        animation: loader 3s linear infinite;
    }

    @keyframes loader {
        0% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 5%, 0% 5%);
        }
        10% {
            clip-path: polygon(50% 0%, 100% 0%, 100% 50%, 50% 5%);
        }
        20% {
            clip-path: polygon(95% 0%, 100% 0%, 100% 100%, 95% 100%);
        }
        40% {
            clip-path: polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%);
        }
        50% {
            clip-path: polygon(0% 95%, 100% 95%, 100% 100%, 0% 100%);
        }
        70% {
            clip-path: polygon(0% 50%, 50% 50%, 50% 100%, 0% 100%);
        }
        80% {
            clip-path: polygon(0% 0%, 5% 0%, 5% 100%, 0% 100%);
        }
        90% {
            clip-path: polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%);
        }
        100% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 5%, 0% 5%);
        }

`
