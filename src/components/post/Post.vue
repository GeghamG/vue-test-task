<template>
  <div>
		<div class="mb-3 d-flex justify-content-between">
			<h2>Post details</h2>
			<b-link to="/posts">
				<b-button variant="success">Back to Posts List</b-button>
			</b-link>
		</div>

    <b-card no-body class="mb-3 post">
      <b-card-body>
        <b-card-title class="post-title" v-if="!isEditing">{{ post.title }}</b-card-title>
        <input v-else v-model="post.title" class="post-title-input h4 mb-75"/>

        <b-card-text v-if="!isEditing" class="post-body">{{ post.body }}</b-card-text>
        <b-form-textarea
          v-else v-model="post.body"
          class="mb-2 post-body-textarea"
          rows="4"
        />

        <div class="d-flex justify-content-between">

          <b-button :variant="postButtonVariant" class="mr-3" @click="postSaveOrEdit">{{ postButtonText }}</b-button>
          <b-button variant ="danger" @click="deletePost">Delete Post</b-button>

        </div>

      </b-card-body>
    </b-card>

    <b-card no-body>
      <b-card-body title="Comments">

        <Comment 
          v-for="(comment, index) in comments"
          :key="comment.id"
          :index="index"
          :comment="comment"
          @delete-comment="deleteComment"
        />

      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Comment from './Comment.vue'

export default {
  components: {
    Comment
  },
  data() {
    return {
      post: {},
      comments: [],
      isEditing: false,
      isEdited: false
    }
  },
  async mounted() {
    await this.getPost()
    await this.getComments()
  },
  watch: {
    "post.title"() {
      this.isEdited = true
    },
    "post.body"() {
      this.isEdited = true
    }
  },
  computed: {
    postButtonText() {
      return this.isEditing ? "Save" : "Edit Post"
    },
    postButtonVariant() {
      return this.isEditing ? "success" : "info"
    }
  },
  methods: {
    async getPost() {
      this.post = (await this.axios.get(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.postId}`)).data;
    },
    async getComments() {
      this.comments = (await this.axios.get(`https://jsonplaceholder.typicode.com/posts/${this.post.id}/comments`)).data;
    },
    deletePost() {
      this.axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.post.id}/`).then(res => {
        this.$toastr.s("Post deleted successfully");
        console.log(this.$router);
        this.$router.push('/posts')
      })
    },
    deleteComment({id, index}) {
      this.axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}/`).then(res => {
        this.$toastr.s("Comment deleted successfully");
        this.comments.splice(index, 1)
      })
    },
    postSaveOrEdit() {
      if (this.isEditing && this.isEdited) {
        const post = this.post
        this.axios.put(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.postId}`, post).then(res => {
          this.isEdited = true
        })
      }
      this.isEditing = !this.isEditing
    }
  }
}
</script>

<style scoped>
.comment > .card-body {
  padding: 10px;
  position: relative; 
}

.comment > .card-body:hover .delete-comment {
  visibility: visible;
}

.delete-comment {
  visibility: hidden;
  top: -5px;
  right: -5px;
}

.post-title, .post-title-input, .post-body, .post-body-textarea {
  border: none;
  outline: none;
  width: 100%;
  padding: 4px 8px;
}

.post-title-input, .post-body-textarea {
  box-shadow: inset 0 0 3px 1px rgb(0 0 0 / 20%);
  color: rgba(0, 0, 0, 0.65);
  border-radius: 6px;
}
</style>