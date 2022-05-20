<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>Create Post</h2>
      <b-link to="/posts">
        <b-button variant="success">Back to Posts List</b-button>
      </b-link>
    </div>
    <div>
      <b-form>

        <b-form-group
          label="Title"
          label-for="title"
        >
          <b-form-input id="title" v-model="post.title" placeholder="Enter title"></b-form-input>
        </b-form-group>


        <b-form-group
          label="Body"
          label-for="body"
        >
          <b-form-input id="body" v-model="post.body" placeholder="Enter body"></b-form-input>
        </b-form-group>


        <b-form-group
          label="Select user"
          label-for="user"
        >
          <b-form-select id="user" v-model="post.userId" :options="usersOptions"></b-form-select>
        </b-form-group>


        <b-form-group>
          <b-button @click="savePost" variant="success">Save</b-button>
        </b-form-group>

      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: null,
        body: null,
        userId: null
      },
      users: []
    }
  },
  computed: {
    usersOptions() {
      return this.users.map(user => {
        return {
          value: user.id,
          text: user.name 
        }
      })
    }
  },
  async mounted() {
    await this.getUsers()
    if (this.users.length) {
      this.post.userId = this.users[0].id
    }
  },
  methods: {
    async getUsers() {
      this.users = (await this.axios.get('https://jsonplaceholder.typicode.com/users')).data
    },
    savePost() {
      const post = this.post
      this.axios.post('https://jsonplaceholder.typicode.com/posts', post).then(res => {
        this.$toastr.s("Post created successfully");
        this.$router.push('/posts')
      })
    }
  }
}
</script>