import { createGlobalStyle } from 'styled-components';
import { colors, screen } from './variables';

const GlobalStyles = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    box-sizing: border-box;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    background: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
  }
  input {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  blockquote, q {
    quotes: none;
  }
  ol, ul {
    list-style: none;
  }
  a {
    color: #fff;
    text-decoration: none;
    display: block;
    &:hover {
      text-decoration: underline;
    }
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  img {
    max-width: 100%;
  }
  strong {
    font-weight: 500;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  .list-pagination {
    list-style: none;
    width: 100%;
    display: block;
    margin: 0.5rem auto;
    padding: 1rem;
    text-align: center;
    li {
      display: inline-block;
      font-size: 0.8rem;
      color: #333;
      text-decoration: none;
      &.disabled {
        display: none;
      }
      & + li {
        margin-left: 5px;
        @media screen and (max-width: ${screen.sm}) {
          margin-left: 0px;
        }
      }
    }
    &--link {
      padding: 5px 12px;
      text-decoration: none;
      color: black;
      font-weight: 400;
      @media screen and (max-width: ${screen.sm}) {
        padding: 5px 8px;
      }
      &:hover {
        background-color: ${colors.darkBiege};
        color: white;
      }
    }
    &--active {
      background-color: ${colors.darkBiege};
      color: white;
      &:hover {
        background-color: black;
        color: white;
      }
    }
  }
`;

export default GlobalStyles;