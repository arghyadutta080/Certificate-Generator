import React, { useState } from "react";
import { Layer, Stage, Text } from "react-konva";

interface EditLayout {
  text?: string;
  stageHeight?: number;
  stageWidth?: number;
  stageLeft?: string;
  stageTop?: string;
  textFontSize?: number;
  alignment?: string;
  textFontFamily?: string;
  textColor?: string;
  textLineheight?: number | any;
}

interface Props {
  CertificateLayout: EditLayout;
}

const EditComponent: React.FC<Props> = ({ CertificateLayout }) => {
  const [state, setState] = useState({
    isDragging: false,
    x: 50,
    y: 50,
  });

  return (
    <>
      <Stage
        width={CertificateLayout.stageWidth}
        height={CertificateLayout.stageHeight}
        style={{
          position: "absolute",
          left: CertificateLayout.stageLeft,
          top: CertificateLayout.stageTop,
        }}
      >
        <Layer>
          <Text
            fontSize={CertificateLayout.textFontSize}
            lineHeight={CertificateLayout.textLineheight}
            align={CertificateLayout.alignment}
            fontStyle="bold"
            fontFamily={CertificateLayout?.textFontFamily}
            text={CertificateLayout.text}
            x={state.x}
            y={state.y}
            draggable
            fill={state.isDragging ? "green" : CertificateLayout.textColor}
            onDragStart={() => {
              setState((prevState) => ({
                ...prevState,
                isDragging: true,
              }));
            }}
            onDragEnd={(e) => {
              setState({
                isDragging: false,
                x: e.target.x(),
                y: e.target.y(),
              });
            }}
          />
        </Layer>
      </Stage>
    </>
  );
};

export default EditComponent;
