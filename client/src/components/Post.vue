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
                <strong class="pr-4px">{{`${post.user.firstName} ${post.user.lastName}`}}</strong>
                <small class="pr-4px">@{{post.user.username}}</small>
                <small class="pr-4px">31m</small>
                <small class="pr-4px"><span class="icon is-small"><i :class="getInputTypes[post.input.type].icon"/></span></small>
                <small class="pr-4px">{{post.input.name}}</small>
                <small class="pr-4px">{{post.input.value}}</small>
                <small class="pr-4px">{{getInputTypes[post.input.type].sufix}}</small>
                <br/><strong>{{post.title}}</strong>
                <br />{{post.text}}
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item" aria-label="like" @click="likeButtonClick()">
                  <span class="icon is-small">
                    <i :class="`${post.likes.includes(getCurrentUserId) ? 'fas' : 'far'} fa-heart`" aria-hidden="true"></i>
                  </span>
                </a>
                <small class="is-small">{{post.likes.length}}</small>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
    },
    computed:{
      ...mapGetters(['getCurrentUserId', 'getInputTypes']),
    }

}
</script>

<style>
.w-100{
    width: 100%;
}
.pr-4px{
  padding-right: 4px;
}
</style>