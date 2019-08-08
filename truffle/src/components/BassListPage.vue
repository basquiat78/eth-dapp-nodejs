<template>
  <div class="basslist">
    <li class="list-group-item" v-for="(message) in eventMessages" v-bind:key="message.message">
        <div>{{message.message}}</div>
    </li>
    <li class="list-group-item" v-for="(bass) in bassItems" v-bind:key="bass.id">
        <div>브랜드 : {{bass.brand}}</div>
        <div>현수 : {{bass.stringno}}</div>
        <div>
            <div v-if="(bass.picture !== '[none]')">
                <img :src=bass.picture width="360" height="240">
            </div>
        </div>
        <div>가격 : {{bass.price}} Ether</div>
        <div>판매자 주소 : {{bass.seller}}</div>
        <div><button @click.prevent="$EventBus.$emit('openModal', bass)">Buy This Bass</button></div>
    </li>
    <Modal></Modal>
  </div>
</template>

<script>
import BassListPage from '@/components/BassListPage.vue'
import Modal from '@/components/Modal.vue'
import json from '@/static/basslist.json'

export default {
    name: 'BassList',
    data () {
        return {
            bassItems: json,
            eventMessages: []
        }
    },
    props: ['bass'],
    components: {
        Modal
    },
    created() {
        let self = this;
        this.$EventBus.$on('eventLog', (event) => {
            let message = "판매된 제품 아이디 : " + event.args.id + ", 구입자 주소 : " + event.args.buyerAddr + ", 판매자 주소 : " + event.args.sellerAddr;
            let eventMesasge = {"message": message};
            self.eventMessages.push(eventMesasge);
        });
    }
}
</script>