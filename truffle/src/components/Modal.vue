<template>
<div class="modal" :class="{ 'is-active': active }" width="80%">
    <div class="modal-background"></div>
        <div class="modal-content" style="width: 100%">
            <div class="box">
            <div class="content">
                <div>
                    <input style="width: 40%" v-model="userId" placeholder="userId(Maybe ready to)"/>
                </div>
                <div>
                    <input style="width: 40%" v-model="userName" placeholder="이름을 입력하세요"/>
                </div>
                <div>
                    <input style="width: 40%" v-model="phone" placeholder="핸드폰 번호를 입력하세요">
                </div>
                <div>판매자 주소 : {{bass.seller}}</div>
            </div>
            <div><button @click.prevent="submit(bass)">구입하기</button><button @click.prevent="active = false; remove()">cancel</button></div>
        </div>
    </div>
</div>
</template>

<script>
import BassMarketContract from '@/js/BassMarketContract'
import BasquiatContract from '@/static/BasquiatContract.json'

export default {
    name: 'Modal',
    data() {
        return {
            active: false,
            bass: false,
            userId: "",
            userName: "",
            phone: "",
        }
    },
    beforeCreate: function () {
        BassMarketContract.init(BasquiatContract, this.$EventBus).then(() => BassMarketContract.logEvents());
    },
    methods: {
        show() {
            this.active = true;
        },
        submit(bass) {
            let self = this;
            let userId = this.userId;
            let userName = this.userName;
            let phone = this.phone;
            BassMarketContract.account().then(account => {
                // contract의 getBuyerInfo로 조회시 데이터가 있다면 리턴 return (buyersInfo[_id].userId, buyersInfo[_id].name, buyersInfo[_id].phone, buyersInfo[_id].addr);
                BassMarketContract.getBuyerInfo(bass.id).then((returnValue) => {
                    let buyerId = returnValue[0].toNumber();
                    if(buyerId != 0) {
                        alert("이미 판매된 제품입니다.");
                        self.active = false; 
                        self.remove()
                        return;
                    }
                    BassMarketContract.buyBass(bass.id, userId, userName, phone, bass.seller, account, bass.price).then(result => {
                    this.remove();
                    this.active = false;
                    BassMarketContract.getSellers().then(sellers => console.log(sellers));
                    BassMarketContract.getBuyers().then(buyers => console.log(buyers));
                });
                 });
            });
        },
        remove() {
            this.userId = "";
            this.userName = "";
            this.phone = "";
        }
    },
    created() {
        this.$EventBus.$on('openModal', (bass) => {
            this.bass = bass;
            this.show();
        });
    }
}
</script>