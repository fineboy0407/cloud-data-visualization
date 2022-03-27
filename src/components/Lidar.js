/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber'
import { PCDLoader } from "../three/PCDLoader";
import { OrbitControls } from "../three/OrbitControls"

extend({ OrbitControls })

const useLoadPCD = url => {
    const [status, setStatus] = useState('loading');
    const [data, setData] = useState(null);

    const onLoad = useCallback(data => {
        setStatus('success');
        setData(data);
    }, [status]);
    const onProcess = useCallback(processEvent => {
        setStatus('loading');
    }, [status]);
    const onError = useCallback(() => {
        setStatus('error');
    }, [status]);

    useEffect(() => {
        new PCDLoader().load(url, onLoad, onProcess, onError);
    }, [url]);

    return { data, status };
};

const CameraControls = () => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the OrbitControls component.
    // https://threejs.org/docs/#examples/en/controls/OrbitControls
    const {
        camera,
        gl: { domElement },
    } = useThree();
    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();
    useFrame((state) => controls.current.update());
    return <orbitControls ref={controls} args={[camera, domElement]} />;
};

const CV = ({
    data = null,
    camPosition = [0, 0, 40],
    camControl = true,
    zoom = 100
}) => {
    const scale = 1;
    const range = 120;
    return (
        <Canvas
            dpr={window.devicePixelRatio}
            alpha={false}
            orthographic
            camera={{
                left: -range * scale,
                right: range * scale,
                top: range,
                bottom: -range,
                near: -range,
                far: 10000,
                zoom: zoom,
                up: [0, 0, 1],
                position: camPosition
            }}>
            {
                data ? <primitive object={data} /> : null
            }
            {camControl && <CameraControls />}
        </Canvas>
    )
}

const Lidar = (props) => {
    const { data } = useLoadPCD(props.path)
    return (
        <>
            <CV data={data} camPosition={props.camPosition} camControl={props.camControl} zoom={props.zoom}/>
        </>
    )
}

export default Lidar