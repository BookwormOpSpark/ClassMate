import Expo from 'expo';
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpoTHREE from 'expo-three';
import * as THREE from 'three';
import { SERVER_URI, SendBadges } from '../../constant';

console.disableYellowBox = true;


class StudentBadges3D extends React.Component {
  constructor() {
    super();
    this.state = {};
    this._onGLContextCreate = this._onGLContextCreate.bind(this);
  }

  componentDidMount() {
    const studentID = this.props.state.selectSession.participantID;
    axios.get(`${SERVER_URI}${SendBadges}`, {
      params: {
        studentID,
      },
    })
      .then((res) => {
        const badgesInit = res.data;
        const badges = badgesInit.reduce((memo, curr) => {
          memo[curr.id_badge] ? memo[curr.id_badge] += 1 : memo[curr.id_badge] = 1;
          return memo;
        }, {});
        this.setState({ badges });
        console.log('state', this.state);
      })
      .catch(err => console.error(err));
  }


  _onGLContextCreate = async (gl) => {
    const gradeCount = this.state.badges ? this.state.badges['1'] : 0;
    const timeCount = this.state.badges ? this.state.badges['2'] : 0;
    const spiritCount = this.state.badges ? this.state.badges['3'] : 0;
    const participationCount = this.state.badges ? this.state.badges['4'] : 0;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000,
    );
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor('#ECA963');

    // let font = '';
    // const text = 'Hello!';
    // const loader = new THREE.FontLoader();
    // loader.load(fontHelvetiker, (response) => {
    //   font = response;
    // });

    // const geometryText = new THREE.TextGeometry(text, {
    //   font,
    //   size: 10,
    //   height: 10,
    //   curveSegments: 2,
    // });
    // const materialText = new THREE.MeshBasicMaterial({ color: 0xff0000, overdraw: 0.5 });
    // const textHello = new THREE.Mesh(geometryText, materialText);
    // textHello.position.x = 0;
    // textHello.position.y = 0;
    // textHello.position.z = 0;
    // const group = new THREE.Group();
    // group.add(textHello);
    // scene.add(group);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const materialTime = new THREE.MeshBasicMaterial({
      transparent: true,
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('../../assets/clock.png')),
      }),
    });
    const materialParticipation = new THREE.MeshBasicMaterial({
      transparent: true,
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('../../assets/curious.png')),
      }),
    });
    const materialSpirit = new THREE.MeshBasicMaterial({
      transparent: true,
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('../../assets/spiritgood.png')),
      }),
    });
    const materialGrade = new THREE.MeshBasicMaterial({
      transparent: true,
      map: await ExpoTHREE.createTextureAsync({
        asset: Expo.Asset.fromModule(require('../../assets/grades.jpg')),
      }),
    });

    const cubesTime = Array(timeCount)
      .fill()
      .map(() => {
        const cube = new THREE.Mesh(geometry, materialTime);
        scene.add(cube);
        cube.position.x = 1.5; // 3 - 6 * Math.random();
        cube.position.y = 2; // 3 - 6 * Math.random();
        cube.position.z = 0; // -5 * Math.random();
        return { cube };
      });

    const cubesParticipation = Array(participationCount)
      .fill()
      .map(() => {
        const cube = new THREE.Mesh(geometry, materialParticipation);
        scene.add(cube);
        cube.position.x = -1.5; // 4 - 6 * Math.random();
        cube.position.y = 2; // 4 - 6 * Math.random();
        cube.position.z = 0; // -5 * Math.random();
        return { cube };
      });
    const cubesGrade = Array(gradeCount)
      .fill()
      .map(() => {
        const cube = new THREE.Mesh(geometry, materialGrade);
        scene.add(cube);
        cube.position.x = 1.5; // 2 - 6 * Math.random();
        cube.position.y = -1; // 2 - 6 * Math.random();
        cube.position.z = 0; // -2 * Math.random();
        return { cube };
      });
    const cubesSpirit = Array(spiritCount)
      .fill()
      .map(() => {
        const cube = new THREE.Mesh(geometry, materialSpirit);
        scene.add(cube);
        cube.position.x = -1.5; // - 6 * Math.random();
        cube.position.y = -1; // - 6 * Math.random();
        cube.position.z = 0; // - 2 * Math.random();
        return { cube };
      });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cubesGrade.forEach(({ cube }) => {
        cube.rotation.x += 0.03;
        cube.rotation.y += 0.03;
      });
      cubesTime.forEach(({ cube }) => {
        cube.rotation.x += 0.03;
        cube.rotation.y += 0.03;
      });
      cubesParticipation.forEach(({ cube }) => {
        cube.rotation.x += 0.03;
        cube.rotation.y += 0.03;
      });
      cubesSpirit.forEach(({ cube }) => {
        cube.rotation.x += 0.03;
        cube.rotation.y += 0.03;
      });
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

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(StudentBadges3D);
StudentBadges3D.propTypes = {
  state: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};