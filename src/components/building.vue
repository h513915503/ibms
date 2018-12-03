<style scoped>

</style>

<template>
    <div id="info" ref="info">

    </div>
</template>




<script>

export default {
    data() {
        return {

        }
    },
    mounted() {
        this.createBuilding()
    },
    methods: {
        createBuilding() {
            if ( WEBGL.isWebGLAvailable() === false ) {
                this.$refs.info.appendChild( WEBGL.getWebGLErrorMessage() );
            }
            var InfoDiv = null;
            
            var container, controls;
            var camera, scene, renderer, light;
            var clock = new THREE.Clock();
            var mixers = [];
            init.call(this)
            animate();
            function init() {
                var InfoDiv = document.getElementById('info')
                var width = document.getElementById('info').clientWidth;
                var height = document.getElementById('info').clientHeight;
                container = document.createElement( 'div' );
                this.$refs.info.appendChild( container );
                // camera = new THREE.PerspectiveCamera( 50, 1800 / 520, 0.1, 20000 );
                camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 20000 );
                camera.position.set( 100, 200, 900 );


                // controls = new THREE.OrbitControls( camera, InfoDiv );
                // controls.target.set( 0, 100, 0 );
                // controls.update();

                scene = new THREE.Scene();
                scene.background = new THREE.Color( 0xa0a0a0 );
                // scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );
                light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
                light.position.set( 0, 200, 0 );
                scene.add( light );

                light = new THREE.DirectionalLight( 0xffffff );
                light.position.set( 0, 200, 100 );
                light.castShadow = true;
                light.shadow.camera.top = 180;
                light.shadow.camera.bottom = - 100;
                light.shadow.camera.left = - 120;
                light.shadow.camera.right = 120;
                scene.add( light );
                
                var helper = new THREE.AxesHelper(5000);
                scene.add(helper);
                // scene.add( new THREE.CameraHelper( light.shadow.camera ) );
                // ground
                // var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 12000, 8000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
                // mesh.rotation.x = - Math.PI / 2;
                // mesh.receiveShadow = true;
                // scene.add( mesh );
                // var grid = new THREE.GridHelper( 12000, 120, 0x0f0f19, 0x000000 );
                // grid.material.opacity = 0.2;
                // grid.material.transparent = true;
                // scene.add( grid );
                // model
                var loader = new THREE.FBXLoader();
                loader.load( '03(henliangtouming)-2.fbx', function ( object ) {
                    // object.children[0].geometry.computeBoundingBox()
                    // object.children[0].geometry.center()
                    //object.position.set(0, 250, 0)
                    // object.mixer = new THREE.AnimationMixer( object );
                    // mixers.push( object.mixer );
                    // var action = object.mixer.clipAction( object.animations[ 0 ] );
                    // action.play();
                    // object.traverse( function ( child ) {
                    // 	if ( child.isMesh ) {
                    // 		child.castShadow = true;
                    // 		child.receiveShadow = true;
                    // 	}
                    // } );


                    // var raycaster = new THREE.Raycaster();


                    // var mouse = new THREE.Vector3();





                    function onMouseClick( event ) {
                        console.log(22222)
                        event.preventDefault();
                        var vector = new THREE.Vector3();//三维坐标对象
                        // vector.set( ( event.clientX / 1800 ) * 2 - 1, - ( event.clientY / 520 ) * 2 + 1, 0.5 );
                        vector.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
                        vector.unproject( camera );
                        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
                        var intersects = raycaster.intersectObjects(scene.children, true);

                        if (intersects.length > 0) {
                            var selected = intersects[0];//取第一个物体

                            console.log(selected)
                            // let {x, y, z} = selected.position
                            let {x, y, z} = selected.point
                            //selected.object.material.color.set( 0xff0000 );



                            console.log("x坐标:"+ x);
                            console.log("y坐标:"+ y);
                            console.log("z坐标:"+ z);


                            var geometry = new THREE.BoxGeometry( 100, 100, 100 );
                            var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
                            var cube = new THREE.Mesh( geometry, material );



                            cube.position.set(x, y, z)
                            // cube.position.set(x, y, z)
                            object.add( cube );


                        }

                    }

                    // var InfoDiv = document.getElementById('#info')
                    InfoDiv.addEventListener( 'click', onMouseClick, false );

                    scene.add( object );
                } );
                renderer = new THREE.WebGLRenderer( { antialias: true } );
                // renderer.setPixelRatio( window.devicePixelRatio );
                
                renderer.setSize( 1800, 520 );
                renderer.shadowMap.enabled = true;
                container.appendChild( renderer.domElement );
                // window.addEventListener( 'resize', onWindowResize, false );
                // stats
                // stats = new Stats();
                // container.appendChild( stats.dom );
                controls = new THREE.OrbitControls( camera, InfoDiv );
                controls.target.set( 0, 100, 0 );
                controls.update();
            }


            // function onWindowResize() {
            //     camera.aspect = 1800 / 520;
            //     // camera.aspect = window.innerWidth / window.innerHeight;
            //     camera.updateProjectionMatrix();
            //     renderer.setSize( 1800, 520 );
            //     // renderer.setSize( window.innerWidth, window.innerHeight );
            // }
			//
            function animate() {
                requestAnimationFrame( animate );
                if ( mixers.length > 0 ) {
                    for ( var i = 0; i < mixers.length; i ++ ) {
                        mixers[ i ].update( clock.getDelta() );
                    }
                }
                renderer.render( scene, camera );
                // stats.update();
            }
        }
    }
}
    
</script>