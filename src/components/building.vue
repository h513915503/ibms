<style scoped>
#info {
    cursor: pointer;
}
</style>

<template>
    <div id="info" ref="info" @click="onClick">

    </div>
</template>




<script>

let InfoDiv;
let container, controls;
let camera, scene, renderer, light, singleair;
let clock = new THREE.Clock();
let mixers = [];

export default {
    props: {
        locationObj: {
            type: Object
        },
        isEdit: {
            type: Boolean
        },
        level: {
            type: Number
        },
        detailInfo: {
            type: Array
        },
        // floorNum: {
        //     type: String
        // }
    },
    data() {
        return {
            addLevel: 0,
            currentMesh: null
        }
    },
    mounted() {
        // this.createBuilding()
        console.log(this.detailInfo)
        this.initBuilding();
        this.animate()
    },
    watch: {
        isEdit: function (val, oldVal) {
            if (!val && oldVal) {
                if (this.currentMesh) {
                    scene.remove(this.currentMesh)
                }
            }
        },
        detailInfo: function (val) {
            // console.log(val)
            const meshArr = scene.children.slice(4)
            meshArr.forEach(item => {
                scene.remove(item)
            })
            val.forEach(({ location }) => {
                this.addOneMesh(location.xAxis, location.yAxis, location.zAxis)
            })
        }
    },
    methods: {
        onClick() {
            // console.log(this.level)
            // if (this.addLevel === 1) {
            //     this.$emit("click", 2)
            // }
        },
        initBuilding() {
            var InfoDiv = document.getElementById('info')
            container = document.createElement( 'div' );
            this.$refs.info.appendChild( container );

            // 添加相机
            camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 40000 );//可调整展示距离
            camera.position.set( 0, 200, 100 );
            
            // 添加场景
            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xa0a0a0 );

            // 添加灯光
            light = new THREE.HemisphereLight( 0xffffff, 0x444444, 1 );
            light.position.set( 0, 800, 0 );
            scene.add( light );

            light = new THREE.DirectionalLight( 0xffffff );
            light.position.set( 0, 200, 100 );
            light.shadow.camera.top = 180;
            light.shadow.camera.bottom = - 100;
            light.shadow.camera.left = - 120;
            light.shadow.camera.right = 120;
            scene.add( light );

            // 辅助线
            var helper = new THREE.AxesHelper(5000);
            scene.add(helper);

            // 声明FBXLoader加载器
            var loader = new THREE.FBXLoader();

            // 添加单个设备模型，为鼠标事件做准备
            loader.load('singleair.fbx', function (obj) {
                //模型的node节点不在规范的坐标系中心点，需要获取物体包围盒设置过去
                var bbox3 = new THREE.Box3().setFromObject(obj);
                var bPos = bbox3.getBoundingSphere().center;
                //通过给物体添加父亲的形式，通过反向位置设置到0 0 0
                var sceneNode = new THREE.Object3D();
                sceneNode.position.set(-bPos.x, -bPos.y, -bPos.z);
                obj.children[0].material.color.set(0xa0a0a0); // 改变加入对象的颜色
                sceneNode.add(obj);
                //提供一个全局变量  只load一次模型给下面克隆用
                singleair = sceneNode;
            })

            // 添加整个楼层模型
            loader.load( '03(henliangtouming)-2.fbx', ( object ) => {

                scene.add(object);
                
                // 为模型区域添加绑定事件
                // console.log(addLevel)
                InfoDiv.addEventListener( 'click', this.onMouseClick, false );
                // InfoDiv.addEventListener('mousemove', onMouseMove, false);
            } );

            // 添加渲染器
            renderer = new THREE.WebGLRenderer( { antialias: true } );
            
            renderer.setSize( (window.innerWidth - 800), 520 );
            renderer.shadowMap.enabled = true;
            container.appendChild( renderer.domElement );
            window.addEventListener( 'resize', this.onWindowResize, false );

            // 添加控制器
            controls = new THREE.OrbitControls( camera, InfoDiv );
            controls.target.set( 0, 100, 0 );
            // controls.minZoom = 5000;
            controls.enablePan = true;
            controls.minDistance = 10000;
            controls.maxDistance = 20000;
            controls.enableRotate = false; // 控制旋转  false 不可旋转
            // controls.maxAzimuthAngle = 15;
            controls.minPolarAngle = Math.PI * 0.2 // Z轴不可旋转
            controls.maxPolarAngle = 0; // 控制旋转垂直方向旋转角度
            controls.update();
        },
        onMouseClick( event ) {
            console.log(this.isEdit)
            if (! this.isEdit) {
                // TODO 判断是否点击到已有设备
                return
            }
            
            this.$emit("click", 2)
            event.preventDefault();
            const {x, y} = container.getBoundingClientRect()
            var vector = new THREE.Vector3();//三维坐标对象
            vector.set( ( (event.clientX - x) / ( window.innerWidth - 800) ) * 2 - 1, - ( (event.clientY - y) / 520 ) * 2 + 1, 0.5 );
            vector.unproject( camera );
            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
            var intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0) {
                var selected = intersects[0];//取第一个物体
                let {x, y, z} = selected.point

                console.log(x, y, z)
                this.locationObj.xAxis = x
                this.locationObj.yAxis = y
                this.locationObj.zXxis = z
                if (this.currentMesh) {
                    this.currentMesh.position.set(x, y, z)
                } else {
                    const node = this.addOneMesh(x, y, z)
                    this.currentMesh = node
                }
            }
            this.$root.isAdd = 1

        },
        addOneMesh(x, y, z) {
            var newObj = singleair.clone(true);
            // if (newObj.id)
            var node = new THREE.Object3D();
            node.scale.set(20,20,20); //模型做的有问题  太小了
            node.position.set(x,y,z);
            node.add(newObj)
            scene.add(node)

            return node
        },
        onWindowResize() {
            camera.aspect = (window.innerWidth - 800) / 520;
            // camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            // renderer.render(scene, camera)
            // renderer.clearTarget(true, true, true, true)
            renderer.setSize( window.innerWidth - 800, 520 );
            // controls.reset()
        },
        animate() {
            requestAnimationFrame( this.animate );
            if ( mixers.length > 0 ) {
                for ( var i = 0; i < mixers.length; i ++ ) {
                    mixers[ i ].update( clock.getDelta() );
                }
            }
            renderer.render( scene, camera );
        }
    }
}
    
</script>