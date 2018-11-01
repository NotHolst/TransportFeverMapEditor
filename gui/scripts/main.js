var scene, renderer;

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbab8b4);

    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.x = 0;
    scene.add(directionalLight);


    terrain = new Terrain();
    terrain.addToScene(scene);

    Inputs.init();
    Camera.init();
    Tools.init(terrain);
}

let changed = true;
function requestRender() {
    changed = true;
}

function renderloop() {
    if (changed) {
        Camera.update();
        renderer.render(scene, Camera.ThreeCamera);
        changed = false;
    }
    requestAnimationFrame(renderloop);
}


init();
renderloop();