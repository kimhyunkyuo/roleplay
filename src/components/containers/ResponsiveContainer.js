import styled from 'styled-components';

// Figma에서 디자인된 기준 화면 너비와 높이 (예: 1440px 기준)
const DESIGN_WIDTH = 1280;
const DESIGN_HEIGHT = 832;

// px 단위를 vw로 변환하는 함수
export const formatSizeByVw = ({ width, height }) => {
  if (width && !height) {
    return `
      width: calc(100vw * ${width} / ${DESIGN_WIDTH});
      max-width: ${width}px;
    `;
  }

  if (!width && height) {
    return `
      height: calc(100vh * ${height} / ${DESIGN_HEIGHT});
      max-height: ${height}px;
    `;
  }

  return `
    width: calc(100vw * ${width} / ${DESIGN_WIDTH});
    max-width: ${width}px;
    height: calc(100vh * ${height} / ${DESIGN_HEIGHT});
    max-height: ${height}px;
  `;
};

// Styled Components로 동적 높이 및 너비 처리
export const ResponsiveContainer = styled.div`
  ${(props) => formatSizeByVw({ width: props.width, height: props.height })}
`;
