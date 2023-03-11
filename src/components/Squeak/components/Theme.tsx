import { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import getBackgroundColor from '../util/getBackgroundColor'
import lightOrDark from '../util/lightOrDark'

const Style = createGlobalStyle`
:host {
    --primary-color: var(--squeak-primary-color, ${(props: any) =>
      props.dark ? '255, 255, 255' : '0, 0, 0'}); // rgb triplets, no hex
    --default-avatar-fill: var(--squeak-default-avatar-fill, ${(props) =>
      props.dark ? '0, 0, 0' : '255, 255, 255'}); // rgb triplets, no hex
    --button-color: var(--squeak-button-color, 29, 74, 255); // rgb triplet, no hex
    --button-weight: bold; // normal | bold | 600 | etc
    --border-radius: var(--squeak-border-radius, .25rem); // adjusts all radii
    --base-font-size: var(--squeak-base-font-size, 16px);
    --warning-color: var(--squeak-warning-color, #FFF7E9); // hex
    --thread-border-style: var(--squeak-thread-border-style, dashed); // css border style
    --input-text-color: var(--squeak-input-text-color, 0, 0, 0); // rgb triplet, no hex
    --input-background-color: var(--squeak-input-background-color, #fff); // transparent, hex, rgb, or rgba
    --link-text-decoration: none; // none | underline | dashed | etc
    --richtext-button-color: var(--squeak-richtext-button-color, 0, 0, 0); // rgb triplet, no hex
    all: initial;
    font-family: inherit;
}

.squeak {
    // font-family: -apple-system, BlinkMacSystemFont; // for dev use
    color: rgba(var(--primary-color), 1);
    font-size: var(--base-font-size);

    *:not(pre *) {
        box-sizing: border-box;
        font-family: var(--font-family);
    }

    code, pre {
        padding: 2px 3px;
        background: rgba(var(--primary-color),0.05);
        font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
        border-radius: 2px;
    }

    button {
        background: transparent;
        border: solid 1.5px rgba(var(--button-color), .85);
        border-radius: var(--border-radius);
        color: rgba(var(--button-color), .85);
        cursor: pointer;
        font-size: .933em;
        font-weight: var(--button-weight);
        padding: 0.6rem 1rem;

        &:hover {
            border: solid 1.5px rgba(var(--button-color), .9);
            color: rgba(var(--button-color), .9);
        }

        &:active {
            border: solid 1.5px rgba(var(--button-color), 1);
            color: rgba(var(--button-color), 1);
        }

        &[disabled] {
            background: transparent;
            border: solid 1.5px rgba(var(--primary-color), .5);
            color: rgba(var(--primary-color), 1);
            cursor: not-allowed;
        }
    }

    .squeak-authentication-form-container {
        margin-left: 50px;
        max-width: 600px;

        .squeak-authentication-form-message {
            background: var(--warning-color);
            border: 1px solid rgba(var(--primary-color), .2);
            color: #000;
            border-bottom: none;
            padding: 1rem;

            h4, p {
                margin: 0;
            }

            h4 {
                font-size: 1em;
                padding-bottom: .25em;
            }

            p {
                font-size: .875em;
            }
        }

        .squeak-authentication-form {
            border: 1px solid rgba(var(--primary-color), .2);
            border-top: none;
            border-radius: 0 0 var(--border-radius) var(--border-radius);
            overflow: hidden;
            position: relative;

            button {
                transition: color 0.2s;
                width: 100%;

                &.active {
                    color: rgba(var(--button-color), 1);
                }
            }

            input {
                border-radius: var(--border-radius);
                border: 1px solid rgba(var(--primary-color), .3);
                display: block;
                font-size: .875em;
                margin-bottom: 1.25rem;
                padding: 0.75rem 1rem;
                width: 100%;
            }

            label {
                display: block;
                font-size: .875em;
                font-weight: 600;
                margin-bottom: 0.5rem;
                opacity: 0.6;
            }

            .squeak-authentication-form-wrapper {
                padding: 1.5rem 1.5rem .5rem;
            }
        }
    }

    .squeak-authentication-form-name {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: 0.5rem;
    }

    .squeak-authentication-navigation {
        background: rgba(var(--primary-color),.03);
        border-top: 1px solid rgba(var(--primary-color),.1);
        border-bottom: 1px solid rgba(var(--primary-color),.1);
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        position: relative;

        button {
            font-size: .875em;
            border: none;
            border-bottom: solid 1px transparent;
            border-radius: 0;
            background: none;
            padding: .75rem .25rem calc(.75rem + 1px);

            &:not(.active) {
                color: rgba(var(--primary-color),.5);

                &:hover {
                    color: rgba(var(--primary-color),.6);
                    border-bottom: .5px solid rgba(var(--primary-color),.25);
                }
            }
        }
    }

    .squeak-authentication-navigation-rail {
        background: rgba(var(--button-color), 1);
        border-radius: var(--border-radius);
        bottom: -1px;
        height: 2px;
        left: 0;
        position: absolute;
        transition: all 0.2s;
        width: 50%;
    }

    .squeak-authentication-navigation-rail.sign-up {
        transform: translateX(100%);
    }

    .squeak-avatar-container {
        float: left;
        flex-shrink: 0;
        line-height: 0;
        margin-right: 10px;

        svg {
            background: rgba(var(--default-avatar-fill), 1);
        }
    }

    .squeak-avatar-container svg path:first-child {
        fill: rgba(var(--primary-color), .3);
    }

    .squeak-avatar-container img,
    .squeak-avatar-container svg {
        border-radius: 100px;
        height: 40px;
        width: 40px;
    }

    .squeak-replies .squeak-avatar-container img,
    .squeak-replies .squeak-avatar-container svg {
        border-radius: 100px;
        height: 25px;
        width: 25px;
    }

    .squeak-post-preview-container {
        align-items: center;
        border: 1px solid rgba(var(--primary-color), .3);
        border-radius: var(--border-radius) var(--border-radius) 0 0;
        border-bottom: none;
        display: flex;
        max-width: 600px;
        padding: .7rem 1rem;

        .squeak-post-preview {
            align-items: baseline;
            display: flex;
            flex: 1;
            min-width: 0;
            white-space: nowrap;
            overflow: hidden;
        }

        h3, p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        h3 {
            flex: 0 auto;
            font-size: 1em;
            font-weight: 700;
            margin: 0 .5em 0 0;
            flex-shrink: 0;
        }

        .squeak-post-markdown {
            flex: 1;
            font-size: .875em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            p {
                margin: 0;
            }

            img {
                max-width: 100%;
            }
        }

        .squeak-button-container {
            margin-left: .25em;
            white-space: nowrap;
        }

        button {
            border: 1px solid transparent;
            color: rgba(var(--button-color), 1);
            padding: 0;
            background: transparent;
        }
    }

    .squeak-replies,
    .squeak-questions {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .squeak-questions {
        margin-bottom: 1.5rem;

        > li {
            padding-bottom: 1rem;

            &:not(:first-child) {
                padding-top: 1em;
            }
        }

        .squeak-reply-buttons-row {
            margin-left: 35px;
        }
    }

    // affects questions
    .squeak-post {
        display: flex;
        flex-direction: column;

        // top-level questions
        .squeak-post-content {
            margin-left: 20px;
            border-left: 1px var(--thread-border-style) rgba(var(--primary-color), .4);
            padding-left: calc(25px + 5px);

            .squeak-subject {
                color: var(--primary-color);

                a {
                    color: var(--primary-color);
                    underline: none;
                }
            }
        }

        // replies to questions
        .squeak-replies {
            .squeak-post-content {
                padding-left: calc(25px + 10px);
            }
        }
    }

    .squeak-question-container {
        .squeak-authentication-form-container {
            margin-left: 35px;
        }
    }

    .squeak-post-author {
        align-items: center;
        display: flex;

        .squeak-avatar-container {
            margin-right: 10px;
        }

        > span:last-of-type {
            display: flex;
        }

        strong {
            font-weight: 600;
        }

        // add left margin to all elements that aren't the avatar
        span {
            margin-left: .5rem;
        }
    }

    button.squeak-reply-skeleton {
        background: transparent;
        border: solid 1.5px rgba(var(--primary-color), .3);
        padding: 15px;
        flex: 1;
        text-align: left;

        span {
            color: rgba(var(--primary-color), .6);

            strong {
                color: rgba(var(--primary-color), .65);
                font-weight: bold;
                text-decoration: underline;
            }
        }

        &:hover {
            border: solid 1.5px rgba(var(--primary-color), .5);

            span {
                color: rgba(var(--primary-color), .7);

                strong {
                    color: rgba(var(--primary-color), .75);
                }
            }
        }
    }

    button:hover .squeak-reply-skeleton strong {
        color: rgba(var(--primary-color), .9);
    }

    .squeak-post-timestamp {
        color: rgba(var(--primary-color), .6);
        font-size: .875em;

        a {
            color: inherit;
        }
    }

    .squeak-author-badge {
        border: 1px solid rgba(var(--primary-color), .3);
        border-radius: calc(var(--border-radius) * .75);
        color: rgba(var(--primary-color),0.6);
        font-size: .75em;
        padding: .2rem .3rem;
    }

    .squeak-post h3 {
        font-size: 1em;
        font-weight: 600;
        margin: 0;
        padding-bottom: .25rem;
        line-height: 1.25rem;
    }

    // replies styling only

    .squeak-replies {
        margin-left: 20px;

        > li {
            padding: 0 5px 0 calc(25px + 5px);
            position: relative;

            .squeak-avatar-container {
                margin-right: 8px;
            }

            .squeak-post {

            }

            .squeak-post-author {
                padding-bottom: .25rem;
            }

            .squeak-post-content {
                border-left: 0;
                margin-left: calc(25px + 8px); // avatar + avatar right margin
                padding-left: 0;
                padding-bottom: .25rem;
            }
        }

        // left border on replies
        &:not(.squeak-thread-resolved) > li {
            border-left: 1px var(--thread-border-style) rgba(var(--primary-color), .4);

            // don't show left border inside, since parent has border
            &:before {
                border-left: none;
            }
        }
    }

    // left border and curved line on replies
    .squeak-reply-form-container:before,
    .squeak-replies li:before {
        border-left: 1px var(--thread-border-style) rgba(var(--primary-color), .4);
        border-bottom: 1px var(--thread-border-style) rgba(var(--primary-color), .4);
        border-bottom-left-radius: 6px;
        content: '';
        height: 13px;
        left: 0;
        position: absolute;
        top: 0;
        width: 30px;
    }

    .squeak-replies.squeak-thread-resolved li:not(:last-child) {
        border-left: 1px var(--thread-border-style) rgba(var(--primary-color), .4);
    }

    // don't show left border inside, since parent has border
    .squeak-replies:not(.squeak-thread-resolved) li:before {
        border-left: none;
    }

    .squeak-replies.squeak-thread-resolved li:not(:last-child):before {
        border-left: none;
    }

    ul.squeak-thread-resolved {
        li:not(.squeak-solution) {
            > div:not(.squeak-other-replies-container) {
                opacity: .6;
            }
        }
    }

    .squeak-reply-unpublished {
        opacity: .5;
    }

    // post content defaults

    .squeak-post-markdown {
        font-size: .933em;
        line-height: 1.5;
        overflow-wrap: break-word;
        word-break: break-word;
        p {
            margin-top: 0;
        }

        ol, ul {
            padding-bottom: 1em;
        }

        a {
            color: rgba(var(--button-color), 1);
            text-decoration: var(--link-text-decoration);
        }

        pre {
            border-radius: var(--border-radius);
            font-size: .875em;
            margin: 0.75rem 0;
            max-height: 450px;
            overflow: scroll;
            padding: 1rem;
        }
    }

    .squeak-reply-form-container {
        margin-left: 20px;
        padding-right: 20px;
        padding-bottom: .25rem;
        padding-left: calc(25px + 8px);
        position: relative;
        width: 100%;

        .squeak-avatar-container {
            float: left; // has to float, not use flexbox, so we can truncate the preview text before authenticating
            margin-right: 10px;
            width: 25px;
        }

        .squeak-avatar-container {
            svg, img {
                height: 25px;
                width: 25px;
            }
        }

        > div:nth-of-type(2) {
            flex-grow: 1;
        }
    }

    .squeak-reply-buttons {
        display: flex;
        flex: 1;
    }

    .squeak-reply-buttons-row {
        display: flex;
        justify-content: space-between;
        margin-left: 50px;
    }

    .squeak-by-line {
        align-items: center;
        color: rgba(var(--primary-color), .5);
        display: flex;
        font-size: .813rem;

        a {
            color: rgba(var(--primary-color), .5);
            display: flex;
            margin-left: .2rem;

            &:hover {
                color: rgba(var(--primary-color), .6);
            }

            &:active {
                color: rgba(var(--primary-color), .55);
            }
        }

        svg {

            path {
                fill: currentColor;
            }
        }
    }

    .squeak-auth-button {
        border: solid 1.5px transparent;
        background: none;
        margin-left: auto;
        opacity: 0.85;

        &:hover {
            border: solid 1.5px transparent;
            opacity: 1;
        }
    }

    .squeak-markdown-logo {
        line-height: 0;
        margin: 0 .5rem 0 0;

        a {
            color: rgba(var(--primary-color), .3);

            &:hover {
                color: rgba(var(--primary-color), .4);
            }
        }
    }

    // applies to top-level question form only
    .squeak > .squeak-form-frame > .squeak-form {
        > .squeak-avatar-container {
            width: 40px;
        }
    }

    // UI elements

    .squeak-form-frame {
        flex: 1;
        margin-bottom: 1rem;
    }

    .squeak-inputs-wrapper {
        background: var(--input-background-color);
        border: 1px solid rgba(var(--primary-color), .3);
        border-radius: var(--border-radius);
        overflow: hidden;
        margin-bottom: 1rem;
        // don't apply width: 100%

        input[name="subject"] {
            font-weight: 700;
        }
    }

    hr {
        background: rgba(var(--input-text-color), .3);
        border: none;
        height: 1px;
        margin: 0;
    }

    input {
        background: var(--input-background-color);
        border: none;
        color: rgba(var(--input-text-color), 1);
        font-size: 1em;
        padding: 0.75rem 1rem;
        width: 100%;
    }

    textarea {
        background: var(--input-background-color);
        border: none;
        color: rgba(var(--input-text-color), 1);
        font-size: .875em;
        height: 150px;
        padding: 0.75rem 1rem;
        resize: none;
        width: 100%;
    }

    .squeak-form-richtext {
        line-height: 0;
    }

    .squeak-form-richtext-buttons-container {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 0.25rem 0;
    }

    .squeak-form-richtext-buttons {
        display: flex;
        align-items: center;
        list-style: none;
        padding: 0;
        margin: 0 0 0 0.5rem;

        button {
            align-items: center;
            background: none;
            border: none;
            border-radius: var(--border-radius);
            color: rgba(var(--richtext-button-color), .5);
            cursor: pointer;
            display: flex;
            height: 32px;
            justify-content: center;
            margin: 0 1px 0 0;
            opacity: 1;
            padding: 0;
            width: 32px;

            &:hover {
                background: rgba(var(--input-text-color), .15);
                color: rgba(var(--input-text-color), .75);
            }

            &:active {
                background: rgba(var(--input-text-color), .2);
                color: rgba(var(--input-text-color), 1);
            }
        }
    }

    .squeak-forgot-password {
        background: transparent;
        color: rgba(var(--primary-color), .3) !important;
        border-color: transparent;
        margin-top: 0.5rem;

        &:hover,
        &:active {
            border-color: transparent;
        }
    }

    .squeak-auth-error {
        background: var(--warning-color);
        margin: -1.5rem -1.5rem 1.5rem;
        padding: 1.5rem;
        color: red;
    }

    .squeak-return-to-post {
        background: none;
        border: none;
        color: rgba(var(--button-color), 1);
        cursor: pointer;
        font-size: inherit;
        font-weight: 600;
        padding: 0;
        width: auto !important;
    }

    .squeak-reply-action-buttons {
        display: flex;
        margin-bottom: 1rem;
        position: relative;
        top: -.5em;

        &:empty {
            display: none;
        }
    }

    .squeak-resolve-button, .squeak-publish-button {
        margin-right: .75rem;
    }

    .squeak-delete-button {
        color: red;
        background: none;
        border: none;
        padding: 0;
        font-size: .875em;
        font-weight: 600;
        z-index: 1;
        &:hover,
        &:active {
            border: none;
            color: red;
        }
    }



    .squeak-resolve-button,
    .squeak-undo-resolved, .squeak-publish-button, .squeak-other-replies {
        background: none;
        border: none;
        padding: 0;
        color: rgba(var(--button-color), 1);
        cursor: pointer;

        &:hover,
        &:active {
            border: none;
        }
    }
    .squeak-undo-resolved {
        font-size: .875em;
        font-weight: 600;
        margin-left: .5rem;
    }
    .squeak-resolve-button, .squeak-unresolve-button, .squeak-resolve-text, .squeak-publish-button, .squeak-other-replies {
        font-size: .875em;
        font-weight: 600;
        z-index: 1;
    }

    .squeak-other-replies-container {
        padding-bottom: 2rem;
        display: flex;
        align-items: center;
        .squeak-avatar-container:not(:first-of-type) {
            margin-left: -1rem;
            position: relative;
        }
    }

    .squeak-resolved-badge {
        border-radius: calc(var(--border-radius) * .75);
        border: 1.5px solid rgba(0, 130, 0, .8);
        color: rgba(0, 130, 0, .8);
        font-size: .688em;
        font-weight: 600;
        padding: .2rem .3rem;
        text-transform: uppercase;
    }

    .squeak-locked-message {
        border-radius: var(--border-radius);
        margin: -1.5rem 0 0 calc(20px + 25px + 22px);
        padding: 0 1rem;

        p {
            color: rgba(var(--primary-color), .6);
            font-size: .875em;
        }
    }

    .squeak-approval-required {
        background: rgba(var(--primary-color), .03);
        border: 1px solid rgba(var(--primary-color), .2);
        border-radius: var(--border-radius);
        margin-bottom: 0;
        padding: 0 1rem;

        p {
            color: rgba(var(--primary-color), .6);
            font-size: .875em;
        }
    }

    .squeak-approval-required {
        padding-bottom: 1rem;

        h3 {
            margin-bottom: .5rem;
        }
        p {
            font-size: 1em;
            margin: .5rem 0 .25rem;
        }

        .squeak-post-button {
            margin-top: .5rem;
        }
    }

    .squeak-show-more-questions-button {
        width: 100%;
        margin-bottom: 2rem;
    }
    .squeak-topics-container {
        list-style: none;
        margin: 0 0 1.5rem;
        padding: 0;
        display: flex;
        white-space: nowrap;
        overflow: auto;

        > li {
            margin-right: .5rem;

            button {
                padding: 0 0 .2rem;
                border: none;
                border-radius: 0;
                border-bottom: 1px solid rgba(var(--button-color), 0);
                 &.squeak-active-topic {
                    color: rgba(var(--button-color), 100);
                    border-bottom: 1px solid rgba(var(--button-color), 100);
                }
            }
        }
    }
    .squeak-profile-link {
        color: inherit;
        font-size: var(--base-font-size);
        text-decoration: none;
        display: flex;
        align-items: center;
    }
}
`

export const Theme = ({ containerRef }: any) => {
  const [dark, setDark] = useState<boolean | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      const color = getBackgroundColor(containerRef.current)
      setDark(lightOrDark(color) === 'dark')
    }
  }, [])
  return <Style dark={dark} />
}
