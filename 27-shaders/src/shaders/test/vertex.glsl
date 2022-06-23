// ';' 안쓰면 오류!
// uniform mat4 projectionMatrix;
//     uniform mat4 viewMatrix;
//     uniform mat4 modelMatrix;

//     // uniform float uFrequency;
    uniform vec2 uFrequency;
    uniform float uTime;

    // // attribute는 vertex에서 fragment로 전달해야함
    // attribute vec3 position;
    // attribute vec2 uv;

    varying vec2 vUv;
    // attribute float aRandom;
    // varying float vRandom;
    varying float vElevation; 

    void main(){
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);

        // position.x + position.y 애니메이션
        float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
        elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
        modelPosition.z += elevation;
        // position.z위치값을 aRandom으로 설정 -> shaders에서 
        // modelPosition.z += aRandom*0.1;

        // modelPosition.y += uTime;
        vec4 viewPosition = viewMatrix * modelPosition;

        vec4 projectedPosition = projectionMatrix * viewPosition;
 
        gl_Position = projectedPosition;

        // varying 값 - vertex.glsl -> fragment.glsl에 전달하는 값
        // vRandom = aRandom;

        vUv = uv;
        vElevation = elevation;
    }