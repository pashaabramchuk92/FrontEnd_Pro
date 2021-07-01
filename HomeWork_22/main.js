// 2d

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const downPart ={
    x: 500,
    y: 400,
    radius: 95,
    startAngle: 0,
    endAngle: Math.PI * 2,
};

const middlePart = {
    x: 500,
    y: 285,
    radius: 75,
    startAngle: 145 * Math.PI/180,
    endAngle: 35 * Math.PI/180,
};

const topPart = {
    x: 500,
    y: 194,
    radius: 60,
    startAngle: 145 * Math.PI/180,
    endAngle: 35 * Math.PI/180,
};

const leftEye = {
    x: 480,
    y: 175,
    radius: 7.5,
    startAngle: 0,
    endAngle: Math.PI * 2,
    eye: true
};

const rightEye = {
    x: 520,
    y: 175,
    radius: 7.5,
    startAngle: 0,
    endAngle: Math.PI * 2,
    eye: true
};

const nose = {
    x: 500,
    y: 195,
    radius: 7.5,
    startAngle: 0,
    endAngle: Math.PI * 2,
    nose: true
};

const leftHand = {
    x: 430,
    y: 260,
    length: 100,
    tilt: 10,
    finger: 10
};

const rightHand = {
    x: 570,
    y: 260,
    length: -100,
    finger: -10
};

const drawCircle = ({x, y, radius, startAngle, endAngle, eye, nose}) => {

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    
    ctx.fillStyle = '#fff';
    ctx.fill();
    
    if(eye) {
        ctx.fillStyle = 'black';
        ctx.fill();
    } 
    if(nose) {
        ctx.fillStyle = '#e41515';
        ctx.strokeStyle = '#e41515';
        ctx.fill();
    }

    ctx.stroke();
};

const drawHand = ({x, y, length, finger}) => {
    ctx.beginPath();

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';

    ctx.moveTo(x, y);
    ctx.lineTo(x - length, y);
    ctx.moveTo(x - length, y - finger);
    ctx.lineTo(x - length + finger * 2, y);
    ctx.lineTo(x - length, y + finger);

    ctx.stroke();
};

drawCircle(downPart);
drawCircle(middlePart);
drawCircle(topPart);
drawCircle(leftEye);
drawCircle(rightEye);
drawCircle(nose);

drawHand(leftHand);
drawHand(rightHand);


// 3d
// странные именна переменных (nose3d etc) из-за конфликта имен

const fov = 70;
const aspectRatio = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('lightblue');
camera.position.z = 25;

document.body.prepend(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const materialWhite = new THREE.MeshPhongMaterial({color: '#fff'});
const materialBlack = new THREE.MeshPhongMaterial({color: '#000'});
// big sphere
const geometryBig = new THREE.SphereGeometry(5, 32, 32);
const sphereBig = new THREE.Mesh(geometryBig, materialWhite);
sphereBig.position.y = -5;
scene.add(sphereBig);

// middle sphere
const geometryMid = new THREE.SphereGeometry(4, 32, 32);
const sphereMid = new THREE.Mesh(geometryMid, materialWhite);
sphereMid.position.y = 1;
scene.add(sphereMid);

// Head
const geometryHead = new THREE.SphereGeometry(3, 32, 32);
const head = new THREE.Mesh(geometryHead, materialWhite);
head.position.y = 6;
scene.add(head);

//nose
const geometryNose = new THREE.ConeGeometry(.4, 3, 22);
const materialNose = new THREE.MeshPhongMaterial({color: '#ffa500'});
const nose3d = new THREE.Mesh(geometryNose, materialNose);
nose3d.position.set(0, 5, 3.5);
nose3d.rotation.x = 100 * Math.PI / 180;
scene.add(nose3d);

// left eye
const geometryEye = new THREE.SphereGeometry(0.3, 12, 12);
const leftEye3d = new THREE.Mesh(geometryEye, materialBlack);
leftEye3d.position.set(-1, 6, 2.7);
scene.add(leftEye3d);

// right eye
const rightEye3d = new THREE.Mesh(geometryEye, materialBlack);
rightEye3d.position.set(1, 6, 2.7);
scene.add(rightEye3d);

// left hand
const geometryHand = new THREE.CylinderGeometry( 0.1, 0.1, 7, 12 );
const handLeft = new THREE.Mesh(geometryHand, materialBlack);
handLeft.position.set(-4, 2.5, 0);
handLeft.rotation.z = 1;
scene.add(handLeft);

// right hand
const handRight = new THREE.Mesh(geometryHand, materialBlack);
handRight.position.set(4, 2.5, 0);
handRight.rotation.z = -1;
scene.add(handRight);

const light = new THREE.DirectionalLight('#fff', 1);
light.position.set(-1, 2, 5);
scene.add(light);

function drag() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(drag);
}
drag();