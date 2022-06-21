// ; 안쓰면 오류
uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;
    // uniform float uFrequency;
    uniform vec2 uFrequency;
    
    attribute vec3 position;

    // attribute float aRandom;
    // varying float vRandom;

    void main(){
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        modelPosition.z += sin(modelPosition.x * uFrequency.x) * 0.1;
        modelPosition.z += sin(modelPosition.y * uFrequency.y) * 0.1;
        // position.z위치값을 aRandom으로 설정 -> shaders에서 
        // modelPosition.z += aRandom*0.1;

        vec4 viewPosition = viewMatrix * modelPosition;

        vec4 projectedPosition = projectionMatrix * viewPosition;

        gl_Position = projectedPosition;

        // varying 값 - vertex.glsl -> fragment.glsl에 전달하는 값
        // vRandom = aRandom;
    }