import React, { ReactElement, useCallback, useContext } from "react";
import { IThemeContextType, ThemeContext } from "../context/ThemeContext";
import { useEffect,useState,useRef } from "react";
import { NodeModel } from "../models/NodeModel";
import { EdgeModel } from "../models/EdgeModel";
// @ts-ignore
import { Canvas,CanvasRef,CanvasPosition,Node} from "reaflow";



interface IGraphVisualizerProps{
  codeText: string;
  newNodes:NodeModel[];
  newEdges:EdgeModel[]; 
  getVisualizerRef(value: any|null): void;
}

const GraphVisualizer = ({codeText, newNodes, newEdges,getVisualizerRef }: IGraphVisualizerProps): ReactElement => {
  const userThemeModeContext = useContext<IThemeContextType>(ThemeContext);
  const ref = useRef<CanvasRef | null>(null);

  getVisualizerRef(ref); 

  const darkVisMode = {
    background: "#fcfcfc",
  };

  const lightVisMode = {
    background: "#141414",
  };

  return (
    <>
      <div id="visualizer" 
      className=" h-full w-full  border-[0.1rem]">
      <Canvas

      ref={ref}
      nodes={newNodes}
      edges={newEdges}
      fit={true} 
      direction="RIGHT"
      pannable={false} 
      zoomable ={true}
      animated ={true}
      defaultPosition={CanvasPosition.CENTER}
      maxZoom={0.2}
      minZoom={-0.8}

      node={({ ...props }) => {
        return (
            <Node label={<div />} {...props} >
                {(event: any) => (
                    <foreignObject
                         height={event.height} width={event.width} x={0} y={0}
                         style={{ position: 'absolute', left: 0, top: 0 }}>
                        <div style={{ color: '#0096FF', display: 'flex', alignItems: 'center',
                                      justifyContent: 'center', padding: '0 2rem' ,
                                      textAlign: 'center', height: '100%' , width: '100%'}}>
                            <div>
                              {props.properties.text} 
                            </div>
                        </div>
                    </foreignObject>
                )}
            </Node>
        );
    }}
      />
      </div>
    </>
  );
}

export default GraphVisualizer;



