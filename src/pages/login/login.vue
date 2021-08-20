<template>
  <div class="login">
    <div class="login-mask" v-if="device !== 'mobile'"></div>
    <button @click="switchLanguage" style="position: absolute;right:10px;top:4px;">{{ language }}</button>

    <a-form 
      ref="formRef"  
      :layout="formState.layout"
      class="form"
      :style="device == 'mobile'?'top:50%;left:50%;transform: translate(-50%, -50%);':''"
      :model="formState" 
      :rules="rules" 
      @keyup.enter="onSubmit('formRef')"
      >
     
      <a-form-item name="account" >
        <a-input v-model:value="formState.account" :placeholder="$t('login.placeholderAccount')">
          <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password v-model:value="formState.password" :placeholder="$t('login.placeholderPassword')" >
          <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
        </a-input-password>
      </a-form-item>
      <a-form-item style="text-align: center;width: 100%">
        <a-button
          style="width: 100%"
          type="primary"
          @click="onSubmit('formRef')"
        >
          {{ $t('login.login') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { defineComponent, reactive,computed,toRefs,ref, nextTick, onMounted } from "vue";
import { LOGIN } from "../../api/user/login";
import { useI18n } from "vue-i18n";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { setItem }  from '../../utils/storage/storage';
import { message } from 'ant-design-vue';
interface FormState {
  layout: 'horizontal' | 'vertical' | 'inline';
  account: string;
  password: string;
}

export default defineComponent({
  name: "login",
  components:{
    UserOutlined, LockOutlined
  },
  setup(prop, context) {
    const router = useRouter();
    const i18n = useI18n();
    const store = useStore();

    const formRef = ref();
    const state = reactive({
      device:computed(()=>{ return store.state.device;}),
      language:i18n.locale.value,
    });
    const formState= reactive<FormState>({
      layout: 'vertical',
      account: "admin",
      password: "admin!@#123",
    });
    const rules  = computed(() => {
      const rules = {
        account: [{ required: true, message: i18n.t('login.placeholderAccount'), trigger: "change" }],
        password: [{ required: true, message: i18n.t('login.placeholderPassword'), trigger: "change" }],
      };
      // 清空表单验证信息
      nextTick( () => {
        formRef.value.resetFields();
      });
      return rules;
    });

    const switchLanguage = () => {
      const locale = i18n.locale.value === "cn" ? "en" : "cn";
      i18n.locale.value = locale;
      state.language = locale;
      setItem('locale',locale);
    }; 
    const onSubmit = () => {
       formRef.value.validate().then(async () => {
             try {
              let obj = {
                username: formState.account,
                password: formState.password,
              };
                router.push("/index");

              const result:any = await LOGIN(obj);
              if( result?.code == 1 ) {
                const { token,tokenType } = result.data;
                // store.dispatch('user/saveTokenAsync',tokenType + " " + token);
                store.dispatch('user/saveTokenAsync',tokenType + " " + token);
                router.push("/index");
              } else {
                message.error('用户名或密码错误,请重试');
              }
            } catch (e) {
              console.log(e);
            } finally {
              // 不管有没有异常，finally中的代码都会执行
              console.log("finally");
            }
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.log('error', error);
        });
    }
    return {
      ...toRefs(state),
      i18n,
      formState,
      formRef,
      rules,
      onSubmit,
      switchLanguage,
    };
  }
});
</script>
<style lang="scss" src="./style.scss"></style>