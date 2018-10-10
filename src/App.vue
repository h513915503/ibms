<template>
	<div id="app">
		<el-header>Header</el-header>

		<el-container>
			<el-aside width="200px">Aside</el-aside>

			<el-main>
				<router-view/>
			</el-main>
		</el-container>
	</div>
</template>
