(function () {
    var container, stats;
    var camera, scene, renderer;
    var clock = new THREE.Clock();

    init();

    function init() {

        container = document.getElementById('container');

        camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(-5, -5, 5);
        camera.up.set(0, 0, 1);

        scene = new THREE.Scene();

        var light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.position.set(0, -4, -4).normalize();
        scene.add(light);

        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setClearColor(0xfff4e5);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.sortObjects = false;

        container.appendChild(renderer.domElement);

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild(stats.domElement);


        var loader = new THREE.ColladaLoader();
        loader.load("../Musical_Instruments/Dizi_Pro/Dizi_skinned.dae", function (collada) {

            collada.scene.traverse(function (child) {

                if (child instanceof THREE.SkinnedMesh) {

                    var animation = new THREE.Animation(child, child.geometry.animation);

                    animation.play();

                    camera.lookAt(child.position);

                }

            });

            scene.add(collada.scene);

        });

        window.addEventListener('resize', onWindowResize, false);

        animate();

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function animate() {

        requestAnimationFrame(animate, renderer.domElement);

        THREE.AnimationHandler.update(clock.getDelta());

        renderer.render(scene, camera);

        stats.update();

    }

})();