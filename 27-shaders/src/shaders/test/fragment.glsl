//  precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;
// varying float vRandom;
varying vec2 vUv;
varying float vElevation;

    void main(){
        // uTexture를 vUv에 적용
        vec4 textureColor = texture2D(uTexture, vUv);
        textureColor.rgb += vElevation * 1.5 + 0.5;

        // gl_FragColor - color 또는 texture 
        // gl_FragColor = vec4(0.5, vRandom, 1.0, 1.0);
        // gl_FragColor = vec4(uColor, 1.0);
        gl_FragColor = textureColor;
        gl_FragColor = vec4(vUv, 0.01, 1.0);
    }