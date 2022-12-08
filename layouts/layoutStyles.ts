import styled from 'styled-components'

const Title = styled.h1`
  ${({ theme }) => theme.fonts.size['3xl']};
  display: flex;
  align-items: center;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.dark['200']}`};
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;

  > div {
    cursor: pointer;
    margin-right: 1rem;

    path {
      stroke: ${({ theme }) => theme.colors.dark[500]};
      transition: ${({ theme }) => theme.transitions.ease};
    }

    &:hover path {
      stroke: ${({ theme }) => theme.colors.blue[400]};
    }
  }
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  gap: 3rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  padding: 1.5rem 4rem;
  position: relative;
  margin-top: 6rem;

  @media screen and (max-width: 1024px) {
    gap: 1rem;
    padding: 0 1.25rem 2rem 1.25rem;
    margin-top: 5rem;
    flex-direction: column;

    ${Title} {
      display: none;
    }
  }
`

const Form = styled.div`
  gap: 1rem;
  display: flex;
  margin-bottom: 4rem;
  flex-direction: column;

  .is-grid {
    gap: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 640px) {
    padding-bottom: 4rem;

    .is-grid {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`

const Actions = styled.div`
  gap: .75rem;
  padding: 1.25rem 0;
  display: flex;
  border-top: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};
  align-items: center;

  @media screen and (max-width: 640px) {
    left: 0;
    width: 100%;
    padding: 1.25rem;
    bottom: 0;
    position: fixed;
    background-color: ${({ theme }) => theme.colors.white};
  }
`

const PhoneAction = styled.div`
  align-items: center;
  display: flex;
  padding-top: 1.5rem;
  height: 4.375rem;
  @media screen and (max-width: 640px) {
    padding-top: 0;
    height: fit-content;
  }
`

const Alert = styled.div`
  padding-top: 0.5rem;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  max-width: 45rem;
  flex-direction: column;
`

const MainStyles = {
  Title,
  Wrapper,
  Content
}

const SharedStyles = {
  Form,
  Actions,
  PhoneAction,
  Alert,
  Container
}

export {
  MainStyles,
  SharedStyles
}
