<template>
    <div class="section">
        <div class="container">
            <div class="panel">
                <div class="panel-heading">
                    FriendList
                </div>
                <div class="panel-block" v-for="friend in getFriendsObjects" :key="friend._id">
                    <PersonCard :addFriendVisible="false" :user="friend"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PersonCard from '../components/PersonCard'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'FriendList',
    components:{
        PersonCard
    },
    computed:{
        ...mapGetters(['getFriendsObjects'])
    },
    methods:{
        ...mapActions(['fetchFriends'])
    },
    mounted(){
        this.fetchFriends()
    }
}
</script>

<style>

</style>