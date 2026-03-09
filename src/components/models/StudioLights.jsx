import { Environment, Lightformer } from "@react-three/drei"

const StudioLights = () => {
  return (
    <group name="StudioLights">
        <Environment resolution={256}>
            <group>
                <Lightformer form={'rect'} intensity={10 } position={[-10,5,-5]} scale={10}></Lightformer>
            </group>
        </Environment>
    </group>
  )
}

export default StudioLights