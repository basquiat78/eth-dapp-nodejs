<template>
  <div class="bassmarket">
    <h1>This is a Bass Marketplace page</h1>
    <BassListPage></BassListPage>
  </div>
</template>

<script>
import BassListPage from '@/components/BassListPage.vue'

export default {
  name: 'BassMarket',
  components: {
    BassListPage
  }
}
</script>