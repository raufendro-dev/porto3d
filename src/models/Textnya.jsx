import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';
import { useDrag } from '@use-gesture/react';
import TextnyaScene from '../assets/3d/raufendro-dev.glb';

const Textnya = (props) => {
  const TextnyaRef = useRef();
  const { nodes, materials } = useGLTF(TextnyaScene);
  
  const [{ rotation }, set] = useSpring(() => ({ rotation: [0, 0, 0] }));

  const bind = useDrag((state) => {
    const { offset: [x, y] } = state;
    set({ rotation: [y / 100, x / 100, 0] });
  });

  return (
    <a.group
      ref={TextnyaRef}
      {...props}
      {...bind()}
      rotation={rotation}
    >
      <group position={[0.019, 0.004, 0.25]} scale={0.01}>
        <mesh
          geometry={nodes.mesh_id35.geometry}
          material={materials['83']}
          position={[-554.454, -63.909, 7.5]}
        />
      </group>
    </a.group>
  );
};

export default Textnya;
