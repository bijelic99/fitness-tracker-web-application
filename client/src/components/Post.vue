<template>
  <div class="panel-block">
      <div class="box w-100">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{`${post.user.firstName} ${post.user.lastName}`}} </strong>
                <small>@{{post.user.username}}</small>
                <small>31m</small>
                <br/><strong>{{post.title}}</strong>
                <br />{{post.text}}
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item" aria-label="like" @click="likeButtonClick()">
                  <span class="icon is-small">
                    <i :class="`${post.likedByCurrentUser ? 'fas' : 'far'} fa-heart`" aria-hidden="true"></i>
                  </span>
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'Post',
    props:{
        post:{
            type: Object,
            required: true
        }
    },
    methods:{
        ...mapActions(['likeDislikePost']),
        likeButtonClick(){
            this.likeDislikePost(this.post)
        },
    }

}
</script>

<style>
.w-100{
    width: 100%;
}
</style>