<template>
  <div id=search>
    <form class="form" @submit.prevent="searchTwt">
      <div class="field">
        <input type="text"  name="q" v-model="q" v-on:change="handlerChange()"/>
      </div>
    </form>
    <div>
      <div class="error" id="errorItem" v-if="error"><p>{{error}}</p></div>
      <transition-group name="bounceIn">
          <Tweet v-if="hasTweets()" v-for="(tweet, index) in tweets" :key="index" :twt="tweet"/>
          <div v-else class="tweet">
            {{ "Aqui aparecem os resultados" }}
          </div>
      </transition-group>


    </div>
  </div>
</template>

<script>
import consumer from '../instance';
import Tweet from './Tweet';
import _ from 'lodash';
import Vue from 'vue';

export default {
  name: 'Search',
  components: {Tweet, Error},
  data: function(){
    return {
      q: "",
      tweets: [],
      error: ""
    }
  },
  watch: {
    q: function(){ this.searchTwt()
    }
  },
  methods: {
    searchTwt: _.debounce(
      function(){
        var vm = this;
        vm.tweets = []
        vm.error = ""
        consumer.get('api/' + this.q).then(function(response){
            vm.tweets = response.data
            // console.log(response.data);
          }).catch(function(err){
            // console.log(err.message);
            err.message == "Network Error" ? vm.error = "Falha de conexão, desculpe." : undefined ;
            });
      }, 1000
    ),
    handlerChange: function(){
      if (this.hasError()) {
        var error = new Vue('#errorItem');
        error.$unmount();
      }
    },
    hasTweets: function(){
      return this.tweets.length > 0;
    },
    hasError: function(){
      return this.error !== "";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="css" scoped>

div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

 form {
   width: 100%;
   padding: .5em .0em;
 }

 form input {
   width: 100%;
    box-sizing: border-box;
    -webkit-box-sizing:border-box;
    -moz-box-sizing: border-box;
    height: 2.2em;
    border-radius: 2%;
    border: 1px solid #ddd;
 }

 .error {
   padding: .1em 1em;
   width: 100%;
   height: auto;
   background: #fcefef;
   box-sizing: border-box;
 }
</style>
