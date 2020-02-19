<script lang="ts">
import Vue from 'vue'

interface ISlate {
  id: string
  title: string
}

export default Vue.extend({
  name: 'SlatesIndex',
  data: function () {
    return {
      slates: [],
      newSlate: {},
      error: '',
      editedSlate: {},
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace({name: 'root'})
    } else {
      this.$http.secured.get('/api/v1/slates')
        .then((response: any) => {
          this.slates = response.data
        })
        .catch((error: any) => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error: any, text: any) {
      this.error = (error.response && error.response.data && error.response.data.errors) || text
    },
    addSlate () {
      const value = this.newSlate
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/slates', {slate: {title: this.newSlate.title}})
        .then(response => {
          this.slates.push(response.data)
          this.newSlate = {}
        })
        .catch(error => this.setError(error, 'Cannot create slate'))
    },
    removeSlate (slate) {
      this.$http.secured.delete(`/api/v1/slates/${slate.id}`)
        .then(response => {
          this.slates.splice(this.slates.indexOf(slate), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete slate'))
    },
    editSlate (slate) {
      this.editedSlate = slate
    },
    updateSlate (slate) {
      this.editedSlate = {}
      this.$http.secured.patch(`api/v1/slates/${slate.id}`, {slate: {title: slate.title}})
        .catch(error => this.setError(error, 'Cannot update slate'))
    },
  },
})
</script>

<template>
  <div class="max-w-md m-auto py-10">
    <div
      v-if="error"
      class="text-red">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">Add Slate</h3>
    <form @submit.prevent="addSlate">
      <div class="mb-6">
        <input
          v-model="newSlate.title"
          type="text"
          class="input"
          autofocus
          autocomplete="off"
          placeholder="Enter slate title"
        >
        <input
          type="submit"
          value="Add Slate"
          class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green hover:bg-green-700 block w-full py-4 text-white item-center justify-center">
      </div>
    </form>

    <hr class="border border-gray-400 my-6">

    <ul class="list-reset mt-4">
      <li
        v-for="slate in slates"
        :key="slate.id"
        :slate="slate"
        class="py-4">
        <div class="flex items-center justify-between flex-wrap">
          <p class="block flex-1 font-mono font-semibold flex items-center">
            {{ slate.title }}
          </p>

          <button
            @click.prevent="editSlate(slate)"
            class="by-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py2 px-4 mr-2 rounded"
          >
            Edit
          </button>
          <button
            @click.prevent="removeSlate(slate)"
            class="by-transparent text-sm hover:bg-red hover:text-white text-red border border-red no-underline font-bold py2 px-4 mr-2 rounded"
          >
            Delete
          </button>
        </div>

        <div v-if="slate === editedSlate">
          <form @submit.prevent="updateSlate(slate)">
            <div class="mb-6 p-4 bh-white rounded-border border-gray-400 mt-4">
              <input
                v-model="slate.title"
                type="text"
                class="input">
              <input
                type="submit"
                value="Update"
                class="my-2 bg-transparent text-sm hover:bg-blue hover:text-white text-blue border-blue no-underline font-bold py-2 px-4 rounded cursor-pointer">
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>
