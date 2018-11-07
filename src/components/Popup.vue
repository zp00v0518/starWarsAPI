<template>
  <div class="popup" @click="close">
    <div ref='wrapData' @click.stop class="popup__data"></div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    item: {
      type: Object
    }
  },
  mounted () {
    let d = JSON.stringify(this.item, '\n', 2)
    this.$refs.wrapData.innerText = d
  },
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.$emit('closepopup')
    }
  }
}

</script>

<style>
.popup {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: rgba(33,33,33, 0.8);
}
.popup__data {
    padding-left: 20px;
    width: 70%;
    height: 70%;
    border: 1px solid;
    overflow: auto;
    background-color: rgba(20,20,20, 0.8);
}
</style>
