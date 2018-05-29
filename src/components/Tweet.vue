<template>
  <div class="tweet">
    <span>
      <strong>
        @{{ user.screen_name }} -
      </strong>
      {{user.name}} ·
    </span>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'Tweet',
  props: {"twt": {type: Object} },
  data: function(){
    return {
      text: this.twt.text,
      user: this.twt.user
    }
  }
}

</script>

<style scoped>
  div.tweet {
    padding: 1em;
    height: auto;
    border: 1px solid #ddd;
    margin-bottom: .5em;
    border-radius: .2em;
    background: #fff;
    box-sizing: border-box;
  }
</style>
