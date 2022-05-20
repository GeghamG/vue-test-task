<template>
	<div>
		<div class="mb-3 d-flex justify-content-between">
			<h2>Posts</h2>
			<b-link to="/posts/create">
				<b-button variant="success">Create Post</b-button>
			</b-link>
		</div>
		<b-table :fields="fields" striped hover :items="posts" @row-clicked="goToPost">
			<template #cell(actions)="data">
				<div class="d-flex flex-nowrap">
					<b-button variant="info"  @click="goToPost(data.item.id)" class="mr-1">View</b-button>
					<b-button variant="danger" @click="deletePost(data.item)">Delete</b-button>
				</div>
			</template>
		</b-table>
		<!-- <div v-for="post in posts" :key="post.id">
			<h5>{{ post.title }}</h5>
			<p>{{ post.body }}</p>
		</div> -->
	</div>
</template>

<script>
export default {
	data() {
		return {
			posts: [],
			fields: [
				"title",
				"body",
				"actions"
			]
		}
	},
	async mounted() {
		await this.getPosts()
	},
	methods: {
		async getPosts() {
			this.posts = (await this.axios.get('https://jsonplaceholder.typicode.com/posts')).data
		},
		goToPost(id) {
			this.$router.push(`/posts/${id}`)
		},
		deletePost(post) {
			this.axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`).then(res => {
				const postIndex = this.posts.findIndex(item => item.id === post.id)

				if (postIndex !== -1) {
					this.posts.splice(postIndex, 1)
				}

        		this.$toastr.s("Post deleted successfully");
			})
		}
	}
};
</script>

<style scoped>
	.cursor-pointer {
		cursor: "pointer"!important
	}
</style>
