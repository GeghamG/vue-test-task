<template>
  <b-card class="shadow-sm rounded mb-3 comment" >
    <div>
      <p v-if="!isEditing" class="h5 text-dark comment-name w-100">{{ comment.name }}</p>
      <input v-else class="h5 text-dark comment-name-input" v-model="comment.name" />
    </div>

    <div>
      <p v-if="!isEditing" class="m-0 comment-body">{{ comment.body }}</p>
      <b-textarea v-else v-model="comment.body" class="comment-body-textarea" />
    </div>

    <b-button variant="danger" class="position-absolute delete-comment rounded" @click="deleteComment"><b-icon-trash-fill></b-icon-trash-fill></b-button>
    <b-button :variant="commentIconVariant" class="position-absolute edit-comment rounded" @click="editComment"><b-icon :icon="commentIconName" ></b-icon></b-button>
  </b-card>
</template>

<script>
export default {
  props: {
    comment: Object,
    index: Number
  },
  data() {
    return {
      isEditing: false
    }
  },
  computed: {
    commentIconName() {
      return this.isEditing ? "save" : "pencil"
    },
    commentIconVariant() {
      return this.isEditing ? "success" : "info"
    }
  },
  methods: {
    deleteComment() {
      this.$emit("delete-comment", {
        id: this.comment.id,
        index: this.index
      })
    },
    editComment() {
      if (this.isEditing) {
        this.axios.put(`https://jsonplaceholder.typicode.com/comments/${this.comment.id}`, this.comment)
      }
      this.isEditing = !this.isEditing
    }
  }
}
</script>

<style scoped>
.comment > .card-body:hover .delete-comment, .comment > .card-body:hover .edit-comment {
  visibility: visible;
}

.delete-comment, .edit-comment {
  font-size: 0.8rem;
  height: 30px;
  width: 30px;
  visibility: hidden;
  top: 5px;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-comment {
  right: 40px;
}



.comment-name, .comment-name-input, .comment-body, .comment-body-textarea {
  border: none;
  outline: none;
  width: 100%;
  padding: 4px 8px;
}

.comment-name-input, .comment-body-textarea {
  box-shadow: inset 0 0 3px 1px rgb(0 0 0 / 20%);
  color: rgba(0, 0, 0, 0.65);
  border-radius: 6px;
}
</style>