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
            <div><button @click.prevent="submit(bass.seller)">구입하기</button><button @click.prevent="active = false; remove()">cancel</button></div>
        </div>
    </div>
</div>
</template>

<script>
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
    methods: {
        show() {
            this.active = true;
        },
        submit(seller) {
            let userId = this.userId;
            let userName = this.userName;
            let phone = this.phone;
            alert("userId is " + userId + ", userName is " + userName + ", userPhone is " + phone + ", seller : " + seller);
        },
        remove() {
            this.userId = "";
            this.userName = "";
            this.phone = "";
        }
    },
    created() {
        this.$EventBus.$on('openModal', (bass) => {
            console.log(bass);
            this.bass = bass;
            this.show();
        });
    }
}
</script>