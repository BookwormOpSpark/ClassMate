import Expo from 'expo';
import React from 'react';
import ExpoTHREE from 'expo-three';
import { Dimensions, View, Text } from 'react-native';
import * as THREE from 'three';

console.disableYellowBox = true;


export default class StudentBadges extends React.Component {
  constructor() {
    super();
    this.state = { text: '' };
    this._onGLContextCreate = this._onGLContextCreate.bind(this);
  }


  _onGLContextCreate = async (gl) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000,
    );
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor(0xffffff);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material1 = new THREE.MeshBasicMaterial({
      transparent: true,
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('../../assets/classmatelogoicon.png')),
      }),
    });
    const material2 = new THREE.MeshBasicMaterial({
      transparent: true,
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('../../assets/blackboard.jpg')),
      }),
    });
    const cube1 = new THREE.Mesh(geometry, material1);
    const cube2 = new THREE.Mesh(geometry, material2);
    scene.add(cube1);
    scene.add(cube2);
    camera.position.z = 5;
    const animate = () => {
      requestAnimationFrame(animate);
      cube1.rotation.x += 0.05;
      cube1.rotation.y += 0.03;
      cube2.rotation.x += 0.05;
      cube2.rotation.y += 0.03;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    animate();
  };

  render() {
    return (
      <Expo.GLView
        style={{ flex: 1 }}
        onContextCreate={this._onGLContextCreate}
      />
    );
  }
}

