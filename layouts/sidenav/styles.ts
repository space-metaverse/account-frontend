import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 312px;
  background-color: #fafafc;
  border-radius: 16px;
  margin: 16px;
  color: #111114;
  font-size: 12px;
`;

export const Content = styled.div`
  padding: 0 0 0 20px;
`;

export const BackIconButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border-width: 0;
  padding: 0;
`;

export const Divider = styled.div<{ absolute?: boolean }>`
  width: 100%;
  height: 1px;
  background-color: #f0f0f5;
  bottom: 0;
  ${({ absolute }) => absolute && "position: absolute"};
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 20px;
  height: 63px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Options = styled.ul<{ child?: boolean }>`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  text-transform: uppercase;
  padding: 0;
  margin: 0;
`;

export const OptionWrapper = styled.li`
  padding: 10px 0 10px 0;
  position: relative;
`;

export const Option = styled.div<{ child?: boolean; selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ child }) => (child ? "0" : "0px 20px 0px 0")};
  margin-left: ${({ child }) => child && "33px"};
  font-weight: bold;
  cursor: pointer;
  user-select: none;

  ${({ selected }) =>
    selected &&
    `
    background: linear-gradient(45deg, #01cee9 0%, #4140ff 49.48%, #7800d7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `}

  div:first-of-type {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  svg * {
    ${({ selected }) => selected && "stroke: #00D9F5;"}
  }
`;
