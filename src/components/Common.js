import React from 'react'
import styled, {css} from 'styled-components'

export const FullWidthImage = styled.div.attrs({
  className: 'full-width-image margin-top-0'
})`
  background-position: center;
  background-attachment: fixed;
  min-height: calc(100vh - ${props => props.theme.navbarHeight});
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    ${props =>
      props.backgroundImage ? `background-image: url(${
        !!props.backgroundImage.childImageSharp ? props.backgroundImage.childImageSharp.fluid.src : props.backgroundImage
      });` : ''
    }
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    ${
      props => props.imageStyle || ''
    }
  }
  & > * {
    z-index: 1;
  }
`

export const Content = styled.div.attrs({
  className: 'content'
})`
  width: 100vw;
  max-width: 500px;
`

export const Title = styled.h1.attrs({
  className: 'has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen'
})`
  text-align: center;
  & > span {
    padding: 0 10px;
    background: rgba(255, 255, 255, 0.85);
    -webkit-box-decoration-break: clone;
  }
`

export const Subtitle = styled.h3.attrs({
  className: 'is-size-5'
})`
  margin-top: 0 !important;
  font-weight: normal !important;
  text-align: center;
  & > span {
    line-height: 2.3rem;
    padding: 0 10px;
    background: rgba(255, 255, 255, 0.85);
    -webkit-box-decoration-break: clone;
  }
`

export const Form = styled.form.attrs({})`
  padding: 10px;
  margin-bottom: 28px;
`

const SelectWrapper = styled.div.attrs({
  className: 'select'
})`
  & > select {
    padding-right: 10px !important;
    width: 100%;
  }
  &:after {
    display: none !important;
  }
`

export const Select = ({ name, placeholder, items, style, onChange }) => (
    <SelectWrapper style={style}>
      <select name={name} onChange={onChange}>
        <option value="">{placeholder}</option>
        {items.map(({title, value}) => (
          <option key={value} value={value}>{title}</option>
        ))}
      </select>
    </SelectWrapper>
)

export const ButtonStyle = css`
  display: block;
  text-align: center;
  background: ${props => props.theme.colors.defaultGradient.fallback};
  background: ${props => props.theme.colors.defaultGradient.gradient};
  color: ${props => props.theme.colors.white};
  box-shadow: 1px 2px 3px 1px rgba(0,0,0,0.3);
  border-radius: 3px;
  border: none !important;
  text-transform: uppercase;
`

export const Button = styled.button.attrs(props => ({
  className: 'button is-size-6',
  disabled: props.disabled
}))`${ButtonStyle}`
