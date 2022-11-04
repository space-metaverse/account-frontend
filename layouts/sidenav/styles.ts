import { DropDown } from '@space-metaverse-ag/space-ui/icons'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  max-width: 19.5rem;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius['2xl']};
  background-color: ${({ theme }) => theme.colors.dark['100']};
`

export const Content = styled.div`
  gap: .75rem;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.dark['200']}`};
`

export const BackIconButton = styled.button`
  cursor: pointer;
  border: none;
  padding: 0;
  outline: none;
  background-color: transparent;

  path {
    stroke: ${({ theme }) => theme.colors.dark['500']};
    transition: ${({ theme }) => theme.transitions.ease};
  }

  &:hover path {
    stroke: ${({ theme }) => theme.colors.dark['700']};
  }
`

export const Title = styled.h2`
  ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
`

export const Options = styled.ul`
  margin: 0;
  padding: .5rem 1.25rem;
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
`

export const OptionWrapper = styled.li`
  padding: 1rem 0;
  position: relative;

  &:not(:first-of-type) {
    border-top: ${({ theme }) => `1px solid ${theme.colors.dark['200']}`};
  }
`

export const Option = styled.div<{ child?: boolean, selected?: boolean }>`
  gap: .75rem;
  cursor: pointer;
  display: flex;
  user-select: none;
  align-items: center;

  p {
    ${({ theme }) => theme.fonts.size.sm};
    color: ${({ theme }) => theme.colors.dark['800']};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    letter-spacing: 1px;
  }

  path {
    stroke: ${({ theme }) => theme.colors.dark['800']};
    stroke-width: 2px;
  }

  ${({ child = false }) => child && css`
    padding: .625rem 0;
    margin-left: .5rem;
  `};

  ${({ selected = false }) => selected && css`
    p {
      color: ${({ theme }) => theme.colors.blue['400']};
    }

    svg path {
      stroke: ${({ theme }) => theme.colors.blue['400']};
    }
  `}
`

export const IconDropDown = styled(DropDown)`
  margin-left: auto;

  path {
    stroke: ${({ theme }) => theme.colors.dark['500']};
    stroke-width: 1.5px;
  }
`